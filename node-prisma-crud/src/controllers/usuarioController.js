const usuarioService = require('../services/usuarioService');
const bcrypt = require('bcryptjs');

// Método para pegar todos os usuários
exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
};

// Método para pegar um usuário por ID
exports.getUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await usuarioService.getUsuarioById(parseInt(id));
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
};

// Método para criar um novo usuário
exports.createUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const newUsuario = await usuarioService.createUsuario({ nome, email, senha });
    res.status(201).json(newUsuario);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};

// Método para atualizar um usuário existente
exports.updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  try {
    const updatedUsuario = await usuarioService.updateUsuario(parseInt(id), { nome, email, senha });
    if (!updatedUsuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(updatedUsuario);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
};

// Método para deletar um usuário
exports.deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUsuario = await usuarioService.deleteUsuario(parseInt(id));
    if (!deletedUsuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário' });
  }
};

exports.createUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Criptografa a senha antes de salvar no banco
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const newUsuario = await usuarioService.createUsuario({
      nome,
      email,
      senha: senhaCriptografada,  // Salva a senha criptografada
    });

    res.status(201).json(newUsuario);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};

