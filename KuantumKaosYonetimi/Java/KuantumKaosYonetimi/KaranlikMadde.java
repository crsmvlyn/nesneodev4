// KaranlikMadde.java
package KuantumKaosYonetimi;

// KuantumNesnesi'nden kalıtım alır ve IKritik arayüzünü uygular
public class KaranlikMadde extends KuantumNesnesi implements IKritik {
    
    public KaranlikMadde(String id, double stabilite) {
        // Tehlike Seviyesi: 8 (Yüksek)
        super(id, 8, stabilite); 
    }

    // AnalizEt() (Çok Biçimlilik/Polymorphism)
    @Override
    public void AnalizEt() {
        // Stabiliteyi 15 birim düşür
        setStabilite(getStabilite() - 15);
        System.out.printf("[ID: %s] Karanlık Madde analizi yapıldı. Stabilite -15. Yeni Stabilite: %.2f%%%n", 
                          getID(), getStabilite());
    }

    // AcilDurumSogutmasi() (IKritik Uygulaması)
    @Override
    public void AcilDurumSogutmasi() {
        // Stabiliteyi 50 birim artır (Setter max 100'ü halleder)
        setStabilite(getStabilite() + 50);
        System.out.printf("[ID: %s] Karanlık Madde soğutuldu! Stabilite +50. Yeni Stabilite: %.2f%%%n", 
                          getID(), getStabilite());
    }
}