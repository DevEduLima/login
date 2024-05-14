// authentication.js

// Importa o módulo axios para fazer requisições HTTP
import axios from 'axios';

// URL da API de autenticação
const API_URL = 'https://api.protocols.smartchats.app/auth';

// Função assíncrona para realizar o login do usuário
export const login = async (email, password) => {
  try {
    // Faz uma requisição POST para a API de autenticação
    const response = await axios.post(
      API_URL,
      // Envia os dados de email e senha no formato de query string
      `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
      {
        headers: {
          // Define o cabeçalho Content-Type como application/x-www-form-urlencoded
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    // Verifica se a requisição teve sucesso (código 200)
    if (response.status === 200) {
      // Extrai os dados de acesso e usuário da resposta da API
      const { access_token: accessToken, user_id: userId, name, email, role } = response.data;

      // Verifica se todos os dados necessários foram recebidos e são válidos
      if (accessToken && userId && name && email && role && Number.isInteger(userId)) {
        // Armazena o token de acesso e outras informações do usuário no armazenamento local
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', role); // Aqui você está armazenando o papel do usuário (role) no localStorage

        // Retorna o token de acesso, o ID do usuário e o papel do usuário
        return { accessToken, userId, role };
      } else {
        // Lança um erro se os dados do usuário forem inválidos ou incompletos
        throw new Error('Dados de usuário incompletos ou inválidos recebidos do servidor.');
      }
    } else {
      // Lança um erro se a requisição não teve sucesso
      throw new Error(`Falha na autenticação. Código de resposta: ${response.status}`);
    }
  } catch (error) {
    // Trata os diferentes tipos de erro que podem ocorrer durante a autenticação
    if (error.response) {
      // Lança um erro se a resposta da API indicar um erro
      throw new Error(`Falha na autenticação. Código de resposta: ${error.response.status}, Mensagem: ${error.response.data.message || 'Sem mensagem de erro'}`);
    } else if (error.request) {
      // Lança um erro se não for possível comunicar com o servidor
      throw new Error('Falha na comunicação com o servidor');
    } else {
      // Lança um erro se houver um erro na configuração da requisição
      throw new Error('Erro na configuração da solicitação');
    }
  }
}