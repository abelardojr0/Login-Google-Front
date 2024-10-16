import './App.css';

import { useEffect, useState } from 'react';
import axios from 'axios';

const GoogleLoginButton = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    /* Inicializa a biblioteca de login do Google */
    window.google.accounts.id.initialize({
      client_id:
        '885600406257-nj3tit0eptjk41s4n5mg8glv9tqvgflc.apps.googleusercontent.com', // Substitua pelo Client ID
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' },
    );
  }, []);

  const handleCredentialResponse = (response) => {
    const id_token = response.credential;
    console.log('Token de ID do Google:', id_token);

    // Enviar o token para o back-end para validação
    axios
      .post('http://localhost:5000/auth/google', { token: id_token })
      .then((res) => {
        console.log('Login bem-sucedido:', res.data);
        setUser(res.data.user);
        // Armazenar o token JWT ou qualquer resposta do backend para a sessão do usuário
      })
      .catch((err) => console.error('Erro ao fazer login:', err));
  };

  return (
    <div>
      <h1>Conexão Google</h1>
      <div id="signInDiv">Teste</div>
      {user && (
        <div>
          <h2>Usuário: {user.name}</h2>
          <p>Email: {user.email}</p>
          <img src={user.picture} alt="Foto do perfil" />
        </div>
      )}
    </div>
  );
};

export default GoogleLoginButton;
