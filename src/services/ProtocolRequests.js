// protocolRequests.js

// Este arquivo contém funções para fazer requisições à API relacionadas a protocolos.

import axios from 'axios';
import { getToken } from './authenticationService';

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
      'Content-Type': 'application/json',
    };

    // Faz a requisição GET para obter todos os protocolos
    const response = await axios.get(`${API_URL}/protocols/?limit=2000`, {
      headers,
    });
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
      'Content-Type': 'application/json',
    };

    // Faz a requisição GET para obter os protocolos pelo email do operador
    const response = await axios.get(
      `${API_URL}/protocols/email_operador/${emailOperator}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    // Em caso de erro, exibe uma mensagem de erro no console e lança o erro novamente
    console.error(
      'Erro ao buscar protocolos por email de operador:',
      error.message
    );
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
      'Content-Type': 'application/json',
    };

    // Faz a requisição GET para obter o protocolo pelo ID
    const response = await axios.get(`${API_URL}/protocol/${protocolId}/`, {
      headers,
    });

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
      'Content-Type': 'application/json',
    };

    // Faz a requisição GET para obter o protocolo pelo código
    const response = await axios.get(`${API_URL}/protocol/${protocolCode}/`, {
      headers,
    });

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
      'Content-Type': 'application/json',
    };

    // Faz a requisição GET para obter os protocolos pelo tipo
    const response = await axios.get(
      `${API_URL}/protocols/type/${protocolType}`,
      { headers }
    );

    return response.data;
  } catch (error) {
    // Em caso de erro, exibe uma mensagem de erro no console e lança o erro novamente
    console.error('Erro ao buscar protocolos por tipo:', error.message);
    throw error;
  }
};

// Função para atualizar o status do protocolo
const updateProtocolStatus = async (protocolId, newStatus, operatorEmail) => {
  try {
    // Primeiro, faz a requisição GET para obter os detalhes do protocolo

    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const responseGet = await axios.get(`${API_URL}/protocol/${protocolId}`, {
      headers,
    });

    const currentStatus = responseGet.data.protocol_status;
    const currentOperator = responseGet.data.email_operador;

    // Verifica se o status atual é diferente do novo status desejado
    if (currentStatus !== newStatus) {
      // Se o status for diferente, prossegue com a atualização do status
      const responsePut = await axios.put(
        `${API_URL}/protocol/${protocolId}`,
        {
          protocol_status: newStatus,
          email_operador: operatorEmail,
        },
        { headers }
      );
      return responsePut.data; // Retorna a resposta da requisição PUT
    } else {
      // Se o status atual for igual ao novo status, lança um erro indicando que não é possível atualizar o status
      throw new Error(
        `O protocolo já possui o status desejado: ${currentStatus}. Atualizado por: ${currentOperator}`
      );
    }
  } catch (error) {
    console.error('Erro ao atualizar o status do protocolo:', error);
    throw error;
  }
};

// Exporta as funções para uso em outros arquivos
export {
  fetchAllProtocols,
  fetchProtocolByEmailOperator,
  fetchProtocolById,
  fetchProtocolByCode,
  fetchProtocolsByType,
  updateProtocolStatus,
};
