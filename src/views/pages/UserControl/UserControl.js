// UserControl.js

import React, { useState, useEffect } from 'react';
import { Card, Container, CardHeader, Button } from 'reactstrap';
import Header from 'components/Headers/Header.js';
import Table from 'components/Table/Table.js';
import UserModal from '../../../components/UserModal/UserModal.js';
import LoadingIndicator from 'components/Loading/Loading.js';
import { isAuthenticated } from '../../../services/authenticationService.js';
import { fetchData } from '../../../services/Requests.js';

// Opções personalizadas para o menu de ação
const customMenuOptions = [
  { action: 'editUser', label: 'Editar Usuário' },
];

const UserControl = () => {
  // Estado para controlar a exibição do modal de usuário
  const [showUserModal, setShowUserModal] = useState(false);
  // Estado para armazenar os dados do usuário selecionado no modal
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    senha: '',
    nivelAcesso: '',
  });
  // Estado para armazenar os usuários recuperados do servidor
  const [users, setUsers] = useState([]);
  // Estado para controlar o carregamento dos dados
  const [loading, setLoading] = useState(true);
  // Estado para indicar se o modal está no modo de edição
  const [isEditMode, setIsEditMode] = useState(false);

  // Função para buscar os usuários do servidor
  const fetchUsers = async () => {
    try {
      // Verifica se o usuário está autenticado
      if (!isAuthenticated()) {
        // Redireciona para a página de login se não estiver autenticado
        window.location.href = '/login';
        return;
      }

      // Busca os usuários do servidor
      const usersData = await fetchData('users');
      // Atualiza o estado dos usuários
      setUsers(usersData);
      // Define o carregamento como concluído
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error.message);
      // Define o carregamento como concluído mesmo em caso de erro
      setLoading(false);
    }
  };

  // Efeito para buscar os usuários ao montar o componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Função para atualizar o estado dos inputs do modal de usuário
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setUserData({ ...userData, [id]: value });
  };

  // Função para abrir o modal de edição de usuário
  const handleToggleEditModal = (userId) => {
    // Encontra o usuário selecionado
    const selected = users.find((user) => user.id === userId);
    // Define os dados do usuário no estado
    setUserData(selected);
    // Define o modo de edição como verdadeiro
    setIsEditMode(true);
    // Abre o modal
    setShowUserModal(true);
  };

  // Função para abrir o modal de criação de usuário
  const handleCreateUserModal = () => {
    // Limpa os dados do usuário no estado
    setUserData({
      name: '',
      email: '',
      senha: '',
      nivelAcesso: '',
    });
    // Define o modo de edição como falso
    setIsEditMode(false);
    // Abre o modal
    setShowUserModal(true);
  };

  return (
    <>
      <Header /> {/* Renderiza o cabeçalho */}
      <Container className="mt--7"> {/* Container para envolver os elementos */}
        <Card className="shadow"> {/* Cartão com sombra */}
          <UserModal
            isOpen={showUserModal} // Propriedade para controlar a exibição do modal
            toggle={() => setShowUserModal(!showUserModal)} // Função para alternar a exibição do modal
            userData={userData} // Dados do usuário a serem exibidos no modal
            handleInputChange={handleInputChange} // Função para lidar com a mudança nos inputs do modal
            handleCancel={() => setShowUserModal(false)} // Função para lidar com o cancelamento do modal
            isEditMode={isEditMode} // Indica se o modal está no modo de edição
            userId={userData.id} // ID do usuário a ser editado
            setLoading={setLoading} // Função para atualizar o estado de carregamento
            fetchUsers={fetchUsers} // Função para buscar os usuários
          />
          <CardHeader> {/* Cabeçalho do cartão */}
            <div className="d-flex justify-content-between p-2 mb-3"> {/* Div para alinhar os itens horizontalmente */}
              <h3 className="d-flex align-items-center text-uppercase text-primary"> {/* Título */}
                Cadastro de usuários
              </h3>
              <Button color="primary" onClick={handleCreateUserModal}> {/* Botão para criar usuário */}
                Criar Usuário
              </Button>
            </div>
            {loading ? ( // Condição para renderizar o indicador de carregamento
              <LoadingIndicator />
            ) : (
              <Table // Tabela para exibir os usuários
                tableData={users.map((user) => ({ // Mapeia os usuários para os dados da tabela
                  id: user.id,
                  nome: user.name,
                  email: user.email,
                  acao: 'Ação',
                })).sort((a, b) => a.id - b.id)} // Ordena os dados pelo ID do usuário
                includeActionColumn={true} // Inclui a coluna de ação
                visibleColumns={['id', 'nome', 'email', 'acao']} // Colunas visíveis
                showSpecialColumns={true} // Exibe as colunas especiais
                enableRowClick={false} // Desabilita o clique nas linhas da tabela
                actionMenuOptions={customMenuOptions} // Opções do menu de ação
                onMenuItemClick={(action, userId) => { // Função para lidar com o clique nas opções do menu de ação
                  if (action === 'editUser') { // Se a ação for editar usuário
                    handleToggleEditModal(userId); // Abre o modal de edição
                  }
                }}
              />
            )}
          </CardHeader>
        </Card>
      </Container>
    </>
  );
};

export default UserControl; // Exporta o componente UserControl
