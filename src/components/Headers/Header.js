// Importa componentes do Reactstrap
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

// Componente Header para o cabeçalho da página
const Header = () => {
  return (
    <> {/* Fragmento React para retornar múltiplos elementos */}
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"> {/* Div para o cabeçalho com gradiente de fundo */}
        <Container fluid> {/* Container fluido para envolver os elementos */}
          <div className="header-body"> {/* Corpo do cabeçalho */}
            {/* Card stats */}
            <Row> {/* Linha para os cards de estatísticas */}
              {/* Card de estatísticas - Tempo de Assistência */}
              <Col lg="6" xl="3"> {/* Coluna para ocupar 3 espaços na grade em telas grandes */}
                <Card className="card-stats mb-4 mb-xl-0"> {/* Card de estatísticas */}
                  <CardBody> {/* Corpo do card */}
                    <Row> {/* Linha para os elementos dentro do card */}
                      <div className="col"> {/* Div para o título e valor */}
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Tempo de Assistência {/* Título do card */}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">350897 H</span> {/* Valor */}
                      </div>
                      <Col className="col-auto"> {/* Coluna automática para o ícone */}
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow"> {/* Ícone */}
                          <i className="ni ni-chart-bar-32" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48% {/* Percentual de aumento */}
                      </span>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              {/* Card de estatísticas - Total de Protocolos */}
              <Col lg="6" xl="3"> {/* Coluna para ocupar 3 espaços na grade em telas grandes */}
                <Card className="card-stats mb-4 mb-xl-0"> {/* Card de estatísticas */}
                  <CardBody> {/* Corpo do card */}
                    <Row> {/* Linha para os elementos dentro do card */}
                      <div className="col"> {/* Div para o título e valor */}
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                            Total de Protocolos {/* Título do card */}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">2,356</span> {/* Valor */}
                      </div>
                      <Col className="col-auto"> {/* Coluna automática para o ícone */}
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow"> {/* Ícone */}
                          <i className="ni ni-chart-bar-32" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48% {/* Percentual de diminuição */}
                      </span>{" "}
                      <span className="text-nowrap">todo o pe</span> {/* Texto adicional */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              {/* Card de estatísticas - Protocolo Técnico */}
              <Col lg="6" xl="3"> {/* Coluna para ocupar 3 espaços na grade em telas grandes */}
                <Card className="card-stats mb-4 mb-xl-0"> {/* Card de estatísticas */}
                  <CardBody> {/* Corpo do card */}
                    <Row> {/* Linha para os elementos dentro do card */}
                      <div className="col"> {/* Div para o título e valor */}
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Protocolo Técnico {/* Título do card */}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">924</span> {/* Valor */}
                      </div>
                      <Col className="col-auto"> {/* Coluna automática para o ícone */}
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow"> {/* Ícone */}
                          <i className="ni ni-chart-bar-32" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10% {/* Percentual de diminuição */}
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span> {/* Texto adicional */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              {/* Card de estatísticas - Protocolos Empresas */}
              <Col lg="6" xl="3"> {/* Coluna para ocupar 3 espaços na grade em telas grandes */}
                <Card className="card-stats mb-4 mb-xl-0"> {/* Card de estatísticas */}
                  <CardBody> {/* Corpo do card */}
                    <Row> {/* Linha para os elementos dentro do card */}
                      <div className="col"> {/* Div para o título e valor */}
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Protocolos Empresas {/* Título do card */}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">49,65%</span> {/* Valor */}
                      </div>
                      <Col className="col-auto"> {/* Coluna automática para o ícone */}
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow"> {/* Ícone */}
                          <i className="ni ni-chart-bar-32" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12% {/* Percentual de aumento */}
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span> {/* Texto adicional */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header; 
