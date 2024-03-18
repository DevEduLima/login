// authentication.js

import axios from 'axios';

const API_URL = 'http://116.202.20.228:8001/auth';
export const login = async (email, password) => {
  try {

    const response = await axios.post(
      API_URL,
      `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    if (response.status === 200) {
      const { access_token: accessToken, user_id: userId, name, email, role } = response.data;
      if (accessToken && userId && name && email && role && Number.isInteger(userId)) {
        // Armazene o token de acesso e outras informações do usuário no armazenamento local
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', role);
        return { accessToken, userId };
      } else {
        throw new Error('Dados de usuário incompletos ou inválidos recebidos do servidor.');
      }
    } else {
      throw new Error(`Falha na autenticação. Código de resposta: ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      throw new Error(`Falha na autenticação. Código de resposta: ${error.response.status}, Mensagem: ${error.response.data.message || 'Sem mensagem de erro'}`);
    } else if (error.request) {
      throw new Error('Falha na comunicação com o servidor');
    } else {
      throw new Error('Erro na configuração da solicitação');
    }
  }
};
