// AntiMadde.js
const KuantumNesnesi = require('./KuantumNesnesi');

class AntiMadde extends KuantumNesnesi {
    constructor(id, stabilite) {
        super(id, 10, stabilite); // TehlikeSeviyesi: 10
    }

    // AnalizEt() (Çok Biçimlilik/Polymorphism)
    AnalizEt() {
        this.Stabilite -= 25;
        console.log("Evrenin dokusu titriyor..."); // Ek uyarı
        console.log(`[ID: ${this.ID}] Anti Madde analizi yapıldı. Stabilite -25. Yeni Stabilite: ${this.Stabilite.toFixed(2)}%`);
    }

    // AcilDurumSogutmasi() (IKritik Uygulaması)
    AcilDurumSogutmasi() {
        this.Stabilite += 50; // Setter max 100'ü halleder.
        console.log(`[ID: ${this.ID}] Anti Madde soğutuldu! Stabilite +50. Yeni Stabilite: ${this.Stabilite.toFixed(2)}%`);
    }
}

module.exports = AntiMadde;