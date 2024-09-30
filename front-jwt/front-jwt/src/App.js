import React, { useState, useEffect } from 'react';
import Login from './components/Login.js';
import UserList from './components/UserList.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica se o token JWT está no localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);  // Se o token existir, o usuário está autenticado
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);  // Atualiza o estado de autenticação após o login
  };

  return (
    <div className="App">
      <h1>Sistema de Autenticação e Gerenciamento de Usuários</h1>
      
      {isAuthenticated ? (
        // Se estiver autenticado, mostra o componente de CRUD
        <UserList />
      ) : (
        // Se não estiver autenticado, mostra o componente de login
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
