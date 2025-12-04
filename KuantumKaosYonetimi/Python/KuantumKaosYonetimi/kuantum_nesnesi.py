# kuantum_nesnesi.py
from abc import ABC, abstractmethod

# A. Temel Yapı: Abstract Class
class KuantumNesnesi(ABC):
    
    # Yapıcı Metot (Constructor)
    def __init__(self, id_str: str, tehlike_seviyesi: int, stabilite: float):
        self.ID = id_str
        self.TehlikeSeviyesi = tehlike_seviyesi
        
        # Kapsülleme (Stabilite için özel setter/getter kullanacağız)
        self._stabilite = self._kontrol_stabilite(stabilite)

    # Stabilite Özelliği (Kapsülleme)
    @property
    def Stabilite(self) -> float:
        # Stabilite değerini döndürür.
        return self._stabilite
    
    @Stabilite.setter
    def Stabilite(self, value: float):
        # Stabilite'yi atamadan önce kontrol eder (Kapsülleme).
        self._stabilite = self._kontrol_stabilite(value)

    # Kapsüllemeyi uygulayan dahili yardımcı metot
    def _kontrol_stabilite(self, value: float) -> float:
        if value > 100:
            return 100
        # 0'dan küçük değerler için fırlatma kontrolü Main döngüde yapılacak
        elif value < 0:
            return 0
        else:
            return value

    # Soyut Metot (Abstract Method)
    @abstractmethod
    def AnalizEt(self):
        """Alt sınıfların doldurması gereken soyut analiz metodu."""
        pass

    # Somut Metot
    def DurumBilgisi(self) -> str:
        # f-string ile çıktı alınır (C#'taki string formatlaması gibi)
        return f"[ID: {self.ID}] - Durum: Stabilite = {self.Stabilite:.2f}% (Tehlike: {self.TehlikeSeviyesi}/10)"