const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const PORT = 3000;

// --- Pfade ---
const ordersFile = path.join(__dirname, 'orders.json');
const usersFile = path.join(__dirname, 'users.json');

// --- Middleware ---
app.use(express.json());
app.use(express.static('public'));

app.use(session({
  secret: 'dein_geheimes_sitzungsgeheimnis_123',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // für HTTPS: true setzen
}));

// --- Hilfsfunktionen ---

function loadOrders() {
  if (!fs.existsSync(ordersFile)) return [];
  const data = fs.readFileSync(ordersFile, 'utf8');
  return JSON.parse(data || '[]');
}

function saveOrders(orders) {
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
}

function loadUsers() {
  if (!fs.existsSync(usersFile)) return [];
  const data = fs.readFileSync(usersFile, 'utf8');
  return JSON.parse(data || '[]');
}

function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

async function createAdminUser() {
  const users = loadUsers();
  if (users.length === 0) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    users.push({ id: 1, username: 'admin', passwordHash: hashedPassword });
    saveUsers(users);
    console.log('✅ Standard Admin User erstellt: admin / admin123');
  }
}

// --- Auth Middleware ---
function checkAuth(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: 'Nicht autorisiert, bitte einloggen.' });
  }
}

// --- Routen ---

// Admin Login
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Benutzername und Passwort sind erforderlich.' });
  }

  const users = loadUsers();
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ error: 'Ungültiger Benutzername oder Passwort.' });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(401).json({ error: 'Ungültiger Benutzername oder Passwort.' });
  }

  req.session.userId = user.id;
  req.session.username = user.username;
  res.json({ message: 'Erfolgreich eingeloggt.' });
});

// Admin Logout
app.post('/api/admin/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Logout fehlgeschlagen.' });
    }
    res.json({ message: 'Erfolgreich ausgeloggt.' });
  });
});

// Bestellung aufgeben (öffentlich)
app.post('/api/orders', (req, res) => {
  const order = req.body;

  if (
    !order.firstname ||
    !order.lastname ||
    !order.street ||
    !order.housenumber ||
    !order.postalcode ||
    !order.city ||
    !order.phone ||
    !order.email ||
    !order.cart ||
    !order.payment
  ) {
    return res.status(400).json({ error: 'Bitte alle Pflichtfelder ausfüllen.' });
  }

  const orders = loadOrders();
  order.id = orders.length ? orders[orders.length - 1].id + 1 : 1;
  order.status = 'neu';
  order.date = new Date().toISOString();

  orders.push(order);
  saveOrders(orders);

  res.status(201).json({ message: 'Bestellung gespeichert', id: order.id });
});

// Nur für eingeloggte Admins: Bestellungen anzeigen
app.get('/api/orders', checkAuth, (req, res) => {
  const orders = loadOrders();
  res.json(orders);
});

// Admin-Frontend
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// --- Server starten ---
createAdminUser().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
  });
});
