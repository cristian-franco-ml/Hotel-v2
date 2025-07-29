import asyncio
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from hotel_propio import scrape_booking_prices

async def test_headless_scraping():
    """Script de prueba para verificar el scraping en modo headless"""
    print("=== PRUEBA DE SCRAPING EN MODO HEADLESS ===")
    
    # Usar un hotel conocido para la prueba
    hotel_name = "TIJUANA MARRIOTT HOTEL"
    
    try:
        print(f"Probando scraping headless para: {hotel_name}")
        results = await scrape_booking_prices(hotel_name, headless_mode="true")
        
        print("\n=== RESULTADOS DEL SCRAPING HEADLESS ===")
        print(f"Total de días procesados: {len(results)}")
        
        if not results:
            print("❌ No se obtuvieron resultados")
            return
        
        for day in results:
            print(f"\n📅 Fecha: {day['date']}")
            print(f"🏠 Habitaciones encontradas: {len(day['rooms'])}")
            
            if day['rooms']:
                for i, room in enumerate(day['rooms'], 1):
                    print(f"  {i}. {room['room_type']} - {room['price']}")
            else:
                print("  ❌ No se encontraron habitaciones")
        
        # Análisis
        total_rooms = sum(len(day['rooms']) for day in results)
        days_with_rooms = sum(1 for day in results if day['rooms'])
        
        print(f"\n=== ANÁLISIS ===")
        print(f"Total de habitaciones: {total_rooms}")
        print(f"Días con habitaciones: {days_with_rooms}/{len(results)}")
        
        if total_rooms > 0:
            print("✅ El scraping headless está funcionando correctamente")
        else:
            print("❌ No se encontraron habitaciones en modo headless")
            
    except Exception as e:
        print(f"❌ Error durante el scraping headless: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_headless_scraping()) 