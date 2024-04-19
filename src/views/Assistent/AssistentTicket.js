import React, { useState, useEffect } from 'react'; 
import { Card, Container, CardHeader } from 'reactstrap'; 
import Header from 'components/Headers/Header.js'; 
import Table from 'components/Table/Table.js'; 
import TableColumns from '../../components/Table/TableColumns.js';
import ProtocolCounter from '../../components/ProtocolCounter/ProtocolCounter.js'; 
import LoadingIndicator from 'components/Loading/Loading.js'; 
import { fetchProtocolsByType } from '../../services/ProtocolRequests.js'; 

const AssistentTicket = () => {
  const [protocols, setProtocols] = useState([]); // Define o estado para os protocolos e a função para atualizá-lo
  const [loading, setLoading] = useState(true); // Define o estado para o carregamento e a função para atualizá-lo
  const [totalProtocols, setTotalProtocols] = useState(0); // Define o estado para o total de protocolos e a função para atualizá-lo

  const columnOrder = [ // Define a ordem das colunas da tabela
    'protocolo',
    'setor',
    'nome',
    'numero',
    'email',
    'data',
  ];
  const columnsConfig = TableColumns(false, columnOrder); // Configuração das colunas da tabela



  useEffect(() => { // Efeito para buscar os protocolos ao montar o componente
    const fetchProtocolsData = async () => { // Função assíncrona para buscar os protocolos
      try {
        const protocolsData = await fetchProtocolsByType('AB'); // Busca os protocolos do tipo AB

        setProtocols(protocolsData); // Atualiza os protocolos no estado
        setTotalProtocols(protocolsData.length); // Atualiza o total de protocolos no estado
        setLoading(false); // Define o carregamento como concluído
      } catch (error) {
        console.error('Erro ao buscar dados:', error); // Exibe um erro no console se houver algum problema na busca
        setLoading(false); // Define o carregamento como concluído, mesmo em caso de erro
      }
    };

    fetchProtocolsData(); // Executa a função para buscar os protocolos ao montar o componente
  }, []); // Dependência vazia indica que o efeito deve ser executado apenas uma vez, ao montar o componente

  return (
    <> 
      <Header /> {/* Renderiza o componente Header */}
      <Container className="mt--7" fluid> {/* Container fluido para envolver os elementos */}
        <Card className="shadow"> {/* Cartão com sombra */}
          <CardHeader> {/* Cabeçalho do cartão */}
            <div className="d-flex justify-content-between p-2 mb-3"> {/* Div para alinhar os itens horizontalmente */}
              <h3 className="d-flex align-items-center text-uppercase text-primary"> {/* Título */}
                Protocolos Assistente IA
              </h3>
              <ProtocolCounter totalProtocols={totalProtocols} /> {/* Renderiza o contador de protocolos */}
            </div>
            {loading ? ( // Condição para renderizar o indicador de carregamento se loading for verdadeiro
              <LoadingIndicator />
            ) : ( // Caso contrário, renderiza a tabela com os protocolos
              <Table
                tableData={protocols.map((protocol) => ({ // Mapeia os protocolos para os dados da tabela
                  protocolo: protocol.id,
                  setor: protocol.setor,
                  status: protocol.protocol_status,
                  atendimento: protocol.type_atendimento,
                  user: protocol.obs_user,
                  sistema: protocol.obs_sistema,
                  nome: protocol.nome_cliente,
                  numero: protocol.telefone_cliente || '',
                  email: protocol.email_cliente,
                  data: protocol.data,
                  hora_start: protocol.hora_start,
                  cpfCnpj: protocol.cpf_cnpj,
                  fantasia: protocol.nome_fantasia,
                  end: protocol.hora_end,
                  conversation: protocol.id_conversation,
                  id_user: protocol.id_operador,
                  email_operador: protocol.email_operador,
                  cod_protocolo:protocol.cod_protocolo,
                }))}
                includeActionColumn={false} // Não inclui a coluna de ação
                enableRowClick={true} // Habilita o clique nas linhas da tabela
                visibleColumns={columnOrder} // Colunas visíveis
                columnsConfig={columnsConfig} // Configuração das colunas
              
              />
            )}
          </CardHeader>
        </Card>
      </Container>
    </>
  );
};

export default AssistentTicket; // Exporta o componente AssistentTicket
