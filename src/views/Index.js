import React, { useState } from "react"; // Importa o módulo React e a função useState
import classnames from "classnames"; // Importa a função classnames para concatenar classes de forma condicional
import Chart from "chart.js"; // Importa a biblioteca Chart.js
import { Line, Bar } from "react-chartjs-2"; // Importa os componentes de linha e barra do Chart.js para o React
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap"; // Importa componentes do Reactstrap
import { chartOptions, parseOptions, chartExample1, chartExample2 } from "variables/charts.js"; // Importa variáveis relacionadas aos gráficos
import Header from "components/Headers/Header.js"; // Importa o componente Header

// Componente Index para a página inicial
const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1); // Define o estado para a navegação ativa e a função para atualizá-lo
  const [chartExample1Data, setChartExample1Data] = useState("data1"); // Define o estado para os dados do exemplo de gráfico e a função para atualizá-lo

  if (window.Chart) { // Verifica se a biblioteca Chart.js está disponível no ambiente
    parseOptions(Chart, chartOptions()); // Analisa as opções de gráfico
  }

  // Função para alternar entre os itens de navegação
  const toggleNavs = (e, index) => {
    e.preventDefault(); // Previne o comportamento padrão do evento
    setActiveNav(index); // Atualiza o estado da navegação ativa
    setChartExample1Data("data" + index); // Atualiza os dados do exemplo de gráfico
  };

  return (
    <>
      <Header /> {/* Renderiza o componente Header */}
      {/* Conteúdo da página */}
      <Container className="mt--7" fluid> {/* Container fluido para envolver os elementos */}
        <Row> {/* Linha para dividir os elementos horizontalmente */}
          <Col className="mb-5 mb-xl-0" xl="8"> {/* Coluna para ocupar 8 espaços na grade */}
            <Card className="bg-gradient-default shadow"> {/* Cartão com gradiente de fundo e sombra */}
              <CardHeader className="bg-transparent"> {/* Cabeçalho do cartão transparente */}
                <Row className="align-items-center"> {/* Linha para alinhar os itens verticalmente */}
                  <div className="col"> {/* Div para ocupar todo o espaço disponível */}
                    <h6 className="text-uppercase text-light ls-1 mb-1">Principal</h6> {/* Título do cabeçalho */}
                    <h2 className="text-white mb-0">Visão Principal</h2> {/* Título principal */}
                  </div>
                  <div className="col"> {/* Div para ocupar todo o espaço disponível */}
                    <Nav className="justify-content-end" pills> {/* Navegação de pílulas justificada à direita */}
                      <NavItem> {/* Item de navegação */}
                        {/* Link para o mês */}
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1, // Adiciona a classe 'active' se a navegação estiver ativa
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)} // Função para alternar entre os itens de navegação
                        >
                          <span className="d-none d-md-block">Mês</span> {/* Texto visível em dispositivos maiores */}
                          <span className="d-md-none">M</span> {/* Texto visível em dispositivos menores */}
                        </NavLink>
                      </NavItem>
                      <NavItem> {/* Item de navegação */}
                        {/* Link para a semana */}
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2, // Adiciona a classe 'active' se a navegação estiver ativa
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)} // Função para alternar entre os itens de navegação
                        >
                          <span className="d-none d-md-block">Semana</span> {/* Texto visível em dispositivos maiores */}
                          <span className="d-md-none">S</span> {/* Texto visível em dispositivos menores */}
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody> {/* Corpo do cartão */}
                {/* Gráfico de linha */}
                <div className="chart"> {/* Div para renderizar o gráfico */}
                  <Line
                    data={chartExample1[chartExample1Data]} // Dados do gráfico
                    options={chartExample1.options} // Opções do gráfico
                    getDatasetAtEvent={(e) => console.log(e)} // Função para obter o conjunto de dados no evento
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4"> {/* Coluna para ocupar 4 espaços na grade */}
            <Card className="shadow"> {/* Cartão com sombra */}
              <CardHeader className="bg-transparent"> {/* Cabeçalho do cartão transparente */}
                <Row className="align-items-center"> {/* Linha para alinhar os itens verticalmente */}
                  <div className="col"> {/* Div para ocupar todo o espaço disponível */}
                    <h6 className="text-uppercase text-muted ls-1 mb-1">Performance</h6> {/* Título do cabeçalho */}
                    <h2 className="mb-0">Total orders</h2> {/* Título principal */}
                  </div>
                </Row>
              </CardHeader>
              <CardBody> {/* Corpo do cartão */}
                {/* Gráfico de barra */}
                <div className="chart"> {/* Div para renderizar o gráfico */}
                  <Bar
                    data={chartExample2.data} // Dados do gráfico
                    options={chartExample2.options} // Opções do gráfico
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5"> {/* Linha para dividir os elementos horizontalmente */}
          <Col className="mb-5 mb-xl-0" xl="8"> {/* Coluna para ocupar 8 espaços na grade */}
            <Card className="shadow"> {/* Cartão com sombra */}
              <CardHeader className="border-0"> {/* Cabeçalho do cartão sem borda */}
                <Row className="align-items-center"> {/* Linha para alinhar os itens verticalmente */}
                  <div className="col"> {/* Div para ocupar todo o espaço disponível */}
                    <h3 className="mb-0">Page visits</h3> {/* Título principal */}
                  </div>
                  <div className="col text-right"> {/* Div para ocupar todo o espaço disponível */}
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()} // Previne o comportamento padrão do evento
                      size="sm"
                    >
                      See all {/* Botão para ver todos */}
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive> {/* Tabela responsiva */}
                <thead className="thead-light"> {/* Cabeçalho da tabela */}
                  <tr> {/* Linha da tabela */}
                    <th scope="col">Page name</th> {/* Cabeçalho da coluna */}
                    <th scope="col">Visitors</th> {/* Cabeçalho da coluna */}
                    <th scope="col">Unique users</th> {/* Cabeçalho da coluna */}
                    <th scope="col">Bounce rate</th> {/* Cabeçalho da coluna */}
                  </tr>
                </thead>
                <tbody> {/* Corpo da tabela */}
                  <tr> {/* Linha da tabela */}
                    <th scope="row">/argon/</th> {/* Célula com o nome da página */}
                    <td>4,569</td> {/* Célula com o número de visitantes */}
                    <td>340</td> {/* Célula com o número de usuários únicos */}
                    <td> {/* Célula com a taxa de rejeição */}
                      <i className="fas fa-arrow-up text-success mr-3" /> 46,53% {/* Ícone de seta para cima */}
                    </td>
                  </tr>
                  {/* Outras linhas da tabela (comentadas) */}
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4"> {/* Coluna para ocupar 4 espaços na grade */}
            <Card className="shadow"> {/* Cartão com sombra */}
              <CardHeader className="border-0"> {/* Cabeçalho do cartão sem borda */}
                <Row className="align-items-center"> {/* Linha para alinhar os itens verticalmente */}
                  <div className="col"> {/* Div para ocupar todo o espaço disponível */}
                    <h3 className="mb-0">Social traffic</h3> {/* Título principal */}
                  </div>
                  <div className="col text-right"> {/* Div para ocupar todo o espaço disponível */}
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()} // Previne o comportamento padrão do evento
                      size="sm"
                    >
                      See all {/* Botão para ver todos */}
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive> {/* Tabela responsiva */}
                <thead className="thead-light"> {/* Cabeçalho da tabela */}
                  <tr> {/* Linha da tabela */}
                    <th scope="col">Referral</th> {/* Cabeçalho da coluna */}
                    <th scope="col">Visitors</th> {/* Cabeçalho da coluna */}
                    <th scope="col" /> {/* Cabeçalho da coluna vazio */}
                  </tr>
                </thead>
                <tbody> {/* Corpo da tabela */}
                  <tr> {/* Linha da tabela */}
                    <th scope="row">Facebook</th> {/* Célula com o nome do site de referência */}
                    <td>1,480</td> {/* Célula com o número de visitantes */}
                    <td> {/* Célula com a barra de progresso */}
                      <div className="d-flex align-items-center"> {/* Div para alinhar os itens verticalmente */}
                        <span className="mr-2">60%</span> {/* Porcentagem de visitantes */}
                        <div> {/* Div para renderizar a barra de progresso */}
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger" // Classe para estilizar a barra de progresso
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  {/* Outras linhas da tabela (comentadas) */}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index; 
