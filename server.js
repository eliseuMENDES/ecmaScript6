const express = require('express');
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');

const app = express();
const PORT = 3000;

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Rota para obter dados de estudos
app.get('/api/estudos', (req, res) => {
  fs.readFile('./data/estudos.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send(err);
    res.json(JSON.parse(data));
  });
});

// Rota para obter exercícios
app.get('/api/exercicios', (req, res) => {
  fs.readFile('./data/exercicios.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send(err);
    res.json(JSON.parse(data));
  });
});

// Live reload
const watcher = chokidar.watch(['./data', './public']);
watcher.on('change', () => {
  console.log('Arquivos modificados - recarregando...');
  // Aqui você pode implementar WebSocket para atualizar o cliente
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('Monitorando alterações nos arquivos...');
});