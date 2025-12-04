namespace KuantumKaosYonetimi
{
    // VeriPaketi: KuantumNesnesi'nden türemiştir, IKritik değildir.
    public class VeriPaketi : KuantumNesnesi
    {
        public VeriPaketi(string id, double stabilite)
            : base(id, 1, stabilite) // TehlikeSeviyesi: 1 (Düşük)
        {
        }

        // AnalizEt() (Çok Biçimlilik/Polymorphism)
        public override void AnalizEt()
        {
            // Stabilite sadece 5 birim düşer.
            Stabilite -= 5;
            Console.WriteLine($"[ID: {ID}] Veri içeriği okundu. Stabilite -5. Yeni Stabilite: {Stabilite:F2}%");
        }
    }
}