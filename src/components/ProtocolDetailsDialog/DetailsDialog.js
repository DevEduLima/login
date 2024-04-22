import React from 'react';
import { Dialog, DialogTitle, DialogContent, Divider } from '@mui/material';

// Função para formatar a data no formato dd/mm/aaaa

// Função para formatar a hora no formato hh:mm
const formatarHora = (hora) => {
  const horaObj = new Date(`1970-01-01T${hora}`);
  const horas = String(horaObj.getHours()).padStart(2, '0'); // Obtém a hora
  const minutos = String(horaObj.getMinutes()).padStart(2, '0'); // Obtém os minutos

  return `${horas}:${minutos}`; // Retorna a hora formatada
};
// Componente de diálogo para exibir os detalhes do item selecionado
const DetailsDialog = ({ isOpen, onClose, selectedItem }) => {
  return (
    // Diálogo do Material-UI com propriedades de abertura e fechamento
    <Dialog open={isOpen} onClose={onClose} className="text-lg">
      {/* Título do diálogo */}
      <DialogTitle className="text-center py-2">
        Detalhes do Protocolo
      </DialogTitle>
      <Divider />
      {/* Conteúdo do diálogo */}
      <DialogContent>
        {/* Verifica se há um item selecionado */}
        {selectedItem && (
          <>
            {/* Exibe os detalhes do protocolo */}
            <div>
              <div className="text-sm ">{`Protocolo: ${selectedItem.cod_protocolo}`}</div>

              <div className="text-sm">{`Status do Protocolo: ${selectedItem.status}`}</div>

              <h4 className="pt-1">Informações do Cliente</h4>

              <div className="text-sm ">{`Nome: ${selectedItem.nome}`}</div>

              <div className="text-sm">{`CPF/CNPJ: ${
                selectedItem.cpfCnpj || 'N/A'
              }`}</div>

              <div className="text-sm">{`Telefone Cliente: ${selectedItem.numero}`}</div>

              <div className="text-sm">{`Email: ${selectedItem.email}`}</div>

              <div className="text-sm">{`Nome Fantasia: ${
                selectedItem.fantasia || 'N/A'
              }`}</div>

              <h4 className="pt-1">Informações do Atendimento</h4>

              <div className="text-sm">{`Tipo de Atendimento: ${selectedItem.atendimento}`}</div>

              <div className="text-sm"> {`Setor: ${selectedItem.setor}`}</div>

              <div className="text-sm">{`Data: ${selectedItem.data}`}</div>

              <div className="text-sm">{`Hora de Abertura: ${formatarHora(
                selectedItem.hora_start
              )}`}</div>

              <div className="text-sm">{`Hora de Fechamento: ${formatarHora(
                selectedItem.end
              )}`}</div>
              
              <h4 className="pt-1">Observações</h4>

              <div className="text-sm">{`Observação do Usuário: ${
                selectedItem.user || 'N/A'
              }`}</div>

              <div className="text-sm">{`Observação do Sistema: ${
                selectedItem.sistema || 'N/A'
              }`}</div>

              <h4 className="pt-1">Informações do Operador</h4>

              <div className="text-sm">{`Email do Operador: ${
                selectedItem.email_operador || 'N/A'
              }`}</div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog; // Exporta o componente DetailsDialog
