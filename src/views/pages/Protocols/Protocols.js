import React, { useState, useEffect } from 'react';
import { Card, Container, CardHeader } from 'reactstrap';
import Header from 'components/Headers/Header.js';
import Table from 'components/Table/Table.js';
import LoadingIndicator from 'components/Loading/Loading.js';
import TableColumns from 'components/Table/tableColumns.js';
import ProtocolCounter from 'components/ProtocolCounter/ProtocolCounter.js';
import {
  fetchAllProtocols,
  updateProtocolStatus,
} from 'services/ProtocolRequests.js';

const customActionMenuOptions = [
  { action: 'open', label: 'Abrir Protocolo' },
  { action: 'close', label: 'Fechar Protocolo' },
];

const Protocols = () => {
  // Estados para os dados dos protocolos
  const [protocols, setProtocols] = useState([]);

  // Estado para indicar se os protocolos estão sendo carregados
  const [loading, setLoading] = useState(true);

  // Estado para o total de protocolos
  const [totalProtocols, setTotalProtocols] = useState(0);

  // Estado para a mensagem de alerta
  const [alertMessage, setAlertMessage] = useState('');

  // Estado para controlar a página atual da paginação
  const [currentPage, setCurrentPage] = useState(1);

  // Definir a exibição das colunas na tabela
  const columnOrder = [
    'protocolo',
    'status',
    'nome',
    'email',
    'numero',
    'data',
    'acao',
    'atendente',
  ];

  // Configurar as colunas da tabela

  const columnsConfig = TableColumns(false, columnOrder);
  // Função para buscar os protocolos

  // Efeito para buscar os protocolos ao montar o componente
  const fetchProtocolsData = async () => {
    try {
      const protocolsData = await fetchAllProtocols();
      setProtocols(protocolsData);
      setTotalProtocols(protocolsData.length);
      setLoading(false);
      // Extrai a mensagem da resposta da requisição
      const message = protocolsData.message; // Supondo que a mensagem esteja na propriedade 'message'
      setAlertMessage(message); // Define a mensagem de alerta com base na resposta
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setLoading(false);
      setAlertMessage(
        'Erro ao buscar dados dos protocolos. Por favor, tente novamente mais tarde.'
      );
    }
  };

  // Efeito para carregar os protocolos ao montar o componente
  useEffect(() => {
    const fetchProtocolsData = async () => {
      try {
        const protocolsData = await fetchAllProtocols();
        setProtocols(protocolsData);
        setTotalProtocols(protocolsData.length);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      }
    };
  
    // Carrega os protocolos ao montar o componente
    fetchProtocolsData();
  
    // Define um intervalo para refetch a cada 60 segundos
    const intervalId = setInterval(fetchProtocolsData, 60000);
  
    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);
  
  // Função para lidar com o clique nos itens do menu de ação
  const handleMenuItemClick = async (action, protocolId) => {
    try {
      let newStatus = '';
      const operatorEmail = localStorage.getItem('userEmail');
      if (action === 'open') {
        newStatus = 'Aberto';
      } else if (action === 'close') {
        newStatus = 'Fechado';
      }
      if (newStatus !== '') {
        const updatedProtocol = await updateProtocolStatus(
          protocolId,
          newStatus,
          operatorEmail
        );

        // Define a mensagem de alerta
        setAlertMessage(
          'Status atualizado com sucesso: ' + updatedProtocol.protocol_status
        );

        // Atualiza a página atual da paginação para 1
        setCurrentPage(1);

        // Define um timeout para limpar a mensagem de alerta após 5 segundos
        setTimeout(() => {
          setAlertMessage('');
        }, 5000);
      }
    } catch (error) {
      console.error('Erro ao atualizar o status:', error);
      // Define a mensagem de erro
      setAlertMessage('Erro: ' + error.message);
      setTimeout(() => {
        setAlertMessage('');
      }, 5000);
    } finally {
      // Refetch dos protocolos após a tentativa de atualização do status, mesmo se não for bem-sucedida
      await fetchProtocolsData();
    }
  };

  // Renderizar o componente de TicketTI
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Card className="shadow-lg">
          <CardHeader>
            <div className="d-flex justify-content-between p-2 mb-3">
              <h3 className="d-flex align-items-center text-uppercase text-primary">
                Contagem de Protocolos
              </h3>
              <ProtocolCounter totalProtocols={totalProtocols} />
              {/* Aqui é onde você insere o contador de protocolos */}
            </div>
            {/* Renderiza a mensagem de alerta se houver */}
            {alertMessage && (
              <div
                className="alert alert-success alert-dismissible fade show text-center"
                role="alert"
              >
                {alertMessage}
              </div>
            )}

            {loading ? (
              <LoadingIndicator />
            ) : (
              // Renderiza a tabela com os protocolos, passando os dados e configurações necessários
              <Table
                tableData={protocols.map((protocol) => ({
                  protocolo: protocol.cod_protocolo,
                  setor: protocol.setor,
                  status: protocol.protocol_status,
                  atendimento: protocol.type_atendimento,
                  user: protocol.obs_user,
                  sistema: protocol.obs_sistema,
                  nome: protocol.nome_cliente,
                  numero: protocol.telefone_cliente,
                  email: protocol.email_cliente,
                  data: protocol.data,
                  hora_start: protocol.hora_start,
                  cpfCnpj: protocol.cpf_cnpj,
                  fantasia: protocol.nome_fantasia,
                  end: protocol.hora_end,
                  conversation: protocol.id_conversation,
                  id_user: protocol.id_operador,
                  email_operador: protocol.email_operador,
                  cod_protocolo: protocol.cod_protocolo,
                  id: protocol.id,
                  acao: 'Ação',
                }))}
                includeActionColumn={true}
                enableRowClick={true}
                visibleColumns={columnOrder}
                columnsConfig={columnsConfig}
                actionMenuOptions={customActionMenuOptions}
                onMenuItemClick={handleMenuItemClick}
                currentPage={currentPage} // Passa o estado da página atual da paginação
                setCurrentPage={setCurrentPage}
              />
            )}
          </CardHeader>
        </Card>
      </Container>
    </>
  );
};

export default Protocols;
