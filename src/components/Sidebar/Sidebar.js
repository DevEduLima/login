/*eslint-disable*/
import React, { useState } from 'react';
import { NavLink as NavLinkRRD, Link, useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import {
  Collapse,
  NavbarBrand,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Navbar,
} from 'reactstrap';


const Sidebar = (props) => {
  // Estado para controlar se o menu está aberto ou fechado
  const [collapseOpen, setCollapseOpen] = useState(false);
  // Obtém o papel do usuário armazenado localmente
  const userRole = localStorage.getItem('userRole');

  // Função para verificar se o usuário tem permissão com base nos papéis permitidos
  const hasPermission = (allowedRoles) =>
    allowedRoles && allowedRoles.includes(userRole);

  // Função para fechar o menu quando um link é clicado
  const closeCollapse = () => setCollapseOpen(false);

  const { routes, logo } = props;

  const navigate = useNavigate();

  // Função para lidar com o logout
  const handleLogoutClick = () => {
    // Limpa os dados do local storage
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
  
    // Exibe o alerta com um timeout de 3 segundos
    alert('Você foi desconectado com sucesso. Redirecionando para a página de login.'); 
    // Redireciona para a página de login após 3 segundos
    setTimeout(() => {
      navigate('/auth/login');
    }, 3000);
  };

  // Função para criar os links de navegação com base nas rotas e nas permissões do usuário
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.path === '/index' || hasPermission(prop.role)) {
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={closeCollapse}
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
          </NavItem>
        );
      }
      return null;
    });
  };

  // Configurações do logotipo da barra lateral
  let navbarBrandProps;
  if (logo) {
    if (logo.innerLink) {
      navbarBrandProps = { to: logo.innerLink, tag: Link };
    } else if (logo.outterLink) {
      navbarBrandProps = { href: logo.outterLink, target: '_blank' };
    }
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setCollapseOpen(!collapseOpen)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Renderiza o logotipo se estiver disponível */}
        {logo && (
          <NavbarBrand className="pt-3 pb-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img img-fluid rounded float-left"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        )}
        {/* Renderiza o menu lateral */}
        <Collapse navbar isOpen={collapseOpen}>
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {/* Renderiza o logotipo no cabeçalho do menu colapsado */}
              {logo && (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              )}
              {/* Botão para fechar o menu colapsado */}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={closeCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Renderiza os links de navegação */}
          
          <Nav navbar>{createLinks(routes)}</Nav>
          
          <hr className="my-3"/>

          {/* Botão de saída (logout) */}
          <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              <NavLink onClick={handleLogoutClick}>
                <i className="ni ni-user-run" />
                Sair
              </NavLink>
            </NavItem>
          </Nav>
          
          {/* Renderiza um separador e um link para suporte */}
          {/* <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              <NavLink href="https://www.crtba.org.br/" target="_blank">
                <i className="ni ni-support-16" />
                Suporte
              </NavLink>
            </NavItem>
          </Nav> */}

        </Collapse>
      </Container>
    </Navbar>
  );
};

// Propriedades padrão do componente Sidebar
Sidebar.defaultProps = {
  routes: [],
};

// Tipos das propriedades esperadas pelo componente Sidebar
Sidebar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    innerLink: PropTypes.string,
    outterLink: PropTypes.string,
    imgSrc: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
