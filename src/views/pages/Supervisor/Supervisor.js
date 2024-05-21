import React, { useState, useEffect, useCallback } from 'react';
import { Card, Container, CardHeader } from 'reactstrap';
import Header from 'components/Headers/Header.js';
import Table from 'components/Table/Table.js';
import TableColumns from 'components/Table/tableColumns.js';
import LoadingIndicator from 'components/Loading/Loading.js';
import ProtocolCounter from 'components/ProtocolCounter/ProtocolCounter.js';
import {
  fetchProtocolsByType,
  updateProtocolStatus,
} from 'services/ProtocolRequests.js';

// Opções de menu para ações customizadas na tabela
const customActionMenuOptions = [
  { action: 'open', label: 'Abrir Protocolo' },
  { action: 'close', label: 'Fechar Protocolo' },
];

const Supervisor = () => {
  // Definindo estados para protocolos, carregamento, total de protocolos, mensagem de alerta e página atual
  const [protocolsAT, setProtocolsAT] = useState([]);
  const [protocolsCB, setProtocolsCB] = useState([]);
  const [loadingAT, setLoadingAT] = useState(true);
  const [loadingCB, setLoadingCB] = useState(true);
  const [totalProtocolsAT, setTotalProtocolsAT] = useState(0);
  const [totalProtocolsCB, setTotalProtocolsCB] = useState(0);
  const [alertMessage, setAlertMessage] = useState('');
  const [currentPageAT, setCurrentPageAT] = useState(1);
  const [currentPageCB, setCurrentPageCB] = useState(1);

  // Ordem das colunas na tabela
  const columnOrder = [
    'protocolo',
    'status',
    'nome',
    'email',
    'numero',
    'data',
    'tipo',
    'acao',
  ];
  
  // Configurações das colunas da tabela
  const columnsConfig = TableColumns(false, columnOrder);

  // Função para buscar protocolos do tipo AT
  const fetchProtocolsDataAT = useCallback(async () => {
    try {
      const protocolsData = await fetchProtocolsByType('AT');
      setProtocolsAT(protocolsData);
      setTotalProtocolsAT(protocolsData.length);
      setLoadingAT(false);
    } catch (error) {
      console.error('Erro ao buscar protocolos AT:', error);
      setLoadingAT(false);
    }
  }, []);

  // Função para buscar protocolos do tipo CB
  const fetchProtocolsDataCB = useCallback(async () => {
    try {
      const protocolsData = await fetchProtocolsByType('CB');
      setProtocolsCB(protocolsData);
      setTotalProtocolsCB(protocolsData.length);
      setLoadingCB(false);
    } catch (error) {
      console.error('Erro ao buscar protocolos CB:', error);
      setLoadingCB(false);
    }
  }, []);

  // useEffect para buscar os dados quando o componente é montado e a cada 30 segundos
  useEffect(() => {
    const fetchData = async () => {
      await fetchProtocolsDataAT();
      await fetchProtocolsDataCB();
    };

    fetchData();

    const intervalId = setInterval(fetchData, 30000);

    return () => clearInterval(intervalId);
  }, [fetchProtocolsDataAT, fetchProtocolsDataCB]);

  // Função para lidar com cliques no menu de ação
  const handleMenuItemClick = async (action, protocolId, type) => {
    try {
      let newStatus = '';
      if (action === 'open') {
        newStatus = 'Aberto';
      } else if (action === 'close') {
        newStatus = 'Fechado';
      }
      if (newStatus !== '') {
        await updateProtocolStatus(protocolId, newStatus);
        setAlertMessage('Status atualizado com sucesso!');
        if (type === 'AT') {
          await fetchProtocolsDataAT();
        } else {
          await fetchProtocolsDataCB();
        }
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
      <Header />
      <Container className="mt--7" fluid>
        <Card className="shadow-lg">
          <CardHeader>
            <div className="d-flex justify-content-between p-2 mb-3">
              <h3 className="d-flex align-items-center text-uppercase text-primary mr-2">
                Protocolos Atendimento
              </h3>
              <ProtocolCounter totalProtocols={totalProtocolsAT} />
            </div>
            {alertMessage && (
              <div
                className="alert alert-success alert-dismissible fade show text-center"
                role="alert"
              >
                {alertMessage}
              </div>
            )}
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
                  tipo: protocol.type_protocols,
                  acao: 'Ação',
                }))}
                includeActionColumn={true}
                enableRowClick={true}
                visibleColumns={columnOrder}
                columnsConfig={columnsConfig}
                actionMenuOptions={customActionMenuOptions}
                onMenuItemClick={(action, protocolId) =>
                  handleMenuItemClick(action, protocolId, 'AT')
                }
                currentPage={currentPageAT}
                setCurrentPage={setCurrentPageAT}
              />
            )}
          </CardHeader>
        </Card>
        <Card className="shadow mt-4">
          <CardHeader>
            <div className="d-flex justify-content-between p-2 mb-3">
              <h3 className="d-flex align-items-center text-uppercase text-primary mr-2">
                Protocolos Cobrança
              </h3>
              <ProtocolCounter totalProtocols={totalProtocolsCB} />
            </div>
            {alertMessage && (
              <div
                className="alert alert-success alert-dismissible fade show text-center"
                role="alert"
              >
                {alertMessage}
              </div>
            )}
            {loadingCB ? (
              <LoadingIndicator />
            ) : (
              <Table
                tableData={protocolsCB.map((protocol) => ({
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
                  tipo: protocol.type_protocols,
                  acao: 'Ação',
                }))}
                includeActionColumn={true}
                enableRowClick={true}
                visibleColumns={columnOrder}
                columnsConfig={columnsConfig}
                actionMenuOptions={customActionMenuOptions}
                onMenuItemClick={(action, protocolId) =>
                  handleMenuItemClick(action, protocolId, 'CB')
                }
                currentPage={currentPageCB}
                setCurrentPage={setCurrentPageCB}
              />
            )}
          </CardHeader>
        </Card>
      </Container>
    </>
  );
};

export default Supervisor;
