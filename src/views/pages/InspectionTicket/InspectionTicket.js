// InspectionTicket.js

import React, { useState, useEffect } from 'react';
import { Card, Container, CardHeader } from 'reactstrap';
import Header from 'components/Headers/Header.js';
import Table from 'components/Table/Table.js';
import TableColumns from 'components/Table/tableColumns.js';
import ProtocolCounter from 'components/ProtocolCounter/ProtocolCounter.js';
import LoadingIndicator from 'components/Loading/Loading.js';

const InspectionTicket = () => {
  const [protocols, setProtocols] = useState([]);
  const [loading, setLoading] = useState(true); // Adicionando o estado de loading
  const [totalProtocols, setTotalProtocols] = useState(0); // Estado para armazenar o total de protocolos

  const columnOrder = [
    'protocolo',
    'setor',
    'status',
    'nome',
    'numero',
    'data',
    'acao',
  ];
  const columnsConfig = TableColumns(false, columnOrder);

  const menuOptions = [
    { action: 'editar', label: 'Editar Ticket' },
    { action: 'encaminhar', label: 'Encaminhar Ticket' },
    // Adicione mais opções conforme necessário
  ];

  useEffect(() => {
    const fetchData = async () => {
      const userModel = JSON.parse(localStorage.getItem('userModel'));

      if (!userModel || !userModel.token || !userModel.userId) {
        window.location.href = '/login';
        return;
      }

      const headers = {
        Authorization: `Bearer ${userModel.token}`,
      };

      try {
        const emailOperador = 'seu-email@example.com';
        const response = await fetch(
          `http://116.202.20.228:8001/protocols/email_operador/${emailOperador}`,
          { headers }
        );
        const data = await response.json();
        setProtocols(data);
        setTotalProtocols(data.length); // Atualiza o total de protocolos
        setLoading(false); // Defina como false após a conclusão do carregamento
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false); // Defina como false em caso de erro
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Card className="shadow">
          <CardHeader>
            <div className="d-flex justify-content-between p-2 mb-3">
              <h3 className="d-flex align-items-center text-uppercase text-primary">
                Contagem de Protocolos
              </h3>
              <ProtocolCounter totalProtocols={totalProtocols} />{' '}
              {/* Aqui é onde você insere o contador de protocolos */}
            </div>
            {loading ? ( // Verifica se a página está carregando
              <LoadingIndicator /> // Se estiver carregando, exibe o indicador de carregamento
            ) : (
              <Table
                tableData={protocols.map((protocol) => ({
                  // Mapeia os protocolos para os dados da tabela
                  protocolo: protocol.cod_protocolo,
                  setor: protocol.setor,
                  status: protocol.protocol_status,
                  atendimento: protocol.type_atendimento,
                  user: protocol.obs_user,
                  sistema: protocol.obs_sistema,
                  nome: protocol.nome_cliente,
                  numero: protocol.telefone_cliente || '', // Se o número não estiver disponível, defina como uma string vazia
                  email: protocol.email_cliente,
                  data: protocol.data,
                  acao: 'Ação', // Defina a ação para cada linha
                }))}
                includeActionColumn={false} // Ativa a coluna de ação
                visibleColumns={columnOrder}
                columnsConfig={columnsConfig} // Passa as configurações das colunas
                actionMenuOptions={menuOptions} // Opções personalizadas para o menu de ações
              />
            )}
          </CardHeader>
        </Card>
      </Container>
    </>
  );
};

export default InspectionTicket;
