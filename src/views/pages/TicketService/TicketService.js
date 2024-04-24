import React, { useState, useEffect } from 'react';
import { Card, Container, CardHeader } from 'reactstrap';
import Header from 'components/Headers/Header.js';
import Table from 'components/Table/Table.js';
import TableColumns from 'components/Table/tableColumns.js';
import LoadingIndicator from 'components/Loading/Loading.js';
import ProtocolCounter from 'components/ProtocolCounter/ProtocolCounter.js';

import {
  fetchProtocolByEmailOperator,
  updateProtocolStatus,
} from 'services/ProtocolRequests.js';

const customActionMenuOptions = [
  { action: 'open', label: 'Abrir Protocolo' },
  { action: 'close', label: 'Fechar Protocolo' },
];

// Componente TicketService
const TicketService = () => {
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
  // Define a ordem das colunas da tabela
  const columnOrder = ['protocolo', 'status', 'nome', 'email', 'data', 'acao'];
  // Configuração das colunas da tabela
  const columnsConfig = TableColumns(false, columnOrder);

  // Efeito para buscar os protocolos ao montar o componente
  const fetchProtocolsData = async () => {
    try {
      // Obtém o email do operador do armazenamento local
      const emailOperator = localStorage.getItem('userEmail');
      // Verifica se o email do operador existe
      if (!emailOperator) {
        throw new Error(
          'Email do operador não encontrado no armazenamento local.'
        );
      }
      // Faça a chamada para a função fetchProtocolByEmailOperator
      const protocolsData = await fetchProtocolByEmailOperator(emailOperator);
      // Atualize o estado dos protocolos com os dados recebidos
      setProtocols(protocolsData);
      // Atualize o estado do total de protocolos
      setTotalProtocols(protocolsData.length);
      // Marque o carregamento como concluído
      setLoading(false);
    } catch (error) {
      // Em caso de erro, exiba uma mensagem de erro no console e marque o carregamento como concluído
      console.error('Erro ao buscar dados:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProtocolsData();
  }, []);

  // Função para lidar com o clique nos itens do menu de ação
  const handleMenuItemClick = async (action, protocolId) => {
    try {
      let newStatus = '';
      if (action === 'open') {
        newStatus = 'Aberto';
      } else if (action === 'close') {
        newStatus = 'Fechado';
      }
      if (newStatus !== '') {
        await updateProtocolStatus(protocolId, newStatus);

        // Define a mensagem de alerta
        setAlertMessage('Status atualizado com sucesso!');
        // Refetch dos protocolos após a alteração do status
        await fetchProtocolsData();
        // Atualiza a página atual da paginação para 1
        setCurrentPage(1);
        // Define um timeout para limpar a mensagem de alerta após 5 segundos
        setTimeout(() => {
          setAlertMessage('');
        }, 5000);
      }
    } catch (error) {
      console.error('Erro ao atualizar o status:', error);
    }
  };

  return (
    <>
      <Header /> {/* Renderiza o cabeçalho */}
      <Container className="mt--7" fluid>
        {/* Container fluido para envolver os elementos */}
        <Card className="shadow">
          {/* Cartão com sombra */}
          <CardHeader>
            {/* Cabeçalho do cartão */}
            <div className="d-flex justify-content-between p-2 mb-3">
              {/* Div para alinhar os itens horizontalmente */}
              <h3 className="d-flex align-items-center text-uppercase text-primary">
                {/* Título */}
                Contagem de Protocolos
              </h3>
              <ProtocolCounter totalProtocols={totalProtocols} />
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
            {loading ? ( // Condição para verificar se a página está carregando
              <LoadingIndicator /> // Se estiver carregando, exibe o indicador de carregamento
            ) : (
              <Table // Tabela para exibir os protocolos
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

export default TicketService; // Exporta o componente TicketService
