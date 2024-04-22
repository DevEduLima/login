import React, { createContext, useContext, useState } from 'react';
import UserModel from 'services/UserModel'; // Importe o UserModel

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userModel, setUserModel] = useState(null);

  // Função para definir o modelo de usuário
  const setUser = (userData) => {
    // Verifica se userData contém todos os campos necessários
    if (
      userData.token &&
      userData.userId &&
      userData.name &&
      userData.email &&
      userData.role
    ) {
      // Cria uma nova instância de UserModel com os dados fornecidos
      const newUserModel = new UserModel(
        userData.token,
        userData.userId,
        userData.name,
        userData.email,
        userData.role
      );
      setUserModel(newUserModel);
    } else {
      console.error('Dados incompletos do usuário:', userData);
    }
  };

  return (
    <AuthContext.Provider value={{ userModel, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
