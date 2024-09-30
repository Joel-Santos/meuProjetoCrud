const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Serviço para pegar todos os usuários
exports.getAllUsuarios = async () => {
  return await prisma.usuario.findMany();
};

// Serviço para pegar um usuário pelo ID
exports.getUsuarioById = async (id) => {
  return await prisma.usuario.findUnique({ where: { id } });
};

// Serviço para criar um novo usuário
exports.createUsuario = async (data) => {
  return await prisma.usuario.create({ data });
};

// Serviço para atualizar um usuário
exports.updateUsuario = async (id, data) => {
  return await prisma.usuario.update({
    where: { id },
    data,
  });
};

// Serviço para deletar um usuário
exports.deleteUsuario = async (id) => {
  return await prisma.usuario.delete({ where: { id } });
};
