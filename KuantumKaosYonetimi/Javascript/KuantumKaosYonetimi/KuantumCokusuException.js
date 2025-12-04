// KuantumCokusuException.js

/**
 * D. Özel Hata Yönetimi (Custom Exception)
 * Stabilite %0'ın altına düştüğünde fırlatılır.
 */
class KuantumCokusuException extends Error {
    constructor(nesneId) {
        super(`Kuantum Çöküşü! Patlayan Nesne ID: ${nesneId}`);
        this.name = "KuantumCokusuException"; // Hata tipini belirtir
        this.nesneId = nesneId;
    }
}

module.exports = KuantumCokusuException;