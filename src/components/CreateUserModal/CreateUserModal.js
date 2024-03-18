import React from 'react';
import {
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  FormGroup,
  Label,
  Input, 
  Button, 
} from 'reactstrap'; 

// Componente CreateUserModal para criar um novo usuário
const CreateUserModal = ({
  isOpen, 
  toggle, 
  userData, 
  selectedOption, 
  handleInputChange, 
  handleOptionChange, 
  handleSaveUser, 
  handleCancel, 
}) => {


  return (

    <Modal isOpen={isOpen} toggle={toggle}> {/* Modal com estado de abertura e função de toggle */}
      <ModalHeader toggle={toggle}> {/* Cabeçalho do modal com título e função de toggle */}
        Criar Novo Usuário
      </ModalHeader>
      <ModalBody> {/* Corpo do modal */}
        <FormGroup> {/* Grupo de formulário para o campo de nome */}
          <Label for="nome">Nome:</Label> {/* Rótulo para o campo de nome */}
          <Input
            type="text"
            id="nome"
            value={userData.nome} // Valor do campo de nome
            onChange={handleInputChange} // Função de callback para lidar com a mudança no campo de nome
          />
        </FormGroup>
        <FormGroup> {/* Grupo de formulário para o campo de email */}
          <Label for="email">Email:</Label> {/* Rótulo para o campo de email */}
          <Input
            type="email"
            id="email"
            value={userData.email} // Valor do campo de email
            onChange={handleInputChange} // Função de callback para lidar com a mudança no campo de email
          />
        </FormGroup>
        <FormGroup> {/* Grupo de formulário para o campo de senha */}
          <Label for="senha">Senha:</Label> {/* Rótulo para o campo de senha */}
          <Input
            type="password"
            id="senha"
            value={userData.senha} // Valor do campo de senha
            onChange={handleInputChange} // Função de callback para lidar com a mudança no campo de senha
          />
        </FormGroup>
        <FormGroup> {/* Grupo de formulário para o seletor de nível de acesso */}
          <Label for="seletor">Nível de Acesso:</Label> {/* Rótulo para o seletor de nível de acesso */}
          <Input
            type="select"
            id="seletor"
            value={selectedOption} // Valor da opção selecionada para o nível de acesso
            onChange={handleOptionChange} // Função de callback para lidar com a mudança na opção selecionada
          >
            {/* Opções para o seletor de nível de acesso */}
            <option value="opcao1">Atendente</option>
            <option value="opcao2">Supervisor</option>
            <option value="opcao3">Fiscal</option>
            <option value="opcao4">Administrador</option>
          </Input>
        </FormGroup>
      </ModalBody>
      <ModalFooter> {/* Rodapé do modal */}
        <Button color="success" onClick={handleSaveUser}> {/* Botão para salvar o usuário */}
          Salvar
        </Button>
        <Button color="secondary" onClick={handleCancel}>
          Cancelar 
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateUserModal; // Exporta o componente CreateUserModal
