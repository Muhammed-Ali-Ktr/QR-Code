# Next-Gen QR Code Generator 🚀

Next-Gen QR Code Generator, modern ve şık bir Bento Grid arayüzüne sahip, yüksek özelleştirilebilirlik sunan yeni nesil bir QR kod oluşturma web uygulamasıdır.

Bu proje, kullanıcının paylaştığı lüks gösterge paneli (dashboard) arayüz şablonuna sadık kalınarak, cam morfizasyonu (glassmorphism) ve dinamik mikro animasyonlar kullanılarak sıfırdan tasarlanmıştır.

## ✨ Özellikler

- **📱 Premium Bento Grid Arayüzü**: Göze hitap eden, temiz, bölmeli ve responsive (mobil uyumlu) modern yerleşim planı.
- **🌗 Gece / Gündüz Modu**: CSS değişkenleri (variables) ile inşa edilmiş, göz yormayan, tek tıkla geçiş yapılabilen yumuşak geçişli koyu ve açık temalar.
- **📦 Gelişmiş QR Özelleştirme (qr-code-styling)**:
  - **Nokta Stilleri**: Kare, Nokta (Dots), Yuvarlak (Rounded), Yumuşak (Extra-rounded) ve Modern (Classy) desen seçenekleri.
  - **Köşe Çerçeve Stilleri (Göz)**: Kare, Yuvarlak ve Yaprak (Outround) göz çerçeveleri.
  - **Dinamik Renkler**: Canlı renk seçicileri ile QR rengi ve arka plan rengi belirleme.
  - **Hızlı Renk Paletleri**: Hazır degrade/katı renk butonları ile hızlı renklendirme.
- **🖼️ Merkezi Logo Desteği**:
  - QR kodun merkezine özel logo yükleme (Sürükle-Bırak veya Dosya Seçici ile).
  - Logo ölçeklendirme sürükleci (slider).
  - Logonun arkasındaki QR kod noktalarını gizleme/gösterme seçeneği (tarama kalitesini artırmak için).
- **🗂️ Canlı Şablon Kartları (Template Stack)**:
  - Sağ alt köşede üst üste istiflenmiş, üzerine gelindiğinde yayılan şık kart animasyonları.
  - Tek tıkla hazır temaları uygulama:
    - *Default Dark* (Klasik Siyah/Beyaz)
    - *Royal Glass* (Kraliyet Mavisi)
    - *Cyber Sunset* (Degrade Koyu Siberpunk)
    - *Mint Forest* (Ferah Yeşil/Nane)
- **⚡ Çoklu İçerik Tipleri**:
  - 🔗 **URL**: Web siteleri için.
  - 📝 **Düz Metin**: Serbest mesajlar için.
  - 📶 **Wi-Fi**: Ağ adı, şifre ve şifreleme tipi (WPA/WEP/Açık) ile otomatik Wi-Fi bağlantısı için.
  - 📧 **E-posta**: Alıcı adresi, konu ve mesaj gövdesi ile hazır e-postalar için.
  - 📞 **Telefon**: Doğrudan arama başlatmak için.
- **💾 İndirme, Paylaşma & Kopyalama**:
  - Yüksek çözünürlüklü **PNG** ve **SVG** formatlarında indirme seçeneği.
  - 📋 **Görseli Panoya Kopyalama**: QR kodunu doğrudan resim olarak panoya kopyalayıp istediğiniz yere yapıştırabilme (Ctrl+V) kolaylığı.
  - WhatsApp, X (Twitter) ve Facebook entegrasyonu içeren şık paylaşım penceresi.
- **🔔 Mikro Etkileşimler**: Başarılı işlemler için ekranın altında beliren yumuşak animasyonlu bildirimler (Toast).

## 🛠️ Kullanılan Teknolojiler

- **HTML5**: Semantik sayfa yapısı.
- **Vanilla CSS (CSS Variables)**: Tema geçişleri, modern yerleşim, responsive grid yapısı ve özel animasyonlar.
- **Vanilla JavaScript (ES6+)**: Durum (state) yönetimi ve arayüz etkileşimleri.
- **qr-code-styling**: QR kodlarını yüksek kalitede çizmek ve indirmek için kullanılan modern JavaScript kütüphanesi.
- **Google Fonts**: Outfit & Plus Jakarta Sans yazı tipleri.

## 🚀 Kurulum ve Çalıştırma

Proje tamamen istemci taraflı (client-side) çalıştığı için herhangi bir sunucu kurulumu gerektirmez.

1. Bu klasördeki dosyaları bilgisayarınıza indirin.
2. `qrcode.html` dosyasına çift tıklayarak tarayıcınızda açın.
3. Veya yerel bir canlı sunucu (örneğin VS Code Live Server eklentisi) kullanarak çalıştırın.

## 📂 Dosya Yapısı

- `qrcode.html` -> Uygulamanın ana iskeleti ve arayüz elemanları.
- `qrcode.css` -> Tema değişkenleri, Bento grid yerleşimi, telefon mockup'ı ve animasyon stilleri.
- `qrcode.js` -> QR kod üretme mantığı, dinamik form yönetimi ve dosya/pano işlemleri.
- `README.md` -> Proje açıklama ve kullanım kılavuzu.
