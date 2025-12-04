namespace KuantumKaosYonetimi
{
    // KaranlikMadde: KuantumNesnesi'nden türemiş ve IKritik arayüzünü uygulamıştır.
    public class KaranlikMadde : KuantumNesnesi, IKritik
    {
        public KaranlikMadde(string id, double stabilite)
            : base(id, 8, stabilite) // TehlikeSeviyesi: 8 (Yüksek)
        {
        }

        // AnalizEt() (Çok Biçimlilik/Polymorphism)
        public override void AnalizEt()
        {
            // Stabilite 15 birim düşer.
            Stabilite -= 15;
            Console.WriteLine($"[ID: {ID}] Karanlık Madde analizi yapıldı. Stabilite -15. Yeni Stabilite: {Stabilite:F2}%");
        }

        // AcilDurumSogutmasi() (IKritik Uygulaması)
        public void AcilDurumSogutmasi()
        {
            // Stabiliteyi +50 artırır (Kapsülleme max 100'ü halleder).
            Stabilite += 50;
            Console.WriteLine($"[ID: {ID}] Karanlık Madde soğutuldu! Stabilite +50. Yeni Stabilite: {Stabilite:F2}%");
        }
    }
}