// VeriPaketi.java
package KuantumKaosYonetimi;

public class VeriPaketi extends KuantumNesnesi {
    
    public VeriPaketi(String id, double stabilite) {
        // Tehlike Seviyesi: 1 (Düşük)
        super(id, 1, stabilite); 
    }

    // AnalizEt() (Çok Biçimlilik/Polymorphism)
    @Override
    public void AnalizEt() {
        // Stabiliteyi 5 birim düşür
        setStabilite(getStabilite() - 5);
        System.out.printf("[ID: %s] Veri içeriği okundu. Stabilite -5. Yeni Stabilite: %.2f%%%n", 
                          getID(), getStabilite());
    }
}