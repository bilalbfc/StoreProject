## 🚀 Başlangıç

### Ön Koşullar
* [.NET SDK](https://dotnet.microsoft.com/) (en son önerilen sürüm)
* Modern bir web tarayıcısı
* (`appsettings.json` içerisindeki tercihinize göre) MS SQL Server veya SQLite

### Backend'i Çalıştırma (`StoreApi`)
1. API proje dizinine gidin:
   ```bash
   cd FrontendIntegration/StoreApi
   ```
2. Bağımlılıkları yükleyin ve veritabanı migrasyonlarını güncelleyin:
   ```bash
   dotnet restore
   dotnet ef database update
   ```
3. API projesini çalıştırın:
   ```bash
   dotnet run
   ```
   API yerel ortamda (genellikle `https://localhost:5xxx` veya `http://localhost:5xxx` üzerinde) ayağa kalkacaktır.

### Frontend'i Çalıştırma (`web-app`)
1. `web-app` dizinine gidin:
   ```bash
   cd web-app
   ```
2. `index.html` dosyasını doğrudan tarayıcınızda açın veya VS Code Live Server gibi yerel bir geliştirme sunucusu kullanarak çalıştırın.
3. Frontend kodunuzdaki (`app.js`) API temel adresinin (base URL) çalışan backend portunuzla eşleştiğinden emin olun.

"""
## 🛠️ Teknoloji Yığını

### Backend (`StoreApi`)
* **Çatı (Framework):** ASP.NET Core Web API (.NET)
* **Veritabanı & ORM:** MS SQL Server / SQLite destekli Entity Framework Core ve mikro-ORM veri erişimi için Dapper.
* **Mimari:** Repository Deseni (Repository Pattern), Entity Konfigürasyonları ve Entity Framework Migrations (`StartPoint`).

### Frontend (`web-app`)
* **Çekirdek:** Vanilla JavaScript (`app.js`)
* **Arayüz & Tasarım:** HTML5 (`index.html`, `create.html`, `update.html`, `details.html`), CSS3 (`styles.css`)

---

## 📁 Proje Yapısı

```text
FrontendIntegration/
│
├── FrontendIntegration.slnx        # Çözüm (Solution) dosyası
│
├── StoreApi/                       # ASP.NET Core Backend API
│   ├── Controllers/                # API Uç Noktaları (ProductsController, WeatherForecastController)
│   ├── Data/                       # EF Core DbContext & Entity Konfigürasyonları
│   ├── Migrations/                 # Veritabanı Migrasyonları
│   ├── Models/                     # Varlık Modelleri (Product, Category)
│   ├── Repositories/               # Veri Erişim Repoları (IProductRepository, ProductRepository)
│   ├── Properties/                 # Başlangıç ayarları
│   ├── appsettings.json            # Yapılandırma ayarları
│   └── Program.cs                  # Uygulama başlangıç noktası & DI yapılandırması
│
└── web-app/                        # Frontend İstemci Uygulaması
    ├── index.html                  # Ürün listesi & panel görünümü
    ├── create.html                 # Yeni ürün ekleme formu
    ├── update.html                 # Mevcut ürünü düzenleme formu
    ├── details.html                # Ürün detay görünümü
    ├── app.js                      # API haberleşmesi & DOM manipülasyon mantığı
    └── styles.css                  # Arayüz stilleri
```


---

## 📄 Lisans
Bu proje açık kaynaklıdır ve eğitim amaçlı kullanım için uygundur.
