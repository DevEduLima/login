import React, { useState, useEffect, useCallback } from 'react';
import { Card, Container, CardHeader } from 'reactstrap';
import Header from 'components/Headers/Header.js';
import Table from 'components/Table/Table.js';
import TableColumns from 'components/Table/tableColumns.js';
import LoadingIndicator from 'components/Loading/Loading.js';
import ProtocolCounter from 'components/ProtocolCounter/ProtocolCounter.js';
import {
  fetchProtocolsByStatusSetor,
  fetchProtocolByEmailOperator,
  updateProtocolStatus,
} from 'services/ProtocolRequests.js';

// Função para definir as opções de menu de ação personalizadas
const customActionMenuOptions = () => {
  return [
    // Exemplo de opção de menu de ação
    // { action: 'open', label: 'Abrir Protocolo' },
    { action: 'close', label: 'Fechar Protocolo' },
  ];
};

const TicketService = () => {
  // Estado para os protocolos do tipo AT
  const [protocolsAT, setProtocolsAT] = useState([]);
  // Estado para os protocolos por E-mail
  const [protocolsByEmail, setProtocolsByEmail] = useState([]);
  // Estado de carregamento para o tipo AT
  const [loadingAT, setLoadingAT] = useState(true);
  // Estado de carregamento para os protocolos por E-mail
  const [loadingByEmail, setLoadingByEmail] = useState(true);
  // Estado para o total de protocolos do tipo AT
  const [totalProtocolsAT, setTotalProtocolsAT] = useState(0);
  // Estado para o total de protocolos por E-mail
  const [totalProtocolsByEmail, setTotalProtocolsByEmail] = useState(0);
  // Estado para a página atual do tipo AT
  const [currentPageAT, setCurrentPageAT] = useState(1);
  // Estado para a página atual dos protocolos por E-mail
  const [currentPageByEmail, setCurrentPageByEmail] = useState(1);
  // Estado para mensagens de alerta do tipo AT
  const [alertMessageAT, setAlertMessageAT] = useState('');
  // Estado para mensagens de alerta dos protocolos por E-mail
  const [alertMessageByEmail, setAlertMessageByEmail] = useState('');

  // Definição da ordem das colunas na tabela
  const columnOrder = ['protocolo', 'status', 'nome', 'email','numero', 'data', 'acao'];
  // Configuração das colunas da tabela
  const columnsConfig = TableColumns(false, columnOrder);

  // E-mail do usuário logado
  const userEmail = localStorage.getItem('userEmail');

  // Função para buscar os dados dos protocolos do tipo AT
  const fetchProtocolsByTypeAndStatus = useCallback(async () => {
    try {
      const setor = 'Atendimento';
      const status = 'Fechado';
      const protocolsDataAT = await fetchProtocolsByStatusSetor(setor, status);
      if (protocolsDataAT && protocolsDataAT.length > 0) {
        setProtocolsAT(protocolsDataAT);
        setTotalProtocolsAT(protocolsDataAT.length);
      } else {
        // Se nenhum protocolo for encontrado, limpa o estado e exibe uma mensagem de alerta
        setProtocolsAT([]);
        setTotalProtocolsAT(0);
        setAlertMessageAT(
          'Nenhum protocolo encontrado com este setor e status.'
        );
        // Definir um timeout para limpar a mensagem de alerta após 5 segundos
        setTimeout(() => {
          setAlertMessageAT('');
        }, 5000);
      }
      setLoadingAT(false);
    } catch (error) {
      console.error('Erro ao buscar dados do Setor e Status:', error);
      setLoadingAT(false);
      // Limpar o estado da tabela 1 em caso de erro 404
      if (error.response && error.response.status === 404) {
        setProtocolsAT([]);
        setTotalProtocolsAT(0);
        setAlertMessageAT(
          'Nenhum protocolo encontrado com este setor e status.'
        );
        // Definir um timeout para limpar a mensagem de alerta após 5 segundos
        setTimeout(() => {
          setAlertMessageAT('');
        }, 5000);
      }
    }
  }, []);

  // Função para buscar os dados dos protocolos por e-mail
  const fetchProtocolsByEmail = useCallback(async () => {
    try {
      const protocolsByEmail = await fetchProtocolByEmailOperator(userEmail);
      setProtocolsByEmail(protocolsByEmail);
      setTotalProtocolsByEmail(protocolsByEmail.length);
      setLoadingByEmail(false);
    } catch (error) {
      console.error('Erro ao buscar dados por e-mail:', error);
      setLoadingByEmail(false);
    }
  }, [userEmail]);

  // Efeito para buscar os dados dos protocolos ao montar o componente
  useEffect(() => {
    const fetchData = () => {
      fetchProtocolsByTypeAndStatus();
      fetchProtocolsByEmail();
    };
  
    // Chamar fetchData imediatamente ao montar o componente
    fetchData();
  
    // Definir um intervalo para chamar fetchData a cada 60 segundos
    const intervalId = setInterval(fetchData, 60000);
  
    // Limpar o intervalo quando o componente for desmontado para evitar vazamento de memória
    return () => clearInterval(intervalId);
  }, [fetchProtocolsByTypeAndStatus, fetchProtocolsByEmail]);

  // Função para lidar com cliques nos itens do menu de ação
  const handleMenuItemClick = async (action, protocolId, type) => {
    try {
      const newStatusMap = {
        // open: 'Aberto',
        close: 'Fechado',
      };
      const newStatus = newStatusMap[action];
      if (newStatus) {
        const operatorEmail = localStorage.getItem('userEmail');
        const updatedProtocol = await updateProtocolStatus(
          protocolId,
          newStatus,
          operatorEmail
        );
        const message =
          'Status atualizado com sucesso: ' + updatedProtocol.protocol_status;
        if (type === 'AT') {
          setAlertMessageAT(message);
        } else if (type === 'Email') {
          setAlertMessageByEmail(message);
        }
        // Definir um timeout para limpar a mensagem de alerta após 5 segundos
        setTimeout(() => {
          if (type === 'AT') {
            setAlertMessageAT('');
          } else if (type === 'Email') {
            setAlertMessageByEmail('');
          }
        }, 5000);

        await fetchProtocolsByEmail();
        await fetchProtocolsByTypeAndStatus();
      }
    } catch (error) {
      console.error('Erro ao atualizar o status:', error);
      const errorMessage = 'Erro: ' + error.message;
      if (type === 'AT') {
        setAlertMessageAT(errorMessage);
      } else if (type === 'Email') {
        setAlertMessageByEmail(errorMessage);
      }
      // Definir um timeout para limpar a mensagem de alerta após 5 segundos
      setTimeout(() => {
        if (type === 'AT') {
          setAlertMessageAT('');
        } else if (type === 'Email') {
          setAlertMessageByEmail('');
        }
      }, 5000);
    }
  };

  // Função para determinar a localização do alerta com base no tipo de protocolo
  const alertLocation = (email, type) => {
    return type === 'AT' ? 'AT' : 'Email';
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Card className="shadow">
          <CardHeader>
            <div className="d-flex justify-content-between p-2 mb-3">
              <h3 className="d-flex align-items-center text-uppercase text-primary">
                Protocolos do Atendimento
              </h3>
              <ProtocolCounter totalProtocols={totalProtocolsAT} />
            </div>

            {/* Renderizar mensagem de alerta para protocolos AT */}
            {alertMessageAT && alertLocation(userEmail, 'AT') === 'AT' && (
              <div
                className="alert alert-info alert-dismissible fade show text-center custom-alert"
                role="alert"
                type="info"
              >
                {alertMessageAT}
              </div>
            )}

            {/* Renderizar indicador de carregamento ou tabela de protocolos AT */}
            {loadingAT ? (
              <LoadingIndicator />
            ) : (
              <Table
                tableData={protocolsAT.map((protocol) => ({
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
                includeActionColumn={false} // Alterado para false
                enableRowClick={true}
                visibleColumns={columnOrder}
                columnsConfig={columnsConfig}
                actionMenuOptions={customActionMenuOptions()}
                currentPage={currentPageAT}
                setCurrentPage={setCurrentPageAT}
              />
            )}
          </CardHeader>
        </Card>
        <Card className="shadow mt-4">
          <CardHeader>
            <div className="d-flex justify-content-between p-2 mb-3">
              <h3 className="d-flex align-items-center text-uppercase text-primary">
                Meus Protocolos
              </h3>
              <ProtocolCounter totalProtocols={totalProtocolsByEmail} />
            </div>

            {/* Renderizar mensagem de alerta para protocolos por E-mail */}
            {alertMessageByEmail &&
              alertLocation(userEmail, 'Email') === 'Email' && (
                <div
                  className="alert alert-success alert-dismissible fade show text-center custom-alert"
                  role="alert"
                >
                  {alertMessageByEmail}
                </div>
              )}

            {/* Renderizar indicador de carregamento ou tabela de protocolos por E-mail */}
            {loadingByEmail ? (
              <LoadingIndicator />
            ) : (
              <Table
                tableData={protocolsByEmail.map((protocol) => ({
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
                includeActionColumn={true} // Alterado para true
                enableRowClick={true}
                visibleColumns={columnOrder}
                columnsConfig={columnsConfig}
                actionMenuOptions={customActionMenuOptions()}
                onMenuItemClick={(action, protocolId) =>
                  handleMenuItemClick(action, protocolId, 'Email')
                }
                currentPage={currentPageByEmail}
                setCurrentPage={setCurrentPageByEmail}
              />
            )}
          </CardHeader>
        </Card>
      </Container>
    </>
  );
};

export default TicketService;
