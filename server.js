const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DATA_FILE = 'data.json';

// GET semua produk
app.get('/produk', (req, res) => {
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data);
});

// POST tambah produk
app.post('/produk', (req, res) => {
    const produk = req.body;
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    data.push(produk);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ message: 'Berhasil tambah produk', produk });
});

app.listen(PORT, () => {
    console.log(`Server running di http://localhost:${PORT}`);
});
