// KuantumNesnesi.js
const KuantumCokusuException = require('./KuantumCokusuException');

/**
 * A. Temel Yapı: Abstract Class
 */
class KuantumNesnesi {
    constructor(id, tehlikeSeviyesi, stabilite) {
        // Abstract kontrolü: Abstract sınıftan direkt nesne üretilmesini engeller.
        if (this.constructor === KuantumNesnesi) {
            throw new Error("KuantumNesnesi soyut bir sınıftır ve doğrudan örneklendirilemez.");
        }

        this.ID = id;
        this.TehlikeSeviyesi = tehlikeSeviyesi;
        
        // Kapsülleme için private değişken
        this._stabilite = this._kontrolStabilite(stabilite);
    }

    // Stabilite Getter (Erişim)
    get Stabilite() {
        return this._stabilite;
    }

    // Stabilite Setter (Kapsülleme)
    set Stabilite(yeniDeger) {
        // Değeri atamadan önce kontrol eder.
        this._stabilite = this._kontrolStabilite(yeniDeger);
    }

    // Kapsüllemeyi uygulayan dahili yardımcı metot
    _kontrolStabilite(value) {
        if (value > 100) {
            return 100;
        } else if (value < 0) {
            return 0;
        }
        return value;
    }

    // Soyut Metot: AnalizEt()
    AnalizEt() {
        // Abstract metot kontrolü: Alt sınıfların bu metodu uygulaması zorunludur.
        throw new Error("AnalizEt() metodu alt sınıflar tarafından uygulanmalıdır.");
    }

    // DurumBilgisi() Metodu
    DurumBilgisi() {
        return `[ID: ${this.ID}] - Durum: Stabilite = ${this.Stabilite.toFixed(2)}% (Tehlike: ${this.TehlikeSeviyesi}/10)`;
    }
}

module.exports = KuantumNesnesi;