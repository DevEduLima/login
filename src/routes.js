import React from 'react';
import { Navigate } from 'react-router-dom';

// Componentes de páginas
import Index from 'views/Index.js';
import TicketService from 'views/pages/TicketService/TicketService';
import InspectionTicket from 'views/pages/InspectionTicket/InspectionTicket';
import Protocols from 'views/pages/Protocols/Protocols'; 
import UserControl from 'views/pages/UserControl/UserControl';
import Login from 'views/Login/Login.js';
import AssistentTicket from 'views/pages/Assistent/AssistentTicket';
import Supervisor from 'views/pages/Supervisor/Supervisor';


// Função para verificar se o usuário está autenticado
const usuarioAutenticado = () => {
  // Lógica para verificar se o usuário está autenticado
  // Por exemplo, verificar se há um token de autenticação no localStorage
  return localStorage.getItem('userRole') !== null;
};

// Rotas do aplicativo
const routes = [
  {
    path: '/index',
    name: 'Inicio',
    icon: 'ni ni-tv-2 text-primary',
    // Renderiza a página inicial se o usuário estiver autenticado, caso contrário, redireciona para a página de login
    component: usuarioAutenticado() ? <Index /> : <Navigate to="/auth/login" />,
    layout: '/admin',
  },
  {
    path: '/ticket-service',
    name: 'Atendimento',
    icon: 'ni ni-chat-round text-orange',
    // Renderiza a página de atendimento se o usuário estiver autenticado e possuir a função de atendente, caso contrário, redireciona para a página de login
    component: usuarioAutenticado() ? (
      <TicketService />
    ) : (
      <Navigate to="/auth/login" />
    ),
    layout: '/admin',
    role: ['ATENDENTE'], // Role necessária para acessar esta rota
  },
  {
    path: '/supervisor',
    name: 'Supervisor',
    icon: 'ni ni-chat-round text-orange',
    // Renderiza a página de atendimento se o usuário estiver autenticado e possuir a função de atendente, caso contrário, redireciona para a página de login
    component: usuarioAutenticado() ? (
      <Supervisor />
    ) : (
      <Navigate to="/auth/login" />
    ),
    layout: '/admin',
    role: ['SUPERVISOR'], // Role necessária para acessar esta rota
  },
  {
    path: '/inspection-ticket',
    name: 'Fiscalização',
    icon: 'ni ni-chat-round text-yellow',
    // Renderiza a página de fiscalização se o usuário estiver autenticado e possuir a função de fiscal, caso contrário, redireciona para a página de login
    component: usuarioAutenticado() ? (
      <InspectionTicket />
    ) : (
      <Navigate to="/auth/login" />
    ),
    layout: '/admin',
    role: ['FISCAL'], // Role necessária para acessar esta rota
  },
  {
    path: '/assistente',
    name: 'Assistente',
    icon: 'ni ni-laptop text-blue',
    // Renderiza o componente AssistentTicket se o usuário estiver autenticado, caso contrário, redireciona para a página de login
    component: usuarioAutenticado() ? (
      <AssistentTicket />
    ) : (
      <Navigate to="/auth/login" />
    ),
    layout: '/admin',
    role: ['ADMIN'], // Role necessária para acessar esta rota
  },
  {
    path: '/protocolos',
    name: 'Protocolos',
    icon: 'ni ni-laptop text-blue',
    // Renderiza a página de TI se o usuário estiver autenticado e possuir a função de administrador, caso contrário, redireciona para a página de login
    component: usuarioAutenticado() ? (
      <Protocols />
    ) : (
      <Navigate to="/auth/login" />
    ),
    layout: '/admin',
    role: ['ADMIN'], // Role necessária para acessar esta rota
  },
  {
    path: '/register',
    name: 'Controle de usuários',
    icon: 'ni ni-single-02 text-black',
    // Renderiza a página de controle de usuários se o usuário estiver autenticado e possuir a função de administrador, caso contrário, redireciona para a página de login
    component: usuarioAutenticado() ? (
      <UserControl />
    ) : (
      <Navigate to="/auth/login" />
    ),
    layout: '/admin',
    role: ['ADMIN'], // Role necessária para acessar esta rota
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-single-02 text-black',
    component: <Login />,
    layout: '/auth',
  },
];

export default routes;
