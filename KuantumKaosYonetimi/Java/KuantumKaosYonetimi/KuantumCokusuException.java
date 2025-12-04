// KuantumCokusuException.java
package KuantumKaosYonetimi;

// RuntimeException'dan türetilir (try-catch gereksinimi için)
public class KuantumCokusuException extends RuntimeException {
    
    // Yapıcı metot
    public KuantumCokusuException(String nesneId) {
        super("Kuantum Çöküşü! Patlayan Nesne ID: " + nesneId);
    }
}