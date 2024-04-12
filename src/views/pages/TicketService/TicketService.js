import React, { useState, useEffect } from "react";
import { Card, Container, CardHeader } from "reactstrap";
import Header from "components/Headers/Header.js";
import Table from 'components/Table/Table.js';
import TableColumns from '../../../components/Table/TableColumns.js';
import LoadingIndicator from 'components/Loading/Loading.js'; 
import ProtocolCounter from '../../../components/ProtocolCounter/ProtocolCounter.js'; 

import { fetchProtocolByEmailOperator } from '../../../services/ProtocolRequests.js'; 

// Define a ordem das colunas da tabela
const columnOrder = ['protocolo', 'setor', 'nome', 'numero', 'email', 'data'];
// Configuração das colunas da tabela
const columnsConfig = TableColumns(false, columnOrder);

// Componente TicketService
const TicketService = () => {
  // Estado para armazenar os protocolos
  const [protocols, setProtocols] = useState([]);
  // Estado para indicar se a página está carregando
  const [loading, setLoading] = useState(true);
  // Estado para armazenar o total de protocolos
  const [totalProtocols, setTotalProtocols] = useState(0);

  // Efeito para buscar os protocolos ao montar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userModel = JSON.parse(localStorage.getItem('userModel')); // Obtém as informações do usuário logado
        const emailOperador = userModel.email; // Usa o email do usuário logado para a requisição
        
        // Busca os protocolos pelo email do operador
        const data = await fetchProtocolByEmailOperator(emailOperador);
        // Atualiza o estado dos protocolos
        setProtocols(data);
        // Define o carregamento como concluído
        setLoading(false);

        // Atualiza o total de protocolos com base nos protocolos encontrados
        setTotalProtocols(data.length);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        // Define o carregamento como concluído mesmo em caso de erro
        setLoading(false);
      }
    };

    fetchData(); // Executa a função fetchData ao montar o componente
  }, []);

  return (
    <>
      <Header /> {/* Renderiza o cabeçalho */}
      <Container className="mt--7" fluid> {/* Container fluido para envolver os elementos */}
        <Card className="shadow"> {/* Cartão com sombra */}
          <CardHeader> {/* Cabeçalho do cartão */}
            <div className="d-flex justify-content-between p-2 mb-3"> {/* Div para alinhar os itens horizontalmente */}
              <h3 className="d-flex align-items-center text-uppercase text-primary"> {/* Título */}
                Contagem de Protocolos
              </h3>
              <ProtocolCounter totalProtocols={totalProtocols} /> {/* Contador de protocolos */}
            </div>
            {loading ? ( // Condição para verificar se a página está carregando
              <LoadingIndicator /> // Se estiver carregando, exibe o indicador de carregamento
            ) : (
              <Table // Tabela para exibir os protocolos
                tableData={protocols.map((protocol) => ({ // Mapeia os protocolos para os dados da tabela
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
                }))}

                visibleColumns={columnOrder} // Colunas visíveis
                columnsConfig={columnsConfig} // Passa as configurações das colunas
              />
            )}
          </CardHeader>
        </Card>
      </Container>
    </>
  );
};

export default TicketService; // Exporta o componente TicketService
