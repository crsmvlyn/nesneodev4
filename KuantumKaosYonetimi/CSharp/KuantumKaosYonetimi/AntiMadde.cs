namespace KuantumKaosYonetimi
{
    // AntiMadde: KuantumNesnesi'nden türemiş ve IKritik arayüzünü uygulamıştır.
    public class AntiMadde : KuantumNesnesi, IKritik
    {
        public AntiMadde(string id, double stabilite)
            : base(id, 10, stabilite) // TehlikeSeviyesi: 10 (Çok Yüksek)
        {
        }

        // AnalizEt() (Çok Biçimlilik/Polymorphism)
        public override void AnalizEt()
        {
            // Stabilite 25 birim düşer.
            Stabilite -= 25;
            Console.WriteLine("Evrenin dokusu titriyor..."); // Ek uyarı
            Console.WriteLine($"[ID: {ID}] Anti Madde analizi yapıldı. Stabilite -25. Yeni Stabilite: {Stabilite:F2}%");
        }

        // AcilDurumSogutmasi() (IKritik Uygulaması)
        public void AcilDurumSogutmasi()
        {
            // Stabiliteyi +50 artırır (Kapsülleme max 100'ü halleder).
            Stabilite += 50;
            Console.WriteLine($"[ID: {ID}] Anti Madde soğutuldu! Stabilite +50. Yeni Stabilite: {Stabilite:F2}%");
        }
    }
}