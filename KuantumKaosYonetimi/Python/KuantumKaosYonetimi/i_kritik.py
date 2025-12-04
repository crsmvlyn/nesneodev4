# i_kritik.py
from abc import ABC, abstractmethod

# B. Arayüz (Interface Segregation karşılığı)
class IKritik(ABC):
    
    @abstractmethod
    def AcilDurumSogutmasi(self):
        """Bu metot çağrıldığında nesnenin stabilitesi +50 artar (Max 100)."""
        pass