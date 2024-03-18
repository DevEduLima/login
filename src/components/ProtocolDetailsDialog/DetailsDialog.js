import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

// Função para formatar a data no formato dd/mm/aaaa
const formatarData = (data) => {
  const dataObj = new Date(data);
  const dia = String(dataObj.getDate()).padStart(2, '0'); // Obtém o dia
  const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Obtém o mês (lembre-se que janeiro é 0)
  const ano = dataObj.getFullYear(); // Obtém o ano

  return `${dia}/${mes}/${ano}`; // Retorna a data formatada
};

// Componente de diálogo para exibir os detalhes do item selecionado
const DetailsDialog = ({ isOpen, onClose, selectedItem }) => {
  return (
    // Diálogo do Material-UI com propriedades de abertura e fechamento
    <Dialog open={isOpen} onClose={onClose} className='text-lg'>
      {/* Título do diálogo */}
      <DialogTitle>Detalhes do Protocolo</DialogTitle>
      {/* Conteúdo do diálogo */}
      <DialogContent>
        {/* Verifica se há um item selecionado */}
        {selectedItem && (
          <>
            {/* Exibe os detalhes do protocolo */}
            <div>{`Protocolo: ${selectedItem.protocolo}`}</div>
            <div>{`Data: ${formatarData(selectedItem.data)}`}</div>
            <div>{`Nome: ${selectedItem.nome}`}</div>
            <div>{`Email: ${selectedItem.email}`}</div>
            <div>{`Telefone Cliente: ${selectedItem.numero}`}</div>
            <div>{`Setor: ${selectedItem.setor}`}</div>
            <div>{`Status do Protocolo: ${selectedItem.status}`}</div>
            <div>{`Observação do Usuário: ${selectedItem.user || 'N/A'}`}</div>
            <div>{`Observação do Sistema: ${selectedItem.sistema || 'N/A'}`}</div>
            {/* Os seguintes detalhes estão comentados, talvez sejam utilizados futuramente */}
            {/* <div>{`Hora de Início: ${selectedItem.hora_start}`}</div>
            <div>{`Hora de Término: ${selectedItem.hora}`}</div> */}
            <div>{`Tipo de Atendimento: ${selectedItem.atendimento}`}</div>
            <div>{`Status do Protocolo: ${selectedItem.status}`}</div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog; // Exporta o componente DetailsDialog
