// VeriPaketi.js
const KuantumNesnesi = require('./KuantumNesnesi');

class VeriPaketi extends KuantumNesnesi {
    constructor(id, stabilite) {
        super(id, 1, stabilite); // TehlikeSeviyesi: 1
    }

    // AnalizEt() (Çok Biçimlilik/Polymorphism)
    AnalizEt() {
        // Stabilite 5 birim düşer. Setter otomatik olarak kapsüllemeyi çalıştırır.
        this.Stabilite -= 5;
        console.log(`[ID: ${this.ID}] Veri içeriği okundu. Stabilite -5. Yeni Stabilite: ${this.Stabilite.toFixed(2)}%`);
    }
}

module.exports = VeriPaketi;