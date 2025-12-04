using KuantumKaosYonetimi;

// Ana Sınıf
public class Program
{
    // Generic List: Nesneleri saklamak için List<KuantumNesnesi> kullanılır.
    private static List<KuantumNesnesi> Envanter = new List<KuantumNesnesi>();
    private static int NesneSayaci = 1;
    private static readonly Random Rastgele = new Random();

    public static void Main(string[] args)
    {
        Console.WriteLine("OMEGA SEKTÖRÜ KUANTUM VERİ AMBARI YÖNETİMİ BAŞLADI.");
        
        // Sonsuz döngü (while)
        while (true)
        {
            try
            {
                MenuGoster();
                string secim = Console.ReadLine();
                Console.WriteLine();

                switch (secim)
                {
                    case "1":
                        YeniNesneEkle();
                        break;
                    case "2":
                        EnvanteriListele();
                        break;
                    case "3":
                        NesneyiAnalizEt();
                        break;
                    case "4":
                        AcilDurumSogutmasiYap();
                        break;
                    case "5":
                        Console.WriteLine("Sistem Kapatılıyor. İyi Günler, Amirim.");
                        return; // Programı sonlandır
                    default:
                        Console.WriteLine("Geçersiz seçim. Lütfen 1-5 arasında bir değer girin.");
                        break;
                }
            }
            // Game Over: KuantumCokusuException yakalanırsa program sonlanır.
            catch (KuantumCokusuException ex)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("\n=======================================================");
                Console.WriteLine("!!! SİSTEM ÇÖKTÜ! TAHLİYE BAŞLATILIYOR... !!!");
                Console.WriteLine($"Hata Mesajı: {ex.Message}");
                Console.WriteLine("=======================================================\n");
                Console.ResetColor();
                return; // Programı sonlandır
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Beklenmedik bir hata oluştu: {ex.Message}");
            }

            Console.WriteLine("\n--- Devam etmek için bir tuşa basın ---");
            Console.ReadKey();
            Console.Clear();
        }
    }

    private static void MenuGoster()
    {
        Console.WriteLine("\n=== KUANTUM AMBARI KONTROL PANELİ ===");
        Console.WriteLine("1. Yeni Nesne Ekle");
        Console.WriteLine("2. Tüm Envanteri Listele (Durum Raporu)");
        Console.WriteLine("3. Nesneyi Analiz Et (ID isteyerek)");
        Console.WriteLine("4. Acil Durum Soğutması Yap (Sadece IKritik olanlar için!)");
        Console.WriteLine("5. Çıkış");
        Console.Write("Seçiminiz: ");
    }

    private static void YeniNesneEkle()
    {
        // Rastgele nesne tipi seçimi (1: Veri, 2: Karanlık Madde, 3: Anti Madde)
        int tipSecimi = Rastgele.Next(1, 4); 
        string id = $"QN-{NesneSayaci++}";
        // Stabilite 50 ile 99 arasında rastgele başlasın
        double baslangicStabilite = Rastgele.NextDouble() * 49 + 50; 
        
        KuantumNesnesi yeniNesne = null;

        switch (tipSecimi)
        {
            case 1:
                yeniNesne = new VeriPaketi(id, baslangicStabilite);
                break;
            case 2:
                yeniNesne = new KaranlikMadde(id, baslangicStabilite);
                break;
            case 3:
                yeniNesne = new AntiMadde(id, baslangicStabilite);
                break;
        }

        if (yeniNesne != null)
        {
            Envanter.Add(yeniNesne);
            Console.WriteLine($"Yeni Nesne Eklendi: {yeniNesne.DurumBilgisi()}");
        }
    }

    private static void EnvanteriListele()
    {
        if (Envanter.Count == 0)
        {
            Console.WriteLine("Envanterde henüz hiçbir nesne yok.");
            return;
        }

        Console.WriteLine("=== Mevcut Envanter Durum Raporu ===");
        // Polimorfizm: Tüm nesnelerin DurumBilgisi() metodu çağrılır.
        foreach (var nesne in Envanter)
        {
            string tur = nesne.GetType().Name;
            Console.WriteLine($"[{tur}] {nesne.DurumBilgisi()}");
        }
    }

    private static void NesneyiAnalizEt()
    {
        Console.Write("Analiz edilecek nesnenin ID'si: ");
        string id = Console.ReadLine();

        KuantumNesnesi nesne = Envanter.FirstOrDefault(n => n.ID == id);

        if (nesne == null)
        {
            Console.WriteLine($"HATA: ID '{id}' ile eşleşen nesne bulunamadı.");
            return;
        }

        // Analiz metodu çağrılır.
        nesne.AnalizEt();
        
        // Stabilite Kontrolü: Analiz sonrası kontrol yapılır.
        StabiliteKontrolu(nesne);
    }

    private static void AcilDurumSogutmasiYap()
    {
        Console.Write("Soğutulacak nesnenin ID'si: ");
        string id = Console.ReadLine();

        KuantumNesnesi nesne = Envanter.FirstOrDefault(n => n.ID == id);

        if (nesne == null)
        {
            Console.WriteLine($"HATA: ID '{id}' ile eşleşen nesne bulunamadı.");
            return;
        }

        // Type Checking: Nesnenin IKritik olup olmadığı kontrol edilir (is anahtar kelimesi ile).
        if (nesne is IKritik kritikNesne) 
        {
            kritikNesne.AcilDurumSogutmasi();
            // Soğutma sonrası stabilite kontrolüne gerek yok (stabilite artıyor).
        }
        else
        {
            // VeriPaketi (IKritik olmayan) için hata mesajı
            Console.WriteLine($"HATA: Bu nesne (Türü: {nesne.GetType().Name}) soğutulamaz! Sadece IKritik nesneler soğutulabilir.");
        }
    }
    
    // Yardımcı Metot: Stabilite 0'a düştüyse KuantumCokusuException fırlatır.
    private static void StabiliteKontrolu(KuantumNesnesi nesne)
    {
        if (nesne.Stabilite <= 0)
        {
            // Stabilite 0'ın altına düştü, Özel Hata fırlatılıyor.
            throw new KuantumCokusuException(nesne.ID); 
        }
    }
}