import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Alert,
} from 'reactstrap';
import { login } from 'services/authentication.js'; // Importa a função de login do serviço de autenticação
import LoadingIndicator from 'components/Loading/Loading.js'; // Importa o indicador de carregamento

const Login = () => {
  // Estados para armazenar o email, senha, estado de carregamento, mensagens de erro e estado de autenticação
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Função para lidar com a submissão do formulário de login
  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // Evita o comportamento padrão de submissão do formulário

    // Verifica se o email e a senha foram fornecidos
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      setLoading(true); // Define o estado de carregamento como verdadeiro durante a autenticação

      // Chama a função de login com o email e a senha fornecidos
      const userData = await login(email, password);

      // Verifica se o login foi bem-sucedido
      if (userData) {
        setIsLoggedIn(true); // Define o estado de autenticação como verdadeiro
      }
    } catch (error) {
      console.error('Erro durante a autenticação:', error.message);
      setError(
        'Credenciais inválidas. Por favor, verifique seu email e senha.'
      );
    } finally {
      setLoading(false); // Define o estado de carregamento como falso após a conclusão da autenticação
    }
  };

  // Efeito para redirecionar para a página inicial após o login bem-sucedido
  useEffect(() => {
    if (isLoggedIn) {
      // Redireciona para a página inicial após o login bem-sucedido
      window.location.href = '/index'; 
    }
  }, [isLoggedIn]);

  // Componente de interface de usuário para o formulário de login
  return (
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent pb-4">
          <div className="text-muted text-center mt-3">
            <img alt="logo crtba" src={require('assets/img/logoCrt.png')} />
          </div>
        </CardHeader>
        <CardBody className="px-lg-5 py-lg-3">
          {error && <Alert color="danger">{error}</Alert>} {/* Exibe a mensagem de erro, se houver */}
          <div className="text-center text-lg mb-4">
            <small>Entre com Email e Senha</small>
          </div>
          <Form role="form" onSubmit={handleLoginSubmit}> {/* Formulário de login */}
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
                  placeholder="Senha"
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
              {loading && <LoadingIndicator />} {/* Exibe o indicador de carregamento, se estiver carregando */}
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Login;