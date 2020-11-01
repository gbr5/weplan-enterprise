import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Content,
  AnimationContainer,
  Background,
  ToggleButton,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Bem Vindo!',
          description: 'Sua dashboard está pronta!.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credênciais.',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <ToggleButton>
        <Link to="/signup">
          <h2>Cadastro</h2>
        </Link>
        <h3>Login</h3>
      </ToggleButton>
      <Background />
      <Content>
        <AnimationContainer>
          <h1>
            WePlan <strong>Enterprise</strong>
          </h1>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <h3>Work</h3> <h1>SMART!</h1>
            </div>
            <div>
              <h2>A genialidade está na simplicidade,</h2>
            </div>
            <div>
              <h2>A excelência nos detalhes !</h2>
            </div>
            <Input
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-mail"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>
            <Link to="/forgot-password">Esqueci minha senha</Link>
          </Form>
          <div>
            <a href="https://www.weplan.pro" target="blank">
              Cadastro de Planners
            </a>
            <Link to="/signup">Cadastro de Empresas</Link>
          </div>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};
export default SignIn;
