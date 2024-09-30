const express = require('express');
const app = express();
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const produtoRoutes = require('./src/routes/produtoRoutes');  // Importando as novas rotas
require('dotenv').config();

app.use(express.json());

// Rotas para usuários e produtos
app.use('/usuarios', usuarioRoutes);
app.use('/produtos', produtoRoutes);  // Usando as rotas de produtos

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
