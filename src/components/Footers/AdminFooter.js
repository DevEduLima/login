/*eslint-disable*/ 

// Importa componentes do Reactstrap
import { Row, Col } from "reactstrap";

// Componente Footer para o rodapé da página
const Footer = () => {
  return (
    <footer className="footer"> {/* Rodapé */}
      <Row className="align-items-center justify-content-xl-between"> {/* Linha para alinhar e distribuir os itens */}
        <Col xl="6"> {/* Coluna para ocupar 6 espaços na grade em telas extra largas */}
          <div className="copyright text-center text-xl-left text-muted"> {/* Div para texto de direitos autorais */}
            © {new Date().getFullYear()}{" "} {/* Exibe o ano atual */}
            <a
              className="font-weight-bold ml-1"
              href="https://www.crtba.org.br/"
              rel="noopener noreferrer"
              target="_blank"
            >
              CRTBA {/* Texto do link para CRTBA */}
            </a>
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer; // Exporta o componente Footer
