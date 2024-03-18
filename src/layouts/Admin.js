import React from 'react';
import { useNavigate, useLocation, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from 'reactstrap';
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import AdminFooter from 'components/Footers/AdminFooter.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import routes from 'routes.js';

const Admin = (props) => {
  // Ref para o conteúdo principal
  const mainContent = React.useRef(null);
  // Hook para obter a localização
  const location = useLocation();
  // Hook para navegação
  const navigate = useNavigate();

  // Efeito para garantir que a página seja rolada para o topo ao mudar de rota
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  // Função para obter as rotas correspondentes ao layout admin
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  // Função para lidar com o logout
  const handleLogout = () => {
    // Remove o token e o ID do usuário do localStorage
    localStorage.removeItem('userModel');
    // Redireciona para a página de login após o logout
    navigate('/auth/login');
  };

  // Função para obter o texto da marca com base na rota atual
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };
  
  return (
    <>
      {/* Componente de barra lateral */}
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: '/admin/index',
          imgSrc: require('../assets/img/logoCrt.png'),
          imgAlt: 'logo-crtba',
        }}
      />
      <div className="main-content" ref={mainContent}>
        {/* Componente de barra de navegação */}
        <AdminNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
          handleLogout={handleLogout}
        />
        <Routes>
          {/* Renderiza as rotas */}
          {getRoutes(routes)}
          {/* Redireciona para a página inicial se a rota não for encontrada */}
          <Route path="*" element={<Navigate to="/admin/index" replace />} />
        </Routes>
        <Container fluid>
          {/* Componente de rodapé */}
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
