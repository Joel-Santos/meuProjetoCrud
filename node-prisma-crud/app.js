const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const produtoRoutes = require('./src/routes/produtoRoutes');  // Importando as novas rotas
const authRoute = require('./src/routes/authRoutes');

require('dotenv').config();

app.use(express.json());


// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend
  credentials: true, // Allow cookies to be sent
}));

app.use(cookieParser());
// Rotas para usuários e produtos
app.use('/usuarios', usuarioRoutes);
app.use('/produtos', produtoRoutes);  // Usando as rotas de produtos
app.use(authRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
