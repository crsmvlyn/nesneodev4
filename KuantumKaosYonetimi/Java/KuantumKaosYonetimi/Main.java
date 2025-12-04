// Main.java
package KuantumKaosYonetimi;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Scanner;

public class Main {
    
    // Generic List: Nesneleri saklamak için ArrayList<KuantumNesnesi> kullanılır.
    private static final List<KuantumNesnesi> ENVANTER = new ArrayList<>();
    private static int nesneSayaci = 1;
    private static final Random RASTGELE = new Random();
    private static final Scanner SCANNER = new Scanner(System.in);

    public static void main(String[] args) {
        System.out.println("OMEGA SEKTÖRÜ KUANTUM VERİ AMBARI YÖNETİMİ BAŞLADI.");
        
        // Sonsuz döngü (while)
        while (true) {
            try {
                menuGoster();
                String secim = SCANNER.nextLine();
                System.out.println();

                boolean islemYapildi = true;
                
                switch (secim) {
                    case "1":
                        yeniNesneEkle();
                        break;
                    case "2":
                        envanteriListele();
                        break;
                    case "3":
                        nesneyiAnalizEt();
                        break;
                    case "4":
                        acilDurumSogutmasiYap();
                        break;
                    case "5":
                        System.out.println("Sistem Kapatılıyor. İyi Günler, Amirim.");
                        return; // Programı sonlandır
                    default:
                        System.out.println("Geçersiz seçim. Lütfen 1-5 arasında bir değer girin.");
                        islemYapildi = false;
                        break;
                }
                
                // Eğer bir işlem yapıldıysa, stabiliteyi kontrol et
                if (islemYapildi) {
                    stabiliteKontrolu();
                }

            } 
            // Game Over: KuantumCokusuException yakalanırsa program sonlanır.
            catch (KuantumCokusuException ex) {
                System.out.println("\n=======================================================");
                System.err.println("!!! SİSTEM ÇÖKTÜ! TAHLİYE BAŞLATILIYOR... !!!");
                System.err.println("Hata Mesajı: " + ex.getMessage());
                System.out.println("=======================================================\n");
                return; // Programı sonlandır
            } 
            catch (Exception ex) {
                System.err.println("Beklenmedik bir hata oluştu: " + ex.getMessage());
            }

            System.out.println("\n--- Devam etmek için Enter tuşuna basın ---");
            SCANNER.nextLine(); // Enter tuşunu bekle
        }
    }

    private static void menuGoster() {
        System.out.println("\n=== KUANTUM AMBARI KONTROL PANELİ ===");
        System.out.println("1. Yeni Nesne Ekle (Rastgele Veri/Karanlık Madde/Anti Madde üretir)");
        System.out.println("2. Tüm Envanteri Listele (Durum Raporu)");
        System.out.println("3. Nesneyi Analiz Et (ID isteyerek)");
        System.out.println("4. Acil Durum Soğutması Yap (Sadece IKritik olanlar için!)");
        System.out.println("5. Çıkış");
        System.out.print("Seçiminiz: ");
    }

    private static void yeniNesneEkle() {
        // Rastgele nesne tipi seçimi (0: Veri, 1: Karanlık Madde, 2: Anti Madde)
        int tipSecimi = RASTGELE.nextInt(3); 
        String id = String.format("QN-%03d", nesneSayaci++);
        // Stabilite 50 ile 99 arasında rastgele başlasın
        double baslangicStabilite = RASTGELE.nextDouble() * 49 + 50; 
        
        KuantumNesnesi yeniNesne = null;

        if (tipSecimi == 0) {
            yeniNesne = new VeriPaketi(id, baslangicStabilite);
        } else if (tipSecimi == 1) {
            yeniNesne = new KaranlikMadde(id, baslangicStabilite);
        } else if (tipSecimi == 2) {
            yeniNesne = new AntiMadde(id, baslangicStabilite);
        }

        if (yeniNesne != null) {
            ENVANTER.add(yeniNesne);
            System.out.println("✅ Yeni Nesne Eklendi: " + yeniNesne.DurumBilgisi());
        }
    }

    private static void envanteriListele() {
        if (ENVANTER.isEmpty()) {
            System.out.println("Envanterde henüz hiçbir nesne yok.");
            return;
        }

        System.out.println("=== Mevcut Envanter Durum Raporu ===");
        // Polimorfizm: Listeleme yaparken döngü içinde hepsinin DurumBilgisi() metodunu çağırın.
        for (KuantumNesnesi nesne : ENVANTER) {
            String tur = nesne.getClass().getSimpleName(); // Nesnenin sınıf adını alır
            System.out.println("[" + tur + "] " + nesne.DurumBilgisi());
        }
    }

    private static KuantumNesnesi nesneBul(String id) {
        for (KuantumNesnesi nesne : ENVANTER) {
            if (nesne.getID().equals(id)) {
                return nesne;
            }
        }
        return null;
    }
    
    private static void nesneyiAnalizEt() {
        System.out.print("Analiz edilecek nesnenin ID'si: ");
        String id = SCANNER.nextLine().trim();

        KuantumNesnesi nesne = nesneBul(id);

        if (nesne == null) {
            System.out.println("HATA: ID '" + id + "' ile eşleşen nesne bulunamadı.");
            return;
        }

        // Analiz metodu çağrılır. (Polimorfizm)
        nesne.AnalizEt();
    }

    private static void acilDurumSogutmasiYap() {
        System.out.print("Soğutulacak nesnenin ID'si: ");
        String id = SCANNER.nextLine().trim();

        KuantumNesnesi nesne = nesneBul(id);

        if (nesne == null) {
            System.out.println("HATA: ID '" + id + "' ile eşleşen nesne bulunamadı.");
            return;
        }

        // Type Checking: Nesnenin IKritik olup olmadığı kontrol edilir (instanceof anahtar kelimesi ile).
        if (nesne instanceof IKritik) { 
            IKritik kritikNesne = (IKritik) nesne; // Nesneyi arayüze dönüştürür
            kritikNesne.AcilDurumSogutmasi();
        } else {
            // VeriPaketi (IKritik olmayan) için hata mesajı
            String tur = nesne.getClass().getSimpleName();
            System.out.println("HATA: Bu nesne (Türü: " + tur + ") soğutulamaz!");
        }
    }
    
    // Yardımcı Metot: Tüm envanteri kontrol eder ve patlayan nesne varsa hata fırlatır.
    private static void stabiliteKontrolu() {
        for (KuantumNesnesi nesne : ENVANTER) {
            if (nesne.getStabilite() <= 0) {
                // Stabilite 0'ın altına düştü, Özel Hata fırlatılıyor.
                throw new KuantumCokusuException(nesne.getID()); 
            }
        }
    }
}