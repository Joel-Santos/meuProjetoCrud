import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);

  // Função para buscar todos os usuários
  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:4000/usuarios', {
        withCredentials: true, // Enviar cookies
      });
      setUsuarios(response.data);
    } catch (error) {
      setError('Erro ao buscar usuários');
    }
  };

  // Função para criar um novo usuário
  const createUsuario = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:4000/usuarios', {
        nome,
        email,
        senha,
      }, {
        withCredentials: true, // Enviar cookies
      });
      fetchUsuarios(); // Atualiza a lista de usuários
      setNome('');
      setEmail('');
      setSenha('');
    } catch (error) {
      setError('Erro ao criar usuário');
    }
  };

  // Função para deletar um usuário
  const deleteUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/usuarios/${id}`, {
        withCredentials: true, // Enviar cookies
      });
      fetchUsuarios(); // Atualiza a lista de usuários
    } catch (error) {
      setError('Erro ao deletar usuário');
    }
  };

  // Função para atualizar um usuário
  const updateUsuario = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:4000/usuarios/${editId}`, {
        nome,
        email,
        senha,
      }, {
        withCredentials: true, // Enviar cookies
      });
      setEditId(null);
      setNome('');
      setEmail('');
      setSenha('');
      fetchUsuarios(); // Atualiza a lista de usuários
    } catch (error) {
      setError('Erro ao atualizar usuário');
    }
  };

  // Função para definir os dados no formulário ao editar
  const handleEdit = (usuario) => {
    setEditId(usuario.id);
    setNome(usuario.nome);
    setEmail(usuario.email);
    setSenha(usuario.senha);
  };

  // UseEffect para carregar os usuários na primeira renderização
  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div>
      <h2>Usuários</h2>

      {/* Formulário para criar ou editar */}
      <form onSubmit={editId ? updateUsuario : createUsuario}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">{editId ? 'Atualizar' : 'Criar'} Usuário</button>
      </form>

      {/* Tabela de usuários */}
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>
                <button onClick={() => handleEdit(usuario)}>Editar</button>
                <button onClick={() => deleteUsuario(usuario.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UserList;
