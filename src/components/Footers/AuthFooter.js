/*eslint-disable*/ // Desativa os avisos do eslint para este arquivo

// Importa componentes do Reactstrap
import { Container, Row, Col } from "reactstrap";

// Componente Login para a página de login
const Login = () => {
  return (
    <> 
      <footer className="py-5"> {/* Rodapé com espaçamento vertical de 5 unidades */}
        <Container> {/* Container para envolver os elementos */}
          <Row className="d-flex justify-content-center"> {/* Linha flexível para alinhar e distribuir os itens */}
            <Col xl="6"> {/* Coluna para ocupar 6 espaços na grade em telas extra largas */}
              <div className="copyright text-center text-lg-5 text-muted pt-8"> {/* Div para texto de direitos autorais */}
                © {new Date().getFullYear()}{" "} {/* Exibe o ano atual */}
                <a
                  className="font-weight-bold ml-1"
                  href="#"
                  target="_blank"
                >
                  CRT BA {/* Texto do link para CRTBA */}
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Login; // Exporta o componente Login
