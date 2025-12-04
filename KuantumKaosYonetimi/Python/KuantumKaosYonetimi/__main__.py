# main.py
import random
import uuid # ID oluşturmak için (C#'taki Guid.NewGuid() gibi)
from typing import List

# Kendi modülümüzdeki sınıfları içeri aktarıyoruz.
# Bu yüzden klasörün içinde __init__.py olması önemlidir.
from .kuantum_nesnesi import KuantumNesnesi
from .i_kritik import IKritik
from .veri_paketi import VeriPaketi
from .karanlik_madde import KaranlikMadde
from .anti_madde import AntiMadde
from .kuantum_cokusu_exception import KuantumCokusuException

# Generic List karşılığı: Nesneleri tutan bir liste
ENVANTER: List[KuantumNesnesi] = []
NESNE_SAYACI = 1

def menu_goster():
    """Kullanıcıya menüyü gösterir."""
    print("\n=== KUANTUM AMBARI KONTROL PANELİ ===")
    print("1. Yeni Nesne Ekle (Rastgele)")
    print("2. Tüm Envanteri Listele (Durum Raporu)")
    print("3. Nesneyi Analiz Et (ID isteyerek)")
    print("4. Acil Durum Soğutması Yap (Sadece IKritik olanlar için!)")
    print("5. Çıkış")
    secim = input("Seçiminiz: ")
    return secim

def yeni_nesne_ekle():
    """Rastgele bir KuantumNesnesi oluşturur ve envantere ekler."""
    global NESNE_SAYACI
    # UUID yerine daha basit, C# örneğindeki gibi ID oluşturalım:
    id_str = f"QN-{NESNE_SAYACI:03d}" 
    NESNE_SAYACI += 1
    
    # Stabilite 50 ile 99 arasında rastgele başlar
    baslangic_stabilite = random.uniform(50.0, 99.0) 
    
    # Rastgele nesne tipi seçimi (0, 1, 2)
    tip_secimi = random.randint(0, 2)
    
    yeni_nesne = None

    if tip_secimi == 0:
        yeni_nesne = VeriPaketi(id_str, baslangic_stabilite)
    elif tip_secimi == 1:
        yeni_nesne = KaranlikMadde(id_str, baslangic_stabilite)
    elif tip_secimi == 2:
        yeni_nesne = AntiMadde(id_str, baslangic_stabilite)

    if yeni_nesne:
        ENVANTER.append(yeni_nesne)
        print(f"Yeni Nesne Eklendi: {yeni_nesne.DurumBilgisi()}")

def envanteri_listele():
    """Envanterdeki tüm nesnelerin durumunu listeler."""
    if not ENVANTER:
        print("Envanterde henüz hiçbir nesne yok.")
        return

    print("=== Mevcut Envanter Durum Raporu ===")
    # Polimorfizm: Tüm nesnelerden DurumBilgisi() metodu çağrılır.
    for nesne in ENVANTER:
        tur = nesne.__class__.__name__ # Nesnenin sınıf adını alır
        print(f"[{tur}] {nesne.DurumBilgisi()}")

def stabilite_kontrolu(nesne: KuantumNesnesi):
    """Nesnenin stabilitesini kontrol eder ve gerekirse hata fırlatır."""
    if nesne.Stabilite <= 0:
        # Stabilite 0'ın altına düştü, Özel Hata fırlatılıyor.
        raise KuantumCokusuException(nesne.ID)

def nesneyi_analiz_et():
    """Kullanıcının belirlediği nesneyi analiz eder ve stabilitesini düşürür."""
    id_str = input("Analiz edilecek nesnenin ID'si: ").strip()

    nesne = next((n for n in ENVANTER if n.ID == id_str), None)

    if nesne is None:
        print(f"HATA: ID '{id_str}' ile eşleşen nesne bulunamadı.")
        return

    # Analiz metodu çağrılır (Polimorfizm)
    nesne.AnalizEt()
    
    # Stabilite Kontrolü
    stabilite_kontrolu(nesne)

def acil_durum_sogutmasi_yap():
    """Sadece IKritik nesneler için acil durum soğutması yapar."""
    id_str = input("Soğutulacak nesnenin ID'si: ").strip()

    nesne = next((n for n in ENVANTER if n.ID == id_str), None)

    if nesne is None:
        print(f"HATA: ID '{id_str}' ile eşleşen nesne bulunamadı.")
        return

    # Type Checking: Nesnenin IKritik arayüzünü uygulayıp uygulamadığı kontrol edilir.
    # Python'da 'isinstance' kullanılır (C#'taki 'is' anahtar kelimesi gibi).
    if isinstance(nesne, IKritik): 
        nesne.AcilDurumSogutmasi()
        # Soğutma sonrası kontrol gerekmez (stabilite artıyor).
    else:
        # VeriPaketi (IKritik olmayan) için hata mesajı
        tur = nesne.__class__.__name__
        print(f"HATA: Bu nesne (Türü: {tur}) soğutulamaz! Sadece IKritik nesneler soğutulabilir.")

def main_loop():
    """Programın ana sonsuz döngüsünü çalıştırır."""
    print("OMEGA SEKTÖRÜ KUANTUM VERİ AMBARI YÖNETİMİ BAŞLADI.")
    
    while True:
        try:
            secim = menu_goster()
            print()

            if secim == "1":
                yeni_nesne_ekle()
            elif secim == "2":
                envanteri_listele()
            elif secim == "3":
                nesneyi_analiz_et()
            elif secim == "4":
                acil_durum_sogutmasi_yap()
            elif secim == "5":
                print("Sistem Kapatılıyor. İyi Günler, Amirim.")
                break
            else:
                print("Geçersiz seçim. Lütfen 1-5 arasında bir değer girin.")
        
        # Game Over: KuantumCokusuException yakalanırsa program sonlanır.
        except KuantumCokusuException as ex:
            print("\n=======================================================")
            print("!!! SİSTEM ÇÖKTÜ! TAHLİYE BAŞLATILIYOR... !!!")
            print(f"Hata Mesajı: {ex}")
            print("=======================================================\n")
            break # Programı sonlandır
        
        except Exception as ex:
            print(f"Beklenmedik bir hata oluştu: {ex}")

        input("\n--- Devam etmek için Enter tuşuna basın ---")
        # Python'da konsol temizleme (Windows/Linux/Mac için):
        import os
        os.system('cls' if os.name == 'nt' else 'clear') 

# Programın başlatıldığı ana nokta
if __name__ == "__main__":
    main_loop()