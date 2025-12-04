// KaranlikMadde.js
const KuantumNesnesi = require('./KuantumNesnesi');
// IKritik'i require etmeye gerek yoktur, sadece metodu implemente ederiz.

class KaranlikMadde extends KuantumNesnesi {
    constructor(id, stabilite) {
        super(id, 8, stabilite); // TehlikeSeviyesi: 8
    }

    // AnalizEt() (Çok Biçimlilik/Polymorphism)
    AnalizEt() {
        this.Stabilite -= 15;
        console.log(`[ID: ${this.ID}] Karanlık Madde analizi yapıldı. Stabilite -15. Yeni Stabilite: ${this.Stabilite.toFixed(2)}%`);
    }

    // AcilDurumSogutmasi() (IKritik Uygulaması)
    AcilDurumSogutmasi() {
        this.Stabilite += 50; // Setter max 100'ü halleder.
        console.log(`[ID: ${this.ID}] Karanlık Madde soğutuldu! Stabilite +50. Yeni Stabilite: ${this.Stabilite.toFixed(2)}%`);
    }
}

module.exports = KaranlikMadde;