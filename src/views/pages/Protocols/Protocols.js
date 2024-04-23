import React, { useState, useEffect } from 'react';
import { Card, Container, CardHeader } from 'reactstrap';
import Header from 'components/Headers/Header.js';
import Table from 'components/Table/Table.js';
import LoadingIndicator from 'components/Loading/Loading.js';
import TableColumns from 'components/Table/tableColumns.js';
import ProtocolCounter from 'components/ProtocolCounter/ProtocolCounter.js';
import { fetchAllProtocols } from 'services/ProtocolRequests.js';

const customActionMenuOptions = [
  { action: 'status', label: 'Alterar Status do Protocolo' },
];

const Protocols = () => {
  // Estado para armazenar os protocolos, estado de carregamento e o total de protocolos
  const [protocols, setProtocols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProtocols, setTotalProtocols] = useState();

  // Definir a ordem das colunas na tabela
  const columnOrder = ['protocolo', 'status', 'nome', 'email', 'data', 'acao'];

  // Configurar as colunas da tabela

  const columnsConfig = TableColumns(false, columnOrder);
  // Função para buscar os protocolos

  const fetchProtocols = async () => {
    try {
      // Busca todos os protocolos
      const protocolsData = await fetchAllProtocols();
      setProtocols(protocolsData);
      setTotalProtocols(protocolsData.length); // Atualiza o total de protocolos
      setLoading(false); // Indica que o carregamento foi concluído
    } catch (error) {
      console.error('Erro ao buscar protocolos:', error);
      setLoading(false);
    }
  };

  // Efeito para buscar os protocolos ao montar o componente
  useEffect(() => {
    fetchProtocols();
  }, []);

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

export default Protocols;
