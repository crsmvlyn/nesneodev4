namespace KuantumKaosYonetimi
{
    // A. Temel Yapı: Soyut Sınıf (Abstract Class)
    public abstract class KuantumNesnesi
    {
        // Özellikler (Properties)
        public string ID { get; }
        public int TehlikeSeviyesi { get; }

        // Stabilite (Kapsülleme)
        private double _stabilite;
        public double Stabilite
        {
            get => _stabilite;
            set
            {
                // Kapsülleme: 0-100 aralığı dışındaki değerleri engelle
                if (value > 100)
                {
                    _stabilite = 100;
                }
                else if (value < 0)
                {
                    // Eğer stabilitenin düşmesi 0'ın altına inerse, hatayı fırlatmak için
                    // sadece değeri 0 olarak ayarlarız. Hatanın fırlatılması main döngüde kontrol edilir.
                    _stabilite = 0;
                }
                else
                {
                    _stabilite = value;
                }
            }
        }

        // Yapıcı Metot (Constructor)
        public KuantumNesnesi(string id, int tehlikeSeviyesi, double stabilite)
        {
            ID = id;
            TehlikeSeviyesi = tehlikeSeviyesi;
            Stabilite = stabilite; // Kapsüllenmiş setter'ı kullanır
        }

        // Soyut Metot (Abstract Method)
        public abstract void AnalizEt();

        // Somut Metot
        public string DurumBilgisi()
        {
            return $"[ID: {ID}] - Durum: Stabilite = {Stabilite:F2}% (Tehlike: {TehlikeSeviyesi}/10)";
        }
    }
}