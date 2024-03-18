import React from "react"; // Importa o módulo React
import ReactDOM from "react-dom/client"; // Importa o método ReactDOM.createRoot
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; // Importa componentes relacionados ao roteamento

import "assets/plugins/nucleo/css/nucleo.css"; // Importa estilos do Nucleo
import "@fortawesome/fontawesome-free/css/all.min.css"; // Importa estilos dos ícones do FontAwesome
import "assets/scss/argon-dashboard-react.scss"; // Importa estilos do Argon Dashboard React

import AdminLayout from "layouts/Admin.js"; // Importa o layout Admin
import AuthLayout from "layouts/Auth.js"; // Importa o layout Auth
import { AuthProvider } from "./context/AuthContext"; // Importa o AuthProvider do contexto de autenticação

// Componente principal da aplicação
const App = () => {
  return (
    <BrowserRouter> {/* Componente para prover a navegação do lado do cliente */}
      <Routes> {/* Componente para definir as rotas */}
        <Route path="/admin/*" element={<AdminLayout />} /> {/* Rota para o layout Admin */}
        <Route path="/auth/*" element={<AuthLayout />} /> {/* Rota para o layout Auth */}
        <Route path="*" element={<Navigate to="/admin/index" replace />} /> {/* Rota padrão para redirecionar para o layout Admin */}
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")); // Cria uma raiz React no elemento com id "root"

root.render( // Renderiza a aplicação na raiz React
  <AuthProvider> {/* Componente AuthProvider para fornecer o contexto de autenticação */}
    <App /> {/* Componente principal da aplicação */}
  </AuthProvider>
);
