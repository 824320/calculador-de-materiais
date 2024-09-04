const express = require('express');
const app = express();

app.use(express.static('html'));
app.use(express.static('css'));
app.use(express.static('javascript')); // Adicione essa linha para servir arquivos estáticos da pasta javascript

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
});

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});