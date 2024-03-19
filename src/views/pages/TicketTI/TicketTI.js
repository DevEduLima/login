// TicketTI.js
import React, { useState, useEffect } from 'react';
import { Card, Container, CardHeader } from 'reactstrap';
import Header from 'components/Headers/Header.js';
import Table from 'components/Table/Table.js';
import LoadingIndicator from 'components/Loading/Loading.js';
import TableColumns from '../../../components/Table/tableColumns.js'; 
import ProtocolCounter from '../../../components/ProtocolCounter/ProtocolCounter.js';

const customActionMenuOptions = [
  { action: 'detalhes', label: 'Detalhes do Protocolo' },
  { action: 'detalhes', label: 'Detalhes do Protocolo' },
];

const TicketTI = () => {
  // Estado para armazenar os protocolos, estado de carregamento e o total de protocolos
  const [protocols, setProtocols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProtocols, setTotalProtocols] = useState('');

  // Efeito para buscar os protocolos ao montar o componente
  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        // Verificar se o usuário está autenticado
        const userModel = JSON.parse(localStorage.getItem('userModel'));
        if (!userModel || !userModel.token || !userModel.userId) {
          // Se o usuário não estiver autenticado, redireciona para a página de login
          window.location.href = '/login';
          return;
        }

        // Configurar os cabeçalhos da requisição
        const headers = {
          Authorization: `Bearer ${userModel.token}`,
        };

        // Fazer a requisição para buscar os protocolos
        const response = await fetch('http://116.202.20.228:8001/protocols', {
          headers,
        });
        const data = await response.json();

        if (Array.isArray(data)) {
          // Define os protocolos recebidos do servidor
          setProtocols(data);
          // Define o total de protocolos
          setTotalProtocols(data.length);
          // Indica que o carregamento foi concluído
          setLoading(false);
        } else {
          console.error(
            'Dados de protocolos recebidos da API não são um array:',
            data
          );
          setLoading(false);
        }
      } catch (error) {
        console.error('Erro ao buscar protocolos:', error);
        setLoading(false);
      }
    };

    fetchProtocols();
  }, []);

  // Definir a ordem das colunas na tabela
  const columnOrder = [
    'protocolo',
    'setor',
    'nome',
    'numero',
    'email',
    'data',
    'acao',
  ];
  // Configurar as colunas da tabela
  const columnsConfig = TableColumns(false, columnOrder);

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
                  numero: protocol.telefone_cliente || '',
                  email: protocol.email_cliente,
                  data: protocol.data,
                  acao: 'Ação',
                }))}
                includeActionColumn={false}
                visibleColumns={columnOrder}
                columnsConfig={columnsConfig}
                actionMenuOptions={customActionMenuOptions}
              />
            )}
          </CardHeader>
        </Card>
      </Container>
    </>
  );
};

export default TicketTI;
