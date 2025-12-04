# anti_madde.py
from .kuantum_nesnesi import KuantumNesnesi
from .i_kritik import IKritik

# C. Nesne Çeşitleri: AntiMadde (IKritik'i uygular)
class AntiMadde(KuantumNesnesi, IKritik):
    
    def __init__(self, id_str: str, stabilite: float):
        # Tehlike seviyesi: 10
        super().__init__(id_str, 10, stabilite) 

    # AnalizEt() (Çok Biçimlilik/Polymorphism)
    def AnalizEt(self):
        # Stabilite 25 birim düşer.
        self.Stabilite -= 25
        print("Evrenin dokusu titriyor...") # Ek uyarı
        print(f"[ID: {self.ID}] Anti Madde analizi yapıldı. Stabilite -25. Yeni Stabilite: {self.Stabilite:.2f}%")

    # AcilDurumSogutmasi() (IKritik Uygulaması)
    def AcilDurumSogutmasi(self):
        # Stabiliteyi +50 artırır (Setter max 100'ü halleder).
        self.Stabilite += 50
        print(f"[ID: {self.ID}] Anti Madde soğutuldu! Stabilite +50. Yeni Stabilite: {self.Stabilite:.2f}%")