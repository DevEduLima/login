// UserModel.js

// Esta classe representa um modelo de usuário com propriedades como token, ID de usuário, nome, email e função
class UserModel {
  constructor(token, userId, name, email, role) {
    // Inicializa as propriedades do usuário
    this.token = token; // Token de autenticação do usuário
    this.userId = userId; // ID do usuário
    this.name = name; // Nome do usuário
    this.email = email; // Email do usuário
    this.role = role; // Função do usuário
  }

  // Método para obter os cabeçalhos para autenticação
  getHeaders() {
    return {
      Authorization: `Bearer ${this.token}`, // Retorna os cabeçalhos de autorização com o token
    };
  }

  // Método para obter o token de autenticação do usuário
  getToken() {
    return this.token; // Retorna o token de autenticação do usuário
  }

  // Método para obter o ID de usuário
  getUserId() {
    return this.userId; // Retorna o ID de usuário
  }
}

export default UserModel; // Exporta a classe UserModel para uso em outros arquivos