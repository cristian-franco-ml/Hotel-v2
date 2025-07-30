import sys
import asyncio
import json
import re
from bs4 import BeautifulSoup
from geopy.distance import geodesic
from playwright.async_api import async_playwright
import subprocess
import os

# Install Playwright browsers if not already installed
def ensure_playwright_browsers():
    try:
        import playwright
        print("Checking Playwright browser installation for Songkick scraping...", file=sys.stderr)
        
        # Set environment variables for Playwright
        os.environ['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/render/project/src/.cache/ms-playwright'
        os.environ['PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD'] = '0'
        
        # Create cache directory if it doesn't exist
        cache_dir = '/opt/render/project/src/.cache/ms-playwright'
        os.makedirs(cache_dir, exist_ok=True)
        
        # Force install Chromium with dependencies
        print("Installing Playwright browsers for Songkick...", file=sys.stderr)
        result = subprocess.run([
            sys.executable, "-m", "playwright", "install", "--with-deps", "chromium"
        ], capture_output=True, text=True, check=True)
        
        print("Playwright browsers installed successfully for Songkick!", file=sys.stderr)
        
    except Exception as e:
        print(f"Error ensuring Playwright browsers for Songkick: {e}", file=sys.stderr)

# Ensure browsers are installed before importing playwright
ensure_playwright_browsers()

try:
    sys.stdout.reconfigure(encoding='utf-8')
except AttributeError:
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

async def scrape_songkick_events():
    # Argumentos: latitud, longitud, radio_km
    if len(sys.argv) < 4:
        print(json.dumps([]))
        return

    hotel_lat = float(sys.argv[1])
    hotel_lon = float(sys.argv[2])
    radius_km = float(sys.argv[3])

    BASE_URL = "https://www.songkick.com"
    URL = "https://www.songkick.com/es/metro-areas/31097-mexico-tijuana"

    try:
        async with async_playwright() as p:
            # Try to launch browser with different options
            browser = None
            launch_options = [
                {"headless": True},
                {"headless": True, "args": ["--no-sandbox", "--disable-setuid-sandbox"]},
                {"headless": True, "args": ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"]}
            ]
            
            for i, options in enumerate(launch_options):
                try:
                    print(f"Attempting to launch browser for Songkick with options {i+1}: {options}", file=sys.stderr)
                    browser = await p.chromium.launch(**options)
                    print("Browser launched successfully for Songkick!", file=sys.stderr)
                    break
                except Exception as e:
                    print(f"Launch attempt {i+1} failed for Songkick: {e}", file=sys.stderr)
                    if i == len(launch_options) - 1:
                        raise Exception(f"All browser launch attempts failed for Songkick. Last error: {e}")
                    continue
            
            if not browser:
                raise Exception("Failed to launch browser for Songkick with any configuration")

            page = await browser.new_page()
            
            # Set user agent
            await page.set_extra_http_headers({
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
            })

            print(f"Navigating to Songkick URL: {URL}", file=sys.stderr)
            await page.goto(URL)
            
            # Wait for events to load
            try:
                await page.wait_for_selector("li.event-listings-element", timeout=30000)
                print("Events found on Songkick page", file=sys.stderr)
            except Exception as e:
                print(f"Timeout waiting for events on Songkick: {e}", file=sys.stderr)
                # Try to get the page content anyway
                html = await page.content()
                print(f"Page content length: {len(html)}", file=sys.stderr)
                if len(html) < 1000:
                    print("Page seems to be empty or blocked", file=sys.stderr)
                    await browser.close()
                    print(json.dumps([]))
                    return

            html = await page.content()
            await browser.close()

    except Exception as e:
        print(f"Error in Playwright scraping for Songkick: {e}", file=sys.stderr)
        print(json.dumps([]))
        return

    soup = BeautifulSoup(html, "html.parser")

    # Buscar todos los eventos
    li_events = soup.find_all("li", class_="event-listings-element")
    print(f"Found {len(li_events)} events on Songkick", file=sys.stderr)
    eventos = []

    for li in li_events:
        try:
            # Fecha
            time_tag = li.find("time")
            fecha = time_tag["datetime"] if time_tag and time_tag.has_attr("datetime") else li.get("title", "")
            # Limpiar fecha: solo los primeros 10 caracteres (YYYY-MM-DD)
            if len(fecha) > 10:
                fecha = fecha[:10]

            # Nombre del artista/evento
            strong = li.find("strong")
            nombre = strong.get_text(strip=True) if strong else ""

            # Lugar
            venue = li.find("a", class_="venue-link")
            lugar = venue.get_text(strip=True) if venue else ""

            # Enlace
            event_link = li.find("a", class_="event-link")
            enlace = BASE_URL + event_link["href"] if event_link and event_link.has_attr("href") else ""

            # Coordenadas (del JSON embebido)
            lat, lon = None, None
            microformat = li.find("div", class_="microformat")
            if microformat:
                script_tag = microformat.find("script", type="application/ld+json")
                if script_tag:
                    try:
                        data = json.loads(script_tag.string)
                        if isinstance(data, list):
                            data = data[0]
                        geo = data.get("location", {}).get("geo", {})
                        lat = geo.get("latitude")
                        lon = geo.get("longitude")
                    except Exception:
                        pass
            if lat is None or lon is None:
                continue

            # Calcular distancia
            distance = geodesic((hotel_lat, hotel_lon), (lat, lon)).kilometers
            if distance > radius_km:
                continue

            eventos.append({
                "nombre": nombre,
                "fecha": fecha,
                "lugar": lugar,
                "enlace": enlace,
                "latitude": lat,
                "longitude": lon,
                "distance_km": round(distance, 2)
            })
        except Exception as e:
            print(f"Error processing event: {e}", file=sys.stderr)
            continue

    print(f"Final events count: {len(eventos)}", file=sys.stderr)
    # Solo imprimir el JSON en stdout, sin debug
    print(json.dumps(eventos, ensure_ascii=False))

# Run the async function
if __name__ == "__main__":
    try:
        asyncio.run(scrape_songkick_events())
    except Exception as e:
        print("[]")
        print(f"Error in scraping Songkick: {e}", file=sys.stderr)
        sys.stderr.flush()
    finally:
        sys.stdout.flush()
        sys.stderr.flush() 

        