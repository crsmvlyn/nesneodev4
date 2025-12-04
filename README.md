#  KUANTUM KAOS YÖNETİMİ SİMÜLASYONU

Bu proje, "Omega Sektörü Kuantum Veri Ambarı"nın dijital yönetimini simüle etmek amacıyla geliştirilmiştir. Temel amaç, depolanan maddelerin (Veri Paketi, Karanlık Madde, Anti Madde) **Stabilite** seviyelerini yönetmek ve Kuantum Çöküşü (Game Over) yaşanmadan günü tamamlamaktır.

##  Proje Amacı ve Uygulanan OOP Prensipleri

Bu çalışma, Nesne Yönelimli Programlamanın (OOP) temel mimarisini dört farklı dilde (**C#, Java, Python, JavaScript**) uygulamayı göstermektedir.

OOP Prensibi 

**Kalıtım (Inheritance)**  Tüm nesneler (`VeriPaketi`, `AntiMadde`, vb.) `KuantumNesnesi` **Abstract Class**'ından türetilmiştir. 

 **Kapsülleme (Encapsulation)**  `Stabilite` özelliği, değerinin 0 ile 100 arasında kalmasını garanti eden `setter` metotları ile korunur. 
 
**Çok Biçimlilik (Polymorphism)**  Tüm nesnelerin, listedeyken bile farklı tepkiler vermesini sağlayan `AnalizEt()` metodu. 

 **Arayüz (Interface)**  Kritik nesneler için `IKritik` arayüzü ve **Interface Segregation** prensibi kullanılmıştır. 
 
**Özel Hata Yönetimi**  `KuantumCokusuException` ile Game Over mekaniği sağlanmıştır. 

---

##  Klasör Yapısı

Proje, her dilin kendi klasöründe, tutarlı bir paket yapısını takip eder:

Çalıştırma Talimatları:

CSharp için: 
cd CSharp/KuantumKaosYonetimi
dotnet run

Python için:

cd Python
py -m KuantumKaosYonetimi

Java için:

cd Java 
javac KuantumKaosYonetimi/*.java
java KuantumKaosYonetimi.Main

Javascript için:

cd Javascript/KuantumKaosYonetimi
node main.js
