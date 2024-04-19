import React, { useState } from 'react';
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


import { createUser, updateUser } from '../../services/Requests'; // Importa as funções createUser e updateUser

const UserModal = ({
  isOpen,
  toggle,
  userData,
  handleInputChange,
  handleCancel, 
  isEditMode,
  setLoading,
  fetchUsers,
  userId
}) => {
  const { name, email, password, role } = userData || {};
  const [formValid, setFormValid] = useState(false); // Estado para controlar a validade do formulário

  // Função para lidar com a validação do formulário
  const validateForm = () => {
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (name && email && role) {
      setFormValid(true); // Define o formulário como válido se todos os campos obrigatórios estiverem preenchidos
    } else {
      setFormValid(false); // Define o formulário como inválido se algum campo obrigatório estiver vazio
    }
  };

  // Função para lidar com a alteração dos campos de entrada
  const handleInputChanged = (e) => {
    handleInputChange(e); // Atualiza o estado dos dados do usuário conforme o campo de entrada é alterado
    validateForm(); // Valida o formulário sempre que um campo de entrada é alterado
  };

  // Função para lidar com o salvamento do usuário
  const handleSaveUser = async (event) => {
    event.preventDefault();
  
    try {
      const updatedUserData = { ...userData }; // Clona os dados do usuário
  
      // Verifica se está em modo de edição e se existe um userId válido
      if (isEditMode && userId) {
        // Chama a função updateUser com o userId e os dados atualizados do usuário
        await updateUser(userId, updatedUserData);
        // Recarrega a lista de usuários após a atualização bem-sucedida
        setLoading(true);
        await fetchUsers();
        setLoading(false);
        toggle(); // Fecha o modal após a atualização do usuário
      } else {
        // Se não estiver em modo de edição ou não houver userId, trata como criação de usuário
        await createUser(updatedUserData);
        // Recarrega a lista de usuários após a criação bem-sucedida
        setLoading(true);
        await fetchUsers();
        setLoading(false);
        toggle(); // Fecha o modal após a criação do usuário
      }
    } catch (error) {
      console.error('Erro ao salvar usuário:', error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="shadow">
      <ModalHeader toggle={toggle}>
        {isEditMode ? 'Editar Usuário' : 'Criar Novo Usuário'}
      </ModalHeader>
      <form onSubmit={handleSaveUser}>
        <ModalBody>
          {/* Campos de entrada */}
          <FormGroup>
            <Label for="name">Nome:</Label>
            <Input
              type="text"
              id="name"
            
              value={name || ''}
              onChange={handleInputChanged} // Alterado para chamar handleInputChanged
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email:</Label>
            <Input
              type="email"
              id="email"
              autoComplete="username"
              value={email || ''}
              onChange={handleInputChanged} // Alterado para chamar handleInputChanged
              disabled={isEditMode} // Adicione esta linha

            />
          </FormGroup>
          {!isEditMode && (
            <FormGroup>
              <Label for="password">Senha:</Label>
              <Input
                type="password"
                id="password"
                autoComplete="current-password"
                value={password || ''}
                onChange={handleInputChanged} // Alterado para chamar handleInputChanged
              />
            </FormGroup>
          )}
          {isEditMode && (
            <FormGroup>
              <Label for="newpassword">Nova Senha:</Label>
              <Input
                type="password"
                id="password"
                value={password || ''}
                onChange={handleInputChanged} // Alterado para chamar handleInputChanged
              />
            </FormGroup>
          )}
          <FormGroup>
            <Label for="role">Nível de Acesso:</Label>
            <Input
              type="select"
              id="role"
              value={role || ''}
              onChange={handleInputChanged} // Alterado para chamar handleInputChanged
            >
              <option value="">Selecione uma opção</option>
              <option value="ATENDENTE">Atendente</option>
              <option value="RECEPCAO">Recepção</option>
              <option value="SUPERVISOR">Supervisor</option>
              <option value="FISCAL">Fiscal</option>
              <option value="ASSISTENTE">Assistente</option>
              <option value="ADMIN">Administrador</option>
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          {/* O botão de envio agora é habilitado somente quando o formulário é válido */}
          <Button color="success" type="submit" disabled={!formValid}>
            {isEditMode ? 'Salvar' : 'Criar'}
          </Button>
          <Button color="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default UserModal;
