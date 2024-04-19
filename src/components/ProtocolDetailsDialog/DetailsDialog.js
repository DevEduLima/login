import React from 'react';
import { Dialog, DialogTitle, DialogContent, Divider } from '@mui/material';

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
const calcularTempoAtendimento = (horaInicio, horaFim, statusProtocolo) => {
  // Verifica se o status do protocolo é "Fechado" (ou qualquer outro status que indique conclusão)
  if (statusProtocolo && statusProtocolo.toLowerCase() === 'fechado') {
    // Se o status do protocolo for "Fechado" e houver uma hora de término, calcula o tempo de atendimento
    if (horaFim) {
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
    } else {
      // Se não houver uma hora de término, retorna "Ainda em atendimento"
      return 'Atendimento concluído';
    }
  } else {
    // Se o status do protocolo não for "Fechado", retorna "Ainda em atendimento"
    return 'Ainda em atendimento';
  }
};


// Componente de diálogo para exibir os detalhes do item selecionado
const DetailsDialog = ({ isOpen, onClose, selectedItem }) => {
  return (
    // Diálogo do Material-UI com propriedades de abertura e fechamento
    <Dialog open={isOpen} onClose={onClose} className="text-lg">
      {/* Título do diálogo */}
      <DialogTitle className="text-center py-2">
        Detalhes do Protocolo{' '}
      </DialogTitle>
      <Divider/>
      {/* Conteúdo do diálogo */}
      <DialogContent>
        {/* Verifica se há um item selecionado */}
        {selectedItem && (
          <>
            {/* Exibe os detalhes do protocolo */}
            <div>
              <div className="text-sm">{`Codigo do Setor: ${
                selectedItem.cod_protocolo || 'N/A'
              }`}</div>
              <div className="text-sm ">{`Protocolo: ${selectedItem.protocolo}`}</div>
              <div className="text-sm">{`Status do Protocolo: ${selectedItem.status}`}</div>
              <div className="text-sm">{`ID da Conversa: ${
                selectedItem.conversation || 'N/A'
              }`}</div>
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
              <div className="text-sm">{`Data: ${formatarData(
                selectedItem.data
              )}`}</div>
              <div className="text-sm">{`Hora de Abertura: ${formatarHora(
                selectedItem.hora_start
              )}`}</div>
              <div className="text-sm">{`Hora de Fechamento: ${formatarHora(
                selectedItem.end
              )}`}</div>
              <div className="text-sm">{`Tempo de Atendimento: ${calcularTempoAtendimento(
                selectedItem.hora_start,
                selectedItem.hora_end
              )}`}</div>

              <h4 className="pt-1">Observações</h4>
              <div className="text-sm">{`Observação do Usuário: ${
                selectedItem.user || 'N/A'
              }`}</div>
              <div className="text-sm">{`Observação do Sistema: ${
                selectedItem.sistema || 'N/A'
              }`}</div>

              <h4 className="pt-1">Informações do Operador</h4>
              <div className="text-sm">{`ID do Operador: ${
                selectedItem.id_user || 'N/A'
              }`}</div>
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
