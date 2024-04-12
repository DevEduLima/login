// ActionMenu.js
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton'; // Importa o componente IconButton do Material-UI
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Importa o ícone de menu vertical do Material-UI
import Menu from '@mui/material/Menu'; // Importa o componente Menu do Material-UI
import MenuItem from '@mui/material/MenuItem'; // Importa o componente MenuItem do Material-UI

// Componente ActionMenu
const ActionMenu = ({
  onMenuClick, // Função de callback para o evento de clique no menu
  onMenuClose, // Função de callback para o evento de fechamento do menu
  onMenuItemClick, // Função de callback para o evento de clique em um item do menu
  menuOptions, // Opções do menu, cada uma contendo um rótulo e uma ação
  userId, // Adicione userId como uma prop
}) => {
  const [anchorEl, setAnchorEl] = useState(null); // Estado para controlar o elemento âncora do menu

  // Manipulador de evento para clique no botão
  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget); // Define o elemento âncora como o elemento clicado
    onMenuClick(event); // Chama a função de callback para o evento de clique no menu
  };

  // Manipulador de evento para fechamento do menu
  const handleMenuClose = () => {
    setAnchorEl(null); // Remove o elemento âncora, fechando o onMenuItemClick 
    onMenuClose(); // Chama a função de callback para o evento de fechamento do menu
  };

  // Manipulador de evento para clique em um item do menu
  const handleMenuItemClick = (menuItemAction) => {
    onMenuItemClick(menuItemAction, userId); // Chama a função de callback com a ação do item do menu
    handleMenuClose(); // Fecha o menu após clicar em um item
  };


  return (
    <>
      {/* Botão de ação */}
      <IconButton onClick={handleButtonClick}>
        <MoreVertIcon /> {/* Ícone de menu vertical */}
      </IconButton>
      {/* Menu de opções */}
      <Menu
        anchorEl={anchorEl} // Define o elemento âncora do menu
        open={Boolean(anchorEl)} // Define se o menu está aberto baseado no estado do elemento âncora
        onClose={handleMenuClose} // Função de callback para fechamento do menu
      >
        {/* Mapeia as opções do menu e renderiza cada uma como um MenuItem */}
        {menuOptions.map((option, index) => (
          <MenuItem
          key={option.action} // Chave única para o item do menu
          onClick={() => handleMenuItemClick(option.action)} // Manipulador de evento para clique no item do menu
          // onMenuItemClick={onMenuItemClick} // Passa a função onMenuItemClick para o MenuItem
        >
          {option.label} {/* Rótulo do item do menu */}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ActionMenu; // Exporta o componente ActionMenu
