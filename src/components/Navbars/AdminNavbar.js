// AdminNavbar.js

import React from 'react'; // Importa o módulo React
import { Link } from 'react-router-dom'; // Importa o componente Link do React Router DOM
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from 'reactstrap'; // Importa componentes do Reactstrap

// Componente AdminNavbar para a barra de navegação do administrador
const AdminNavbar = ({ handleLogout }) => {
  // Define o componente com a função de logout como propriedade

  // Obtém o nome, email e papel do usuário do armazenamento local
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  const userRole = localStorage.getItem('userRole');

  return (
    <>
      {/* Fragmento React para retornar múltiplos elementos */}
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        {/* Navbar escura */}
        <Container fluid>
          {/* Container fluido para envolver os elementos */}
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            Inicio
          </Link>
          {/* Link para a página inicial */}
          <Nav className="align-items-center d-none d-md-flex" navbar>
            {/* Itens de navegação */}
            <UncontrolledDropdown nav>
              {/* Dropdown não controlado para o perfil do usuário */}
              <DropdownToggle className="pr-0" nav>
                {/* Toggle do dropdown */}
                <Media className="align-items-center">
                  {/* Media para exibir a imagem e o nome do usuário */}
                  {/* <span className="avatar avatar-sm rounded-circle"> //avatar do usuário
                    <img alt="..." src={require('../../assets/img/theme/team-4-800x800.jpg')} />
                  </span> */}
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {userName}
                    </span>
                    {/* Nome do usuário */}
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                {/* Menu do dropdown */}
                <DropdownItem className="noti-title" header tag="div">
                  {/* Título do menu */}
                  <h6 className="text-overflow m-0">Bem Vindo!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile">
                  {/* Item do menu para o email do usuário */}
                  <i className="ni ni-email-83" />
                  <span>{userEmail}</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile">
                  {/* Item do menu para o papel do usuário */}
                  <i className="ni ni-pin-3" />
                  <span>{userRole}</span>
                </DropdownItem>
                {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>Meu perfil</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>configurações</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>atividade</span>
                </DropdownItem> */}
                <DropdownItem divider /> {/* Divisor */}
                <DropdownItem onClick={handleLogout}>
                  {/* Item do menu para sair com a função de logout */}
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
