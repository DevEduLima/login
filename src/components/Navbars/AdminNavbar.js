// Importações necessárias do React e do React Router DOM, juntamente com os componentes do Reactstrap
import React from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from 'reactstrap';

// Componente AdminNavbar para a barra de navegação do administrador
const AdminNavbar = ({ handleLogout }) => {
  // Obtém o nome, email e papel do usuário do armazenamento local
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  const userRole = localStorage.getItem('userRole');

  // Função para limpar os itens do local storage ao fazer logout
  const handleLogoutClick = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    handleLogout(); // Chama a função de logout após limpar o local storage
  };

  return (
    <>
      {/* Navbar para exibir a barra de navegação */}
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        {/* Container fluido para envolver os elementos */}
        <Container fluid>
          {/* Link para a página inicial */}
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            Inicio
          </Link>
          {/* Itens de navegação */}
          <Nav className="align-items-center d-none d-md-flex" navbar>
            {/* Dropdown não controlado para o perfil do usuário */}
            <UncontrolledDropdown nav>
              {/* Toggle do dropdown */}
              <DropdownToggle className="pr-0" nav>
                {/* Media para exibir a imagem e o nome do usuário */}
                <Media className="align-items-center">
                  {/* Nome do usuário */}
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {userName}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              {/* Menu do dropdown */}
              <DropdownMenu className="dropdown-menu-arrow" right>
                {/* Título do menu */}
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Bem Vindo!</h6>
                </DropdownItem>
                {/* Item do menu para o email do usuário */}
                <DropdownItem to="/admin/user-profile">
                  <i className="ni ni-email-83" />
                  <span>{userEmail}</span>
                </DropdownItem>
                {/* Item do menu para o papel do usuário */}
                <DropdownItem to="/admin/user-profile">
                  <i className="ni ni-pin-3" />
                  <span>{userRole}</span>
                </DropdownItem>
                {/* Divisor */}
                <DropdownItem divider />
                {/* Item do menu para sair com a função de logout */}
                <DropdownItem onClick={handleLogoutClick}>
                  <i className="ni ni-user-run" />
                  <span>Sair</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;