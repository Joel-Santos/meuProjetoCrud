const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Chave secreta para assinar os tokens (pode vir do arquivo .env)
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Função de login
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verifica se o usuário existe
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verifica se a senha está correta
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, {
      expiresIn: '1h',  // Token expira em 1 hora
    });

    // Retorna o token para o cliente
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao realizar login', error });
  }
};
