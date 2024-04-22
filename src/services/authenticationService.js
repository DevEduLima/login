// authenticationService.js

// Este arquivo contém funções para lidar com a autenticação do usuário.

// Função para obter o token de acesso do localStorage
const getToken = () => {
  const token = localStorage.getItem('accessToken'); // Obtém o token de acesso do localStorage

  if (!token) { // Verifica se o token não está presente
    throw new Error('Token de acesso não encontrado.'); // Lança um erro indicando que o token não foi encontrado
  }
  return token; // Retorna o token de acesso
};

// Função para verificar se o usuário está autenticado
const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken'); // Obtém o token de acesso do localStorage
  const userId = localStorage.getItem('userId'); // Obtém o ID do usuário do localStorage

  return !!token && !!userId ; // Retorna verdadeiro se tanto o token quanto o ID do usuário estiverem presentes
};

// Exporta as funções para uso em outros arquivos
export { getToken, isAuthenticated };
