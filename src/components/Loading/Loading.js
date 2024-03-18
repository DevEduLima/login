import React from 'react'; // Importa o módulo React
import { Spinner } from 'reactstrap'; // Importa o componente Spinner do Reactstrap

// Componente LoadingIndicator para exibir um indicador de carregamento
const LoadingIndicator = ({ size = 'md', color = 'primary' }) => {
  // Define o componente com propriedades opcionais de tamanho e cor
  return (
    <div className="d-flex justify-content-center align-items-center">
       
      {/* Div para centralizar e alinhar o conteúdo verticalmente */}
      <Spinner size={size} color={color} />
      {/* Componente Spinner para exibir o indicador de carregamento */}
    </div>
  );
};

export default LoadingIndicator;
