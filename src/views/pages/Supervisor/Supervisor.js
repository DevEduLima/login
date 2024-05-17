import React, { useState, useEffect } from 'react';
import { Card, Container, CardHeader } from 'reactstrap';
// import Header from 'components/Headers/Header.js';
import Table from 'components/Table/Table.js';
import TableColumns from 'components/Table/tableColumns.js';
import LoadingIndicator from 'components/Loading/Loading.js';
import ProtocolCounter from 'components/ProtocolCounter/ProtocolCounter.js';
import {
  fetchAllProtocols,
  updateProtocolStatus,
} from 'services/ProtocolRequests.js';

const customActionMenuOptions = [
  { action: 'open', label: 'Abrir Protocolo' },
  { action: 'close', label: 'Fechar Protocolo' },
];

const Supervisor = () => {
  const [protocols, setProtocols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProtocols, setTotalProtocols] = useState(0);
  const [alertMessage, setAlertMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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
  const columnsConfig = TableColumns(false, columnOrder);

  const fetchProtocolsData = async () => {
    try {
      const protocolsData = await fetchAllProtocols();
      setProtocols(protocolsData);
      setTotalProtocols(protocolsData.length);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar protocolos:', error);
      setLoading(false);
    }
  };

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
        setAlertMessage('Status atualizado com sucesso!');
        await fetchProtocolsData();
        setCurrentPage(1);
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
      {/* <Header /> */}
      <Container className="mt-4" fluid>
        <Card className="shadow-lg">
          <CardHeader>
            <div className="d-flex justify-content-between p-2 mb-3">
              <h3 className="d-flex align-items-center text-uppercase text-primary">
                Protocolos
              </h3>
              <ProtocolCounter totalProtocols={totalProtocols} />
            </div>
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
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </CardHeader>
        </Card>
      </Container>
    </>
  );
};

export default Supervisor;
