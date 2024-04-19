import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col, Alert } from 'reactstrap';
import { Navigate } from 'react-router-dom';
import { login } from '../../services/authentication.js';
import LoadingIndicator from 'components/Loading/Loading.js';
import UserModel from '../../services/UserModel.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // Adicione o estado para controlar o estado de login

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // Verificar se os campos de email e senha estão preenchidos
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      setLoading(true);
  
     
  
      // Fazer o login e obter os dados do usuário
      const { accessToken, userId, role } = await login(email, password);

  
      // Criar uma instância do UserModel com o token e o ID de usuário
      const userModel = new UserModel(accessToken, userId);
  
      // Armazenar o modelo de usuário no localStorage
      localStorage.setItem('userModel', JSON.stringify(userModel));
      localStorage.setItem('userRole', role);

  
      // Atualiza o estado de login para true
      setLoggedIn(true);
    } catch (error) {
      console.error('Erro durante a autenticação:', error.message);
      setError('Credenciais inválidas. Por favor, verifique seu email e senha.');
    } finally {
      setLoading(false);
    }
  };

  // Se o usuário estiver logado, redirecione-o para a rota adequada
  if (loggedIn) {
    const userRole = localStorage.getItem('userRole');
    switch (userRole) {
      case 'ADMIN':
        return <Navigate to="/admin/protocolos" />;
      case 'ATENDENTE':
        return <Navigate to="/admin/ticket-service" />;
      case 'FISCAL':
        return <Navigate to="/admin/fiscalizacao" />;
      default:
        return <Navigate to="/index" />;
    }
  }

  return (
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent pb-4">
          <div className="text-muted text-center mt-3">
            <img alt="..." src={require('../../assets/img/logoCrt.png')} />
          </div>
        </CardHeader>
        <CardBody className="px-lg-5 py-lg-3">
          {error && <Alert color="danger">{error}</Alert>}
          <div className="text-center text-lg mb-4">
            <small>Entre com Email e Senha</small>
          </div>
          <Form role="form" onSubmit={handleLoginSubmit}>
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Email"
                  type="email"
                  autoComplete="new-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <div className="text-center">
              <Button
                className="my-4"
                color="primary"
                type="submit"
                disabled={loading}
              >
                Entrar
              </Button>
              {loading && <LoadingIndicator />}
            </div>
          </Form>
        </CardBody>
      </Card>
      <Row className="mt-3">{/* esqueceu a senha  */}</Row>
    </Col>
  );
};

export default Login;
