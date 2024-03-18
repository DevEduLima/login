import React, { useState, useEffect } from 'react';
import { Card, Container, CardHeader, Button } from 'reactstrap';
import Header from 'components/Headers/Header.js';
import Table from 'components/Table/Table.js';
import CreateUserModal from '../../../components/CreateUserModal/CreateUserModal';
import LoadingIndicator from 'components/Loading/Loading';
import { isAuthenticated } from '../../../services/authenticationService'; // Importa o serviço de autenticação

// Opções personalizadas para o menu de ações
const customMenuOptions = [
  { action: 'editar', label: 'Editar Usuário' },
  { action: 'detalhes', label: 'Detalhes do Usuário' },
  // Adicione mais opções conforme necessário
];

const UserControl = () => {
  // Estado para controlar a exibição do modal de criação de usuário
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  // Estado para armazenar os dados do novo usuário
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    senha: '',
    nivelAcesso: 'opcao1',
  });
  // Estado para armazenar os usuários retornados pela API
  const [users, setUsers] = useState([]);
  // Estado para controlar o carregamento dos dados
  const [loading, setLoading] = useState(true);
  // Estado para controlar a paginação da tabela
  const [pagination, setPagination] = useState({ pageIndex: 0, rowsPerPage: 10 });

  // Efeito para buscar os usuários ao carregar o componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Verificar se o usuário está autenticado
        if (!isAuthenticated()) {
          // Se não estiver autenticado, redirecione para a página de login
          window.location.href = '/login';
          return;
        }

        // Obter o token de autenticação do localStorage
        const headers = {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        };

        // Requisição para obter os usuários da API
        const response = await fetch('http://116.202.20.228:8001/users', {
          headers,
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          // Definir os usuários no estado e indicar que o carregamento foi concluído
          setUsers(data);
          setLoading(false);
        } else {
          console.error('Dados de usuários recebidos da API não são um array:', data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Função para lidar com a mudança de página na tabela
  const handlePageChange = (newPageIndex) => {
    setPagination({ ...pagination, pageIndex: newPageIndex });
  };

  // Função para lidar com a mudança de quantidade de linhas por página na tabela
  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = Number(event.target.value);
    // Atualizar a paginação e voltar para a primeira página
    setPagination({ ...pagination, rowsPerPage: newRowsPerPage, pageIndex: 0 });
  };

  // Função para lidar com a mudança nos campos de entrada do formulário de criação de usuário
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setUserData({ ...userData, [id]: value });
  };

  // Função para lidar com o salvamento do novo usuário
  const handleSaveUser = () => {
    console.log('Salvando usuário:', userData);
    setShowCreateUserModal(false);
  };

  // Função para alternar a exibição do modal de criação de usuário
  const handleToggleModal = () => {
    setShowCreateUserModal(!showCreateUserModal);
  };

  return (
    <>
      {/* Componente de cabeçalho */}
      <Header />
      {/* Container principal */}
      <Container className="mt--7" >
        <Card className="shadow">
          {/* Modal de criação de usuário */}
          <CreateUserModal
            isOpen={showCreateUserModal}
            toggle={handleToggleModal}
            userData={userData}
            handleInputChange={handleInputChange}
            handleSaveUser={handleSaveUser}
          />

          {/* Cabeçalho do card */}
          <CardHeader>
            {/* Botão para abrir o modal de criação de usuário */}
            <div className="d-flex justify-content-between p-2 mb-3">
              <h3 className="d-flex align-items-center text-uppercase text-primary">
                Cadastro de usuários
              </h3>
              <Button
                color="primary"
                onClick={handleToggleModal}
              >
                Criar Usuário
              </Button>
            </div>

            {/* Exibir indicador de carregamento ou a tabela de usuários */}
            {loading ? (
              <LoadingIndicator />
            ) : (
              <Table
                tableData={users.map((user) => ({
                  id: user.id,
                  nome: user.name,
                  email: user.email,
                  acao: 'Ação',
                }))}
                includeActionColumn={false}
                visibleColumns={['id', 'nome', 'email', 'acao']}
                showSpecialColumns={true}
                enableRowClick={false}
                actionMenuOptions={customMenuOptions}
                pageIndex={pagination.pageIndex}
                rowsPerPage={pagination.rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            )}
          </CardHeader>
        </Card>
      </Container>
    </>
  );
};

export default UserControl;