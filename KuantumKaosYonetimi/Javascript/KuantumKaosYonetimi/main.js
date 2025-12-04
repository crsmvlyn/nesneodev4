// main.js
const readline = require('readline');
const KuantumCokusuException = require('./KuantumCokusuException');
const KuantumNesnesi = require('./KuantumNesnesi');
const VeriPaketi = require('./VeriPaketi');
const KaranlikMadde = require('./KaranlikMadde');
const AntiMadde = require('./AntiMadde');
const IKritik = require('./IKritik');

// Generic List karşılığı: Nesneleri tutan bir Array
const Envanter = [];
let nesneSayaci = 1;

// Readline arayüzünü oluşturur (Kullanıcıdan girdi almak için)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menuGoster() {
    console.log("\n=== KUANTUM AMBARI KONTROL PANELİ ===");
    console.log("1. Yeni Nesne Ekle (Rastgele)");
    console.log("2. Tüm Envanteri Listele (Durum Raporu)");
    console.log("3. Nesneyi Analiz Et (ID isteyerek)");
    console.log("4. Acil Durum Soğutması Yap (Sadece IKritik olanlar için!)");
    console.log("5. Çıkış");
}

function yeniNesneEkle() {
    const id = `QN-${nesneSayaci++}`;
    // Stabilite 50 ile 99 arasında rastgele başlar
    const baslangicStabilite = Math.random() * 49 + 50; 
    
    // Rastgele nesne tipi seçimi (0: Veri, 1: Karanlık Madde, 2: Anti Madde)
    const tipSecimi = Math.floor(Math.random() * 3);
    
    let yeniNesne = null;

    if (tipSecimi === 0) {
        yeniNesne = new VeriPaketi(id, baslangicStabilite);
    } else if (tipSecimi === 1) {
        yeniNesne = new KaranlikMadde(id, baslangicStabilite);
    } else if (tipSecimi === 2) {
        yeniNesne = new AntiMadde(id, baslangicStabilite);
    }

    if (yeniNesne) {
        Envanter.push(yeniNesne);
        console.log(`Yeni Nesne Eklendi: ${yeniNesne.DurumBilgisi()}`);
    }
    return true;
}

function envanteriListele() {
    if (Envanter.length === 0) {
        console.log("Envanterde henüz hiçbir nesne yok.");
        return true;
    }

    console.log("=== Mevcut Envanter Durum Raporu ===");
    // Polimorfizm: Tüm nesnelerden DurumBilgisi() metodu çağrılır.
    Envanter.forEach(nesne => {
        const tur = nesne.constructor.name; // Nesnenin sınıf adını alır
        console.log(`[${tur}] ${nesne.DurumBilgisi()}`);
    });
    return true;
}

function stabiliteKontrolu(nesne) {
    if (nesne.Stabilite <= 0) {
        // Stabilite 0'ın altına düştü, Özel Hata fırlatılıyor.
        throw new KuantumCokusuException(nesne.ID); 
    }
}

function nesneyiAnalizEt(callback) {
    rl.question("Analiz edilecek nesnenin ID'si: ", (id) => {
        const nesne = Envanter.find(n => n.ID === id.trim());

        if (!nesne) {
            console.log(`HATA: ID '${id.trim()}' ile eşleşen nesne bulunamadı.`);
            return callback(true);
        }

        try {
            // Analiz metodu çağrılır (Polimorfizm)
            nesne.AnalizEt();
            
            // Stabilite Kontrolü
            stabiliteKontrolu(nesne);
            callback(true);
        } catch (error) {
            callback(error); // Hata yakalandı, ana döngüye iletilir
        }
    });
}

function acilDurumSogutmasiYap(callback) {
    rl.question("Soğutulacak nesnenin ID'si: ", (id) => {
        const nesne = Envanter.find(n => n.ID === id.trim());

        if (!nesne) {
            console.log(`HATA: ID '${id.trim()}' ile eşleşen nesne bulunamadı.`);
            return callback(true);
        }

        // Type Checking: Nesnenin AcilDurumSogutmasi metodu var mı kontrol edilir (Duck Typing).
        // Bu, C#'taki 'is IKritik' kontrolünün JavaScript'teki en yaygın karşılığıdır.
        if (typeof nesne.AcilDurumSogutmasi === 'function') {
            nesne.AcilDurumSogutmasi();
            callback(true);
        } else {
            // VeriPaketi (IKritik olmayan) için hata mesajı
            const tur = nesne.constructor.name;
            console.log(`HATA: Bu nesne (Türü: ${tur}) soğutulamaz! Sadece IKritik nesneler soğutulabilir.`);
            callback(true);
        }
    });
}

// Oynanış Döngüsü (Node.js'te asenkron olarak çalışır)
function mainLoop() {
    console.log("\nOMEGA SEKTÖRÜ KUANTUM VERİ AMBARI YÖNETİMİ BAŞLADI.");
    
    rl.on('line', (secim) => {
        if (!secim) return;
        
        secim = secim.trim();
        let devam = true;
        
        const islemCallback = (result) => {
            if (result instanceof Error) {
                // KuantumCokusuException yakalandı
                console.log("\n=======================================================");
                console.log("!!! SİSTEM ÇÖKTÜ! TAHLİYE BAŞLATILIYOR... !!!");
                console.log(`Hata Mesajı: ${result.message}`);
                console.log("=======================================================\n");
                rl.close();
                return;
            }
            if (devam) {
                console.log("\n--- Devam etmek için Enter/Seçiminizi yazın ---");
                menuGoster();
                rl.prompt();
            }
        };

        try {
            switch (secim) {
                case "1":
                    devam = yeniNesneEkle();
                    islemCallback(true);
                    break;
                case "2":
                    devam = envanteriListele();
                    islemCallback(true);
                    break;
                case "3":
                    devam = false; // Asenkron olduğu için döngüyü durdur
                    nesneyiAnalizEt(islemCallback);
                    break;
                case "4":
                    devam = false; // Asenkron olduğu için döngüyü durdur
                    acilDurumSogutmasiYap(islemCallback);
                    break;
                case "5":
                    console.log("Sistem Kapatılıyor. İyi Günler, Amirim.");
                    rl.close();
                    return;
                default:
                    console.log("Geçersiz seçim. Lütfen 1-5 arasında bir değer girin.");
                    islemCallback(true);
                    break;
            }
        } catch (error) {
             // Diğer çalışma zamanı hatalarını yakala
            islemCallback(error);
        }
    });

    menuGoster();
    rl.prompt();

    rl.on('close', () => {
        // Program sonlandığında çalışır
        process.exit(0);
    });
}

// Programı başlat
mainLoop();