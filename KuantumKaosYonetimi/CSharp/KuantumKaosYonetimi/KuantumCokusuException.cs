namespace KuantumKaosYonetimi
{
    // D. Özel Hata Yönetimi (Custom Exception)
    // Standart Exception sınıfından türetilir.
    public class KuantumCokusuException : Exception
    {
        public KuantumCokusuException(string nesneId)
            : base($"Kuantum Çöküşü! Patlayan Nesne ID: {nesneId}")
        {
        }
    }
}