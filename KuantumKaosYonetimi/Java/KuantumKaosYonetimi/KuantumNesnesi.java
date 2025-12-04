// KuantumNesnesi.java
package KuantumKaosYonetimi;

// Abstract sınıf bildirimi
public abstract class KuantumNesnesi {
    
    // Özellikler (Fields)
    private final String ID;
    private final int TehlikeSeviyesi;
    private double Stabilite; // Kapsülleme ile yönetilecek
    
    // Yapıcı Metot (Constructor)
    public KuantumNesnesi(String id, int tehlikeSeviyesi, double stabilite) {
        this.ID = id;
        this.TehlikeSeviyesi = tehlikeSeviyesi;
        // Setter metodunu kullanarak kapsüllemeyi çalıştırır
        setStabilite(stabilite); 
    }

    // Stabilite Setter (Kapsülleme)
    public void setStabilite(double stabilite) {
        if (stabilite > 100) {
            this.Stabilite = 100;
        } 
        // 0'dan küçük değerler için fırlatma kontrolü Main döngüde yapılacak
        else if (stabilite < 0) {
            this.Stabilite = 0;
        } 
        else {
            this.Stabilite = stabilite;
        }
    }

    // Stabilite Getter
    public double getStabilite() {
        return Stabilite;
    }

    // ID Getter (ID final olduğu için setter'a gerek yok)
    public String getID() {
        return ID;
    }
    
    // TehlikeSeviyesi Getter
    public int getTehlikeSeviyesi() {
        return TehlikeSeviyesi;
    }

    // AnalizEt(): Soyut Metot
    public abstract void AnalizEt();

    // DurumBilgisi(): Nesnenin ID'sini ve o anki stabilitesini string döndürür
    public String DurumBilgisi() {
        // String.format kullanarak C# stili formatlama yapılır
        return String.format("[ID: %s] - Durum: Stabilite = %.2f%% (Tehlike: %d/10)", 
                              this.ID, this.Stabilite, this.TehlikeSeviyesi);
    }
}