// reactstrap components

// CASO QUERIA COLOCAR ALGUM AVISO NO HEADER DA DA AUTENTICAÇÃO

import { Navbar,Container } from 'reactstrap';

const AdminNavbar = () => {
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container>
          {/* <div  className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
            asdasdasd
          </div> */}
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;