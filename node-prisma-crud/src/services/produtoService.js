const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllProdutos = async () => {
  return await prisma.produto.findMany();
};

exports.getProdutoById = async (id) => {
  return await prisma.produto.findUnique({ where: { id } });
};

exports.createProduto = async (data) => {
  return await prisma.produto.create({ data });
};

exports.updateProduto = async (id, data) => {
  return await prisma.produto.update({
    where: { id },
    data,
  });
};

exports.deleteProduto = async (id) => {
  return await prisma.produto.delete({ where: { id } });
};
