import React, { useState, useEffect } from 'react';

const ProtocolCounter = ({ totalProtocols }) => {
  // Inicializa o estado local total com 0 se totalProtocols não for fornecido ou for undefined
  const [total, setTotal] = useState(totalProtocols !== undefined ? totalProtocols : 0);

  // Atualiza o estado local quando totalProtocols mudar
  useEffect(() => {
    // Verifica se totalProtocols é definido antes de atualizar o estado
    if (totalProtocols !== undefined) {
      setTotal(totalProtocols); // Atualiza o estado local com o valor de totalProtocols
    }
  }, [totalProtocols]); // Executa o efeito apenas quando totalProtocols mudar

  return (
    <p>Total de protocolos: {total}</p>
  );
};

export default ProtocolCounter;
