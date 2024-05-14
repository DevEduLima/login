import axios from 'axios';
import { getToken } from './authenticationService'; // Importa a função getToken do arquivo authUtils.js

const API_URL = 'https://api.protocols.smartchats.app';

// Função para fazer a requisição de criação de usuário
const createUser = async (userData) => {
  try {
    const token = getToken(); // Obtém o token de acesso

    // Configura os headers para incluir o token de acesso na requisição
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Faz uma requisição POST com os dados do usuário
    const response = await axios.post(`${API_URL}/user/`, userData, { headers });

    // Retorna os dados da resposta da requisição
    return response.data;
  } catch (error) {
    // Lida com erros
    console.error('Erro ao criar usuário:', error.message);
    throw error; // Lança o erro para que ele possa ser tratado no componente UserControl
  }
};

// Função para buscar dados da API
const fetchData = async (route) => {
  try {
    const token = getToken(); // Obtém o token de acesso

    // Configura os headers para incluir o token de acesso na requisição
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Faz uma requisição usando o token de acesso e a rota especificada
    const response = await axios.get(`${API_URL}/${route}/`, { headers });

    // Retorna os dados da resposta da requisição
    return response.data;
  } catch (error) {
    // Lida com erros
    console.error('Erro ao fazer a requisição:', error.message);
    throw error; // Lança o erro para que ele possa ser tratado no componente UserControl
  }
};

// Função para fazer a requisição de atualização de usuário
const updateUser = async (userId, userData) => {
  try {
    const token = getToken(); // Obtém o token de acesso

    // Configura os headers para incluir o token de acesso na requisição
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Faz uma requisição PUT com os dados do usuário e o identificador único na URL
    const response = await axios.put(`${API_URL}/user/${userId}`, userData, { headers });

    // Retorna os dados da resposta da requisição
    return response.data;
  } catch (error) {
    // Lida com erros
    console.error('Erro ao atualizar usuário:', error.message);
    throw error; // Lança o erro para que ele possa ser tratado no componente UserControl
  }
};

export { fetchData, createUser, updateUser };
