# karanlik_madde.py
from .kuantum_nesnesi import KuantumNesnesi
from .i_kritik import IKritik

# C. Nesne Çeşitleri: KaranlikMadde (IKritik'i uygular)
class KaranlikMadde(KuantumNesnesi, IKritik):
    
    def __init__(self, id_str: str, stabilite: float):
        # Tehlike seviyesi: 8
        super().__init__(id_str, 8, stabilite) 

    # AnalizEt() (Çok Biçimlilik/Polymorphism)
    def AnalizEt(self):
        # Stabilite 15 birim düşer.
        self.Stabilite -= 15
        print(f"[ID: {self.ID}] Karanlık Madde analizi yapıldı. Stabilite -15. Yeni Stabilite: {self.Stabilite:.2f}%")

    # AcilDurumSogutmasi() (IKritik Uygulaması)
    def AcilDurumSogutmasi(self):
        # Stabiliteyi +50 artırır (Setter max 100'ü halleder).
        self.Stabilite += 50
        print(f"[ID: {self.ID}] Karanlık Madde soğutuldu! Stabilite +50. Yeni Stabilite: {self.Stabilite:.2f}%")