````markdown
# 🛒 Online Shop – Webbasierte Produkt- & Bestellverwaltung

Ein vollständiger Online-Shop mit Adminbereich, Warenkorb, Produkt-Upload inkl. Bild, Checkout-Prozess und sicherem Login.

---

## 🔧 Funktionen

- 🛍️ Benutzer können Produkte ansehen, in den Warenkorb legen und bestellen.
- 🖼️ Produkte enthalten Bilder, Beschreibungen und Preise.
- ✅ Checkout-Seite mit Zusammenfassung & Kaufabwicklung.
- 🔐 Adminbereich (passwortgeschützt, Passwort gehasht) zur Verwaltung:
  - Produkte hinzufügen, bearbeiten, löschen.
  - Kundenbestellungen einsehen.

---

## 👨‍💻 Admin-Zugang

| Bereich      | Zugangsdaten         |
|--------------|-----------------------|
| Admin-Login  | Benutzer: `admin`     |
|              | Passwort: `admin123`  |

🔐 Hinweis: Das Passwort wird beim Speichern automatisch **gehasht** – es wird nie im Klartext gespeichert!

---

## 🗂️ Technologien

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js + Express.js
- **Datenhaltung:** JSON-Dateien
- **Sonstiges:** LocalStorage, Sessions, bcrypt zur Passwortverschlüsselung

---

## 🚀 Installation & Start

### 1. Repository klonen

```bash
git clone https://github.com/Hisoka-02/Online_Shop
cd Online_Shop
````

### 2. Abhängigkeiten installieren

```bash
npm install
```

### 3. Projekt starten

```bash
node server.js
```

📍 Der Shop ist danach auf [http://localhost:3000](http://localhost:3000) erreichbar.
🔐 Admin-Login unter: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 📦 Projektstruktur

```text
📁 /public          → Clientseitige Dateien (HTML, CSS, JS, Bilder)
📁 /data            → Gespeicherte Produkte & Bestellungen (JSON)
📁 /uploads         → Bilder hochgeladener Produkte
📁 /routes          → API-Routen (Admin, Produkte, Checkout)
📄 server.js        → Express-Server
```

---

## 🛡️ Sicherheit

* Passwörter werden mit **bcrypt** gehasht.
* Kein direkter Zugriff auf Admin ohne Login.
* Daten lokal gespeichert (keine externe DB notwendig für Demo-Zwecke).

---

## 🧪 Status

🟡 Das Projekt ist funktional, wird aber noch weiterentwickelt (Admin-Bestellverwaltung, Suchfunktion, Filter, etc.).

---

## 📄 Lizenz

MIT – frei für Lern- & Demonstrationszwecke.

```

---

### ✅ Möchtest du، أن أرفق هذا النص أيضًا في مجلد `README.md` داخل مشروعك؟
أو نبدأ بـ Projekt 3؟  
قل فقط: **„README speichern“** أو **„Projekt 3 bitte“** 💙
```
