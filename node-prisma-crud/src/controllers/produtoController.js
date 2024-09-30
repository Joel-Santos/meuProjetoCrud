const produtoService = require('../services/produtoService');

exports.getAllProdutos = async (req, res) => {
  try {
    const produtos = await produtoService.getAllProdutos();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
};

exports.getProdutoById = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await produtoService.getProdutoById(parseInt(id));
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(produto);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produto' });
  }
};

exports.createProduto = async (req, res) => {
  const { nome, descricao, preco, estoque } = req.body;
  try {
    const newProduto = await produtoService.createProduto({ nome, descricao, preco, estoque });
    res.status(201).json(newProduto);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar produto' });
  }
};

exports.updateProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, estoque } = req.body;
  try {
    const updatedProduto = await produtoService.updateProduto(parseInt(id), { nome, descricao, preco, estoque });
    if (!updatedProduto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(updatedProduto);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto' });
  }
};

exports.deleteProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduto = await produtoService.deleteProduto(parseInt(id));
    if (!deletedProduto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar produto' });
  }
};
