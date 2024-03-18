// authenticationService.js

const getToken = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Token de acesso não encontrado.');
    }
    return token;
  };
  
  const isAuthenticated = () => {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    return !!token && !!userId;
  };
  
  export { getToken, isAuthenticated };
  