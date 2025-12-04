// IKritik.js

/**
 * B. Arayüz (Interface Segregation)
 * Kritik nesnelerin uygulayacağı sözleşme.
 */
class IKritik {
    AcilDurumSogutmasi() {
        // Bu, alt sınıfların implemente etmesi gereken bir metottur.
        throw new Error("AcilDurumSogutmasi() metodu IKritik nesneler tarafından uygulanmalıdır.");
    }
}

module.exports = IKritik;