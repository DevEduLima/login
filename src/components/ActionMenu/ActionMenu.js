import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ActionMenu = ({
  onMenuClick,
  onMenuClose,
  onMenuItemClick,
  menuOptions,
  protocolId,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
    onMenuClick(event);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    onMenuClose();
  };

  const handleMenuItemClick = (menuItemAction) => {
    // Chama a função de callback com a ação do item do menu e o ID do protocolo
    onMenuItemClick(menuItemAction, protocolId,);
    handleMenuClose();
  };

  return (
    <>
      <IconButton onClick={handleButtonClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {menuOptions.map((option, index) => (
          <MenuItem
            key={option.action}
            onClick={() => handleMenuItemClick(option.action)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ActionMenu;
