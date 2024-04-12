// protocolRequests.js

// Este arquivo contém funções para fazer requisições à API relacionadas a protocolos.

import axios from 'axios';
import { getToken } from './AuthenticationService';

// URL base da API
const API_URL = 'https://smartprotocols.intgov.com.br';

// Função para buscar todos os protocolos
const fetchAllProtocols = async () => {
    try {
      // Obtém o token de autenticação
      const token = getToken();
      // Configura os headers da requisição
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
  
      // Faz a requisição GET para obter todos os protocolos
      const response = await axios.get(`${API_URL}/protocols/`, { headers });
  
      return response.data;
    } catch (error) {
      // Em caso de erro, exibe uma mensagem de erro no console e lança o erro novamente
      console.error('Erro ao buscar todos os protocolos:', error.message);
      throw error;
    }
};

// Função para buscar protocolos pelo email do operador
const fetchProtocolByEmailOperator = async (emailOperator) => {
  try {
    // Obtém o token de autenticação
    const token = getToken();
    // Configura os headers da requisição
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Faz a requisição GET para obter os protocolos pelo email do operador
    const response = await axios.get(`${API_URL}/protocols/email_operador/${emailOperator}/`, { headers });

    return response.data;
  } catch (error) {
    // Em caso de erro, exibe uma mensagem de erro no console e lança o erro novamente
    console.error('Erro ao buscar protocolos por email de operador:', error.message);
    throw error;
  }
};

// Função para buscar protocolo pelo ID
const fetchProtocolById = async (protocolId) => {
  try {
    // Obtém o token de autenticação
    const token = getToken();
    // Configura os headers da requisição
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Faz a requisição GET para obter o protocolo pelo ID
    const response = await axios.get(`${API_URL}/protocol/${protocolId}/`, { headers });

    return response.data;
  } catch (error) {
    // Em caso de erro, exibe uma mensagem de erro no console e lança o erro novamente
    console.error('Erro ao buscar protocolo por ID:', error.message);
    throw error;
  }
};

// Função para buscar protocolo pelo código
const fetchProtocolByCode = async (protocolCode) => {
  try {
    // Obtém o token de autenticação
    const token = getToken();
    // Configura os headers da requisição
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Faz a requisição GET para obter o protocolo pelo código
    const response = await axios.get(`${API_URL}/protocol/${protocolCode}/`, { headers });

    return response.data;
  } catch (error) {
    // Em caso de erro, exibe uma mensagem de erro no console e lança o erro novamente
    console.error('Erro ao buscar protocolo por código:', error.message);
    throw error;
  }
};

// Função para buscar protocolos pelo tipo
const fetchProtocolsByType = async (protocolType) => {
  try {
    // Obtém o token de autenticação
    const token = getToken();
    // Configura os headers da requisição
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Faz a requisição GET para obter os protocolos pelo tipo
    const response = await axios.get(`${API_URL}/protocols/type/${protocolType}`, { headers });

    return response.data;
  } catch (error) {
    // Em caso de erro, exibe uma mensagem de erro no console e lança o erro novamente
    console.error('Erro ao buscar protocolos por tipo:', error.message);
    throw error;
  }
};

// Exporta as funções para uso em outros arquivos
export { fetchAllProtocols, fetchProtocolByEmailOperator, fetchProtocolById, fetchProtocolByCode, fetchProtocolsByType };
