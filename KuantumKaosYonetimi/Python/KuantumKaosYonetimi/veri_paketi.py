# veri_paketi.py
from .kuantum_nesnesi import KuantumNesnesi

# C. Nesne Çeşitleri: VeriPaketi (IKritik değil)
class VeriPaketi(KuantumNesnesi):
    
    def __init__(self, id_str: str, stabilite: float):
        # KuantumNesnesi'nin yapıcı metodunu çağırır. Tehlike seviyesi: 1
        super().__init__(id_str, 1, stabilite) 

    # AnalizEt() (Çok Biçimlilik/Polymorphism)
    def AnalizEt(self):
        # Stabilite sadece 5 birim düşer.
        self.Stabilite -= 5
        print(f"[ID: {self.ID}] Veri içeriği okundu. Stabilite -5. Yeni Stabilite: {self.Stabilite:.2f}%")