import asyncio
import os
import re
from datetime import datetime, timedelta
from dotenv import load_dotenv
from supabase import create_client, Client, AsyncClient
from playwright.async_api import async_playwright
import uuid
import random
import requests



load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")
if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Faltan variables SUPABASE_URL o SUPABASE_KEY")

# Usar cliente asíncrono
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
async_supabase = AsyncClient(SUPABASE_URL, SUPABASE_KEY)

def is_valid_uuid(val):
    try:
        uuid.UUID(str(val))
        return True
    except ValueError:
        return False

async def popup_closer(page, popup_selectors, interval=2):
    while True:
        for sel in popup_selectors:
            try:
                el = await page.query_selector(sel)
                if el:
                    await el.click()
                    await page.wait_for_timeout(300)
            except Exception:
                pass
        await asyncio.sleep(interval)

USER_AGENTS = [
    # Chrome Windows
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    # Chrome Mac
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    # Firefox Windows
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0",
    # Edge Windows
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0",
    # Chrome Linux
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    # Safari Mac
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
]

def get_random_user_agent():
    return random.choice(USER_AGENTS)

async def scrape_booking_prices(hotel_name: str, locale="en-us", currency="MXN", headless_mode="false"):
    user_agent = get_random_user_agent()
    # Convierte headless_mode a bool si es string
    if isinstance(headless_mode, str):
        if headless_mode.lower() == "false":
            headless = False
        else:
            headless = True  # "true" o "new" o cualquier otro string
    else:
        headless = headless_mode
    
    print(f"[DEBUG] Iniciando scraping con headless={headless}, hotel={hotel_name}")
    
    # Elimina el try sin except/finally
    # try:
    async with async_playwright() as p:
        # Configurar opciones adicionales para evitar detección de bots
        browser_options = {
            'headless': headless,
            'args': [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu',
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding',
                '--disable-features=TranslateUI',
                '--disable-ipc-flooding-protection',
                '--disable-blink-features=AutomationControlled',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor',
                '--user-agent=' + user_agent
            ]
        }
        
        browser = await p.chromium.launch(**browser_options)
        page = await browser.new_page()
        
        # Configurar el contexto para evitar detección de bots
        await page.add_init_script("""
            Object.defineProperty(navigator, 'webdriver', {
                get: () => undefined,
            });
            Object.defineProperty(navigator, 'plugins', {
                get: () => [1, 2, 3, 4, 5],
            });
            Object.defineProperty(navigator, 'languages', {
                get: () => ['en-US', 'en'],
            });
        """)
        
        # Universal: set user-agent via extra headers
        await page.set_extra_http_headers({"user-agent": user_agent})
        
        print(f"[DEBUG] Browser iniciado con user-agent: {user_agent}")

        # Calcular fechas: hoy y mañana
        today = datetime.today()
        tomorrow = today + timedelta(days=1)
        checkin = today.strftime("%Y-%m-%d")
        checkout = tomorrow.strftime("%Y-%m-%d")

        # Construir URL con fechas y configuración
        url = (
            f"https://www.booking.com/searchresults.html?lang={locale}&selected_currency={currency}"
            f"&checkin={checkin}&checkout={checkout}"
        )
        await page.goto(url)
        await page.wait_for_timeout(10000)
        
        # En modo headless, esperar más tiempo para que la página cargue completamente
        if headless:
            await page.wait_for_timeout(5000)
            print("[DEBUG] Esperando carga adicional en modo headless...")

        # Escribir el nombre del hotel y seleccionar el primer resultado sugerido
        await page.fill("input[name='ss']", hotel_name)
        await page.wait_for_timeout(10000)  # Esperar 1 segundo para que aparezcan sugerencias
        # Probar varios selectores de sugerencias
        suggestion_selectors = [
            "li[data-testid='autocomplete-result']",
            "li[data-i='0']",
            "ul[role='listbox'] li",
            "li.sb-autocomplete__item"
        ]
        suggestions = []
        clicked = False
        for sel in suggestion_selectors:
            try:
                await page.wait_for_selector(sel, timeout=2000)
                suggestions = await page.query_selector_all(sel)
                if suggestions:
                    # Intentar click en el div[role='button'] hijo usando JS
                    for s in suggestions:
                        try:
                            div_btn = await s.query_selector("div[role='button']")
                            if div_btn:
                                await page.evaluate('(el) => el.click()', div_btn)
                                clicked = True
                                break
                        except Exception:
                            continue
                    if not clicked:
                        try:
                            await page.evaluate('(el) => el.click()', suggestions[0])
                            clicked = True
                        except Exception:
                            pass
                    if clicked:
                        break
            except Exception:
                continue
        if not clicked:
            # Si no hay sugerencias, esperar 2 segundos y enviar Enter al input para forzar la búsqueda
            await page.wait_for_timeout(10000)
            await page.focus("input[name='ss']")
            await page.keyboard.press("Enter")
        # Presionar el botón de búsqueda
        # --- NUEVO: Cierra popups y overlays antes de hacer click en el botón de submit ---
        popup_selectors = [
            "button[aria-label*='Dismiss']",
            ".bui-modal__close",
            "button[aria-label*='Cerrar']",
            "button[aria-label*='Close']",
            "button[aria-label*='Accept']",
            "button[aria-label*='Aceptar']",
            "button[aria-label*='Entendido']",
            "button[aria-label*='Got it']",
            "button[aria-label*='OK']",
            "button[aria-label*='Allow']",
            "button[aria-label*='Permitir']",
            "button[data-testid='cookie-banner-close-button']",
            "#onetrust-accept-btn-handler",
            ".modal-mask .modal-close",
            ".modal__close",
            ".close-button",
            ".c-modal__close"
        ]
        for sel in popup_selectors:
            try:
                el = await page.query_selector(sel)
                if el:
                    await el.click()
                    await page.wait_for_timeout(300)
            except Exception:
                pass
        await page.wait_for_selector("button[type='submit']", timeout=10000)
        # Haz scroll al botón
        try:
            await page.eval_on_selector("button[type='submit']", "el => el.scrollIntoView()")
        except Exception:
            pass
        # Intenta click normal, si falla, click JS
        try:
            await page.click("button[type='submit']")
        except Exception as e:
            print("[WARN] Click normal falló, intentando click JS", e)
            try:
                await page.evaluate('document.querySelector("button[type=\\\'submit\\\']").click()')
            except Exception as e2:
                print("[ERROR] Click JS también falló", e2)

        # Cerrar pop-ups extra en la segunda pantalla
        popup_selectors = [
            "button[aria-label*='Dismiss']",
            ".bui-modal__close",
            "button[aria-label*='Cerrar']",
            "button[aria-label*='Close']",
            "button[aria-label*='Accept']",
            "button[aria-label*='Aceptar']",
            "button[aria-label*='Entendido']",
            "button[aria-label*='Got it']",
            "button[aria-label*='OK']",
            "button[aria-label*='Allow']",
            "button[aria-label*='Permitir']",
            "button[data-testid='cookie-banner-close-button']",
            "#onetrust-accept-btn-handler",
            ".modal-mask .modal-close",
            ".modal__close",
            ".close-button",
            ".c-modal__close"
        ]
        # Lanzar tarea de cierre de popups en background
        popup_task = asyncio.create_task(popup_closer(page, popup_selectors, interval=2))

        # Esperar el primer card y hacer clic en la imagen/enlace del hotel
        await page.wait_for_selector("a[data-testid='property-card-desktop-single-image']", timeout=10000)
        hotel_link = await page.query_selector("a[data-testid='property-card-desktop-single-image']")
        if not hotel_link:
            popup_task.cancel()
            raise RuntimeError("No se encontró el enlace del hotel en los resultados.")

        # Justo antes de hacer clic en el enlace del hotel:
        context = page.context

        # Prepara para capturar la nueva página
        new_page_promise = context.wait_for_event("page")

        await hotel_link.click()

        # Espera la nueva página (pestaña)
        try:
            new_page = await asyncio.wait_for(new_page_promise, timeout=10)
            await new_page.wait_for_load_state("networkidle")
            page_to_scrape = new_page
        except asyncio.TimeoutError:
            # Si no se abre nueva pestaña, sigue en la misma
            page_to_scrape = page

        # Lanzar tarea de cierre de popups en la página del hotel
        hotel_popup_task = asyncio.create_task(popup_closer(page_to_scrape, popup_selectors, interval=2))

        # Definir selectores para la tabla de habitaciones
        table_selectors = [
            "#hprt-table",
            ".hprt-table",
            "table[data-et-view]",
            "table.hprt-table",
            ".roomstable",
            "table[class*='room']",
            "table[class*='hprt']",
            "table"
        ]

        # Esperar a que la tabla de habitaciones esté presente y visible
        # Intentar múltiples selectores para la tabla
        table_found = False
        for selector in table_selectors:
            try:
                await page_to_scrape.wait_for_selector(selector, timeout=10000, state='visible')
                # Verificar que sea realmente una tabla de habitaciones
                element = await page_to_scrape.query_selector(selector)
                if element:
                    tag_name = await element.evaluate('el => el.tagName.toLowerCase()')
                    if tag_name == 'table':
                        # Verificar que contenga información de habitaciones
                        element_html = await element.inner_html()
                        if any(keyword in element_html.lower() for keyword in ['room', 'habitación', 'suite', 'deluxe', 'king', 'queen']):
                            print(f"Tabla encontrada con selector: {selector}")
                            table_found = True
                            break
            except Exception:
                continue
        
        if not table_found:
            print("No se encontró la tabla de habitaciones con ningún selector")
            print("Intentando buscar cualquier tabla en la página...")
            
            # Buscar cualquier tabla en la página
            try:
                tables = await page_to_scrape.query_selector_all("table")
                print(f"Encontradas {len(tables)} tablas en la página")
                
                for i, table in enumerate(tables):
                    try:
                        table_html = await table.inner_html()
                        if "room" in table_html.lower() or "habitación" in table_html.lower():
                            print(f"Tabla {i} contiene información de habitaciones")
                            table_found = True
                            break
                    except Exception:
                        continue
            except Exception as e:
                print(f"Error buscando tablas: {e}")
            
            if not table_found:
                print("No se encontró ninguna tabla con información de habitaciones")
                html = await page_to_scrape.content()
                print("HTML de la página:")
                print(html[:3000])
                await browser.close()
                popup_task.cancel()
                hotel_popup_task.cancel()
                return []

        # --- NUEVO: Scraping para los próximos 30 días, agrupado por día ---
        results = []
        base_url = page_to_scrape.url  # URL de la página de detalle del hotel
        print(f"[DEBUG] URL base del hotel: {base_url}")
        
        for offset in range(0, 30):
            checkin = (today + timedelta(days=offset)).strftime("%Y-%m-%d")
            checkout = (today + timedelta(days=offset+1)).strftime("%Y-%m-%d")
            # Modifica la URL con las nuevas fechas
            new_url = re.sub(r"checkin=\d{4}-\d{2}-\d{2}", f"checkin={checkin}", base_url)
            new_url = re.sub(r"checkout=\d{4}-\d{2}-\d{2}", f"checkout={checkout}", new_url)
            
            print(f"[DEBUG] Procesando fecha {checkin} - URL: {new_url}")
            
            await page_to_scrape.goto(new_url)
            await asyncio.sleep(3) # Aumentar espera entre fechas
            
            # Esperar a que la página cargue completamente
            try:
                await page_to_scrape.wait_for_load_state("networkidle", timeout=10000)
            except Exception:
                print(f"Timeout esperando carga completa para {checkin}, continuando...")
            
            # Intentar múltiples selectores para la tabla
            table_found = False
            for selector in table_selectors:
                try:
                    await page_to_scrape.wait_for_selector(selector, timeout=10000, state='visible')
                    # Verificar que sea realmente una tabla de habitaciones
                    element = await page_to_scrape.query_selector(selector)
                    if element:
                        tag_name = await element.evaluate('el => el.tagName.toLowerCase()')
                        if tag_name == 'table':
                            # Verificar que contenga información de habitaciones
                            element_html = await element.inner_html()
                            if any(keyword in element_html.lower() for keyword in ['room', 'habitación', 'suite', 'deluxe', 'king', 'queen']):
                                print(f"Tabla encontrada para {checkin} con selector: {selector}")
                                table_found = True
                                break
                except Exception:
                    continue
            
            if not table_found:
                print(f"No se encontró la tabla de habitaciones para {checkin}")
                html = await page_to_scrape.content()
                print(f"[HTML para {checkin}]:\n" + html[:2000])
                continue
            
            # Mejorar la extracción de habitaciones con múltiples selectores
            day_rooms = []
            
            # Intentar diferentes selectores para las filas de habitaciones
            row_selectors = [
                "#hprt-table tr",
                "#hprt-table tbody tr",
                ".hprt-table tr",
                "table[data-et-view] tr"
            ]
            
            rows = []
            for selector in row_selectors:
                try:
                    rows = await page_to_scrape.query_selector_all(selector)
                    if rows:
                        print(f"Encontradas {len(rows)} filas con selector: {selector}")
                        # Debug: mostrar el contenido de las primeras filas
                        for i, row in enumerate(rows[:3]):
                            try:
                                row_text = await row.inner_text()
                                print(f"  Fila {i+1}: {row_text[:200]}...")
                            except Exception as e:
                                print(f"  Error leyendo fila {i+1}: {e}")
                        break
                except Exception:
                    continue
            
            if not rows:
                print(f"No se encontraron filas de habitaciones para {checkin}")
                # Intentar buscar cualquier elemento que contenga información de habitaciones
                try:
                    all_elements = await page_to_scrape.query_selector_all("*")
                    room_elements = []
                    for elem in all_elements:
                        try:
                            elem_text = await elem.inner_text()
                            if any(keyword in elem_text.lower() for keyword in ['room', 'habitación', 'suite', 'deluxe', 'king', 'queen']):
                                room_elements.append(elem_text[:100])  # Primeros 100 caracteres
                        except Exception:
                            continue
                    
                    if room_elements:
                        print(f"Elementos con información de habitaciones encontrados para {checkin}:")
                        for i, elem in enumerate(room_elements[:5]):  # Solo mostrar los primeros 5
                            print(f"  {i+1}. {elem}")
                except Exception as e:
                    print(f"Error buscando elementos de habitaciones: {e}")
                continue
            
            for row in rows:
                try:
                    # Intentar múltiples selectores para el tipo de habitación
                    room_type_selectors = [
                        "th span.hprt-roomtype-icon-link",
                        "th .hprt-roomtype-icon-link",
                        "th .hprt-roomtype",
                        "th span",
                        "th"
                    ]
                    
                    room_type_el = None
                    room_text = None
                    
                    for room_selector in room_type_selectors:
                        try:
                            room_type_el = await row.query_selector(room_selector)
                            if room_type_el:
                                room_text = (await room_type_el.inner_text()).strip()
                                if room_text and len(room_text) > 5:  # Asegurar que no esté vacío
                                    break
                        except Exception:
                            continue
                    
                    if not room_text:
                        continue
                    
                    # Buscar precio en todas las celdas de la fila
                    price_text = None
                    tds = await row.query_selector_all("td")
                    
                    for td in tds:
                        try:
                            td_text = await td.inner_text()
                            # Buscar diferentes formatos de precio
                            price_patterns = [
                                r'(MXN\s*\$?|\$)\s*[\d,.]+',
                                r'[\d,.]+\s*(MXN|\$)',
                                r'\$[\d,.]+',
                                r'MXN\s*[\d,.]+',
                                r'[\d,]+\.?\d*\s*(MXN|\$)',
                                r'(MXN|\$)\s*[\d,]+\.?\d*'
                            ]
                            
                            for pattern in price_patterns:
                                match = re.search(pattern, td_text, re.IGNORECASE)
                                if match:
                                    price_text = match.group(0).strip()
                                    break
                            
                            if price_text:
                                break
                        except Exception:
                            continue
                    
                    if room_text and price_text:
                        # Verificar que no sea un duplicado en el mismo día
                        is_duplicate = False
                        for existing_room in day_rooms:
                            if existing_room["room_type"] == room_text and existing_room["price"] == price_text:
                                is_duplicate = True
                                break
                        
                        if not is_duplicate:
                            day_rooms.append({"room_type": room_text, "price": price_text})
                            print(f"Habitación encontrada para {checkin}: {room_text} - {price_text}")
                
                except Exception as e:
                    print(f"Error procesando fila para {checkin}: {e}")
                    continue
            
            if not day_rooms:
                # Si no se encontraron cuartos, imprime el HTML de la tabla
                table = await page_to_scrape.query_selector("#hprt-table")
                if table:
                    table_html = await table.inner_html()
                    print(f"[Tabla vacía para {checkin}]:\n" + table_html[:2000])
                    
                    # Debug adicional: buscar cualquier texto que contenga "room" o "habitación"
                    try:
                        all_text = await table.inner_text()
                        room_keywords = ["room", "habitación", "suite", "deluxe", "standard", "king", "queen", "twin"]
                        for keyword in room_keywords:
                            if keyword.lower() in all_text.lower():
                                print(f"  Encontrada palabra clave '{keyword}' en la tabla")
                    except Exception as e:
                        print(f"  Error al analizar texto de tabla: {e}")
                else:
                    print(f"[No se encontró el selector #hprt-table para {checkin}]")
            else:
                print(f"Total de habitaciones encontradas para {checkin}: {len(day_rooms)}")
            
            results.append({"date": checkin, "rooms": day_rooms})
        await browser.close()
        popup_task.cancel()
        hotel_popup_task.cancel()
        return results
   
                        # -----SUPABASE----- #
                        # -----SUPABASE----- #
                        # -----SUPABASE----- #
                        # -----SUPABASE----- #

async def insert_user_hotel_prices(user_id: str, hotel_name: str, results: list, jwt: str = ""): 
    user_id = user_id.strip()
    if not is_valid_uuid(user_id):
        print("ERROR: user_id no es un UUID válido:", user_id)
        return
    
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")
    # Cambiar la estrategia de conflicto para permitir múltiples habitaciones por día
    url = f"{SUPABASE_URL}/rest/v1/hotel_usuario"
    token = jwt if jwt else SUPABASE_KEY
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates"
    }
    
    total_inserted = 0
    total_errors = 0
    
    print(f"Iniciando inserción de datos para {len(results)} días...")
    
    for day in results:
        checkin_date = day["date"]
        rooms_count = len(day["rooms"])
        print(f"Procesando {checkin_date}: {rooms_count} habitaciones")
        
        for room in day["rooms"]:
            # Generar un ID único para cada inserción
            unique_id = str(uuid.uuid4())
            
            data = {
                "id": unique_id,  # Agregar ID único
                "user_id": user_id,
                "hotel_name": hotel_name,
                "scrape_date": datetime.today().strftime("%Y-%m-%d"),
                "checkin_date": checkin_date,
                "room_type": room["room_type"],
                "price": room["price"]
            }
            try:
                r = requests.post(url, headers=headers, json=data)
                if r.status_code in [200, 201]:
                    total_inserted += 1
                    print(f"[OK] Insertado: {checkin_date} - {room['room_type']} - {room['price']}")
                else:
                    total_errors += 1
                    print(f"[ERROR] Error {r.status_code}: {checkin_date} - {room['room_type']} - {room['price']}")
                    print(f"  Response: {r.text}")
            except Exception as e:
                total_errors += 1
                print(f"[EXCEPTION] {checkin_date} - {room['room_type']} - {room['price']}")
                print(f"  Error: {e}")
    
    print(f"Resumen de inserción:")
    print(f"  - Total insertados: {total_inserted}")
    print(f"  - Total errores: {total_errors}")
    print(f"  - Días procesados: {len(results)}")

async def main(user_id: str, hotel_name: str, headless_mode="new", jwt: str = ""):
    prices = await scrape_booking_prices(hotel_name, headless_mode=headless_mode)
    print("Precios:", prices)
    await insert_user_hotel_prices(user_id, hotel_name, prices, jwt=jwt)
    print("¡Listo!")

# --- Bloque para ejecución directa por CLI ---
if __name__ == "__main__":
    import sys
    user_id = None
    hotel_name = None
    headless_mode = "new"
    jwt = ""
    args = sys.argv[1:]
    if len(args) >= 2:
        user_id = args[0]
        hotel_name = args[1]
        # Buscar headless_mode y jwt en los argumentos
        for i, arg in enumerate(args[2:]):
            if arg == "--headless" and i+3 < len(args):
                headless_mode = args[i+3]
            if arg == "--jwt" and i+3 < len(args):
                jwt = args[i+3]
        asyncio.run(main(user_id, hotel_name, headless_mode, jwt))
    else:
        print("Modo API: ejecuta con 'uvicorn hotel_propio:app --reload'")
        print("Modo CLI: python hotel_propio.py <user_id> <hotel_name> [--headless <true|false|new>] [--jwt <token>]")