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

// Função para formatar a hora no formato hh:mm
const formatarHora = (hora) => {
  const horaObj = new Date(`1970-01-01T${hora}`);
  const horas = String(horaObj.getHours()).padStart(2, '0'); // Obtém a hora
  const minutos = String(horaObj.getMinutes()).padStart(2, '0'); // Obtém os minutos

  return `${horas}:${minutos}`; // Retorna a hora formatada
};

// Função para calcular o tempo de atendimento
const calcularTempoAtendimento = (horaInicio, horaFim) => {
  // Verifica se a hora de término é nula
  if (!horaFim) {
    return 'Ainda em atendimento'; // Retorna uma mensagem indicando que o atendimento ainda está em andamento
  }

  // Converte as strings de hora em objetos Date
  const horaInicioObj = new Date(`1970-01-01T${horaInicio}`);
  const horaFimObj = new Date(`1970-01-01T${horaFim}`);

  // Calcula a diferença em milissegundos entre as horas de término e início
  const diferencaMs = horaFimObj - horaInicioObj;

  // Calcula o tempo em horas, minutos e segundos
  const horas = Math.floor(diferencaMs / (1000 * 60 * 60));
  const minutos = Math.floor((diferencaMs % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencaMs % (1000 * 60)) / 1000);

  // Retorna o tempo formatado
  return `${horas} horas, ${minutos} minutos, ${segundos} segundos`;
};

// Componente de diálogo para exibir os detalhes do item selecionado
const DetailsDialog = ({ isOpen, onClose, selectedItem }) => {
  return (
    // Diálogo do Material-UI com propriedades de abertura e fechamento
    <Dialog open={isOpen} onClose={onClose} className="text-lg">
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
            <div>{`Hora de Abertura: ${formatarHora(
              selectedItem.hora_start
            )}`}</div>
            <div>{`Nome: ${selectedItem.nome}`}</div>
            <div>{`CPF/CNPJ: ${selectedItem.cpfCnpj || 'N/A'}`}</div>
            <div>{`Telefone Cliente: ${selectedItem.numero}`}</div>
            <div>{`Email: ${selectedItem.email}`}</div>
            <div>{`Tipo de Atendimento: ${selectedItem.atendimento}`}</div>
            <div>{`Setor: ${selectedItem.setor}`}</div>
            <div>{`Status do Protocolo: ${selectedItem.status}`}</div>
            <div>{`Observação do Usuário: ${selectedItem.user || 'N/A'}`}</div>
            <div>{`Observação do Sistema: ${
              selectedItem.sistema || 'N/A'
            }`}</div>
            <div>{`Tempo de Atendimento: ${calcularTempoAtendimento(
              selectedItem.hora_start,
              selectedItem.hora_end
            )}`}</div>
            <div>{`Nome Fantasia: ${selectedItem.fantasia || 'N/A'}`}</div>
            <div>{`Hora de Fechamento: ${formatarHora(selectedItem.end)}`}</div>
            <div>{`ID da Conversa: ${selectedItem.conversation || 'N/A'}`}</div>
            <div>{`ID do Operador: ${selectedItem.iuser || 'N/A'}`}</div>
            <div>{`Email do Operador: ${selectedItem.eoperador || 'N/A'}`}</div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog; // Exporta o componente DetailsDialog
