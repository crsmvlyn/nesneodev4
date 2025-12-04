# kuantum_cokusu_exception.py

# D. Özel Hata Yönetimi
class KuantumCokusuException(Exception):
    """
    Stabilite %0'ın altına düştüğünde fırlatılacak özel hata sınıfı.
    """
    def __init__(self, nesne_id):
        self.nesne_id = nesne_id
        super().__init__(f"Kuantum Çöküşü! Patlayan Nesne ID: {nesne_id}")