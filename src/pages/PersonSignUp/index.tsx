import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Content,
  AnimationContainer,
  Background,
  QuestionTitle,
  ToggleButton,
} from './styles';

interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

interface IContactInfo {
  contact_info: string;
}

interface IPersonUser {
  person_id: string;
  first_name: string;
  last_name: string;
}

const PersonSignUp: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [options, setOptions] = useState(true);
  const [personInfo, setPersonInfo] = useState(false);
  const [contactInfo, setContactInfo] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmitContactInfo = useCallback(
    async (data: IContactInfo) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          contact_info: Yup.string().required('número é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(`/profile/contact-info/add/${userId}`, {
          contact_info: data.contact_info,
          contact_type: 'phone',
        });
        setUserId('');
        addToast({
          type: 'success',
          title: 'Cadastro completo!',
          description:
            'Bem vindo(a) ao WePlan! Você será encaminhado para o cadastro de empresas.',
        });

        history.push('/');
        setContactInfo(false);
        setOptions(true);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
        });
      }
    },
    [addToast, userId, history],
  );

  const handleSubmitPersonInfo = useCallback(
    async (data: IPersonUser) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          person_id: Yup.string().required('CNPJ é obrigatório'),
          first_name: Yup.string().required('Nome é obrigatório'),
          last_name: Yup.string().required('Sobrenome é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/person-info', {
          person_id: data.person_id,
          first_name: data.first_name,
          last_name: data.last_name,
          user_id: userId,
        });
        setPersonInfo(false);
        setContactInfo(true);

        addToast({
          type: 'success',
          title: 'Informações salvas com sucesso!',
          description: 'Falta só mais uma etapa!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
        });
      }
    },
    [addToast, userId],
  );

  const handleSubmit = useCallback(
    async (data: SignUpForm) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Mínimo de 6 dígitos'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'As senhas devem ser iguais.',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const validatedData = {
          name: data.name,
          email: data.email,
          password: data.password,
          isCompany: false,
        };

        const response = await api.post('/users', validatedData);
        setUserId(response.data.id);

        setOptions(false);
        setPersonInfo(true);

        addToast({
          type: 'success',
          title: 'Usuário cadastrado com sucesso!',
          description: 'Vamos precisar só mais algumas informações.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
        });
      }
    },
    [addToast],
  );

  const containerStyle = {
    width: '100%',
    height: '40px',
  };

  return (
    <Container>
      <ToggleButton>
        <h3>Cadastro</h3>
        <Link to="/">
          <h2>Login</h2>
        </Link>
      </ToggleButton>
      <Background />
      <Content>
        <AnimationContainer>
          {!!options && (
            <>
              <h1>
                WePlan <strong>Enterprise</strong>
              </h1>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <div>
                  <h3>Usuário</h3> <h1>MASTER</h1>
                </div>
                <h2>Cadastro</h2>

                <Input
                  name="name"
                  icon={FiUser}
                  type="text"
                  placeholder="Nome"
                  containerStyle={containerStyle}
                />
                <Input
                  name="email"
                  icon={FiMail}
                  type="text"
                  placeholder="E-mail"
                  containerStyle={containerStyle}
                />
                <Input
                  name="password"
                  icon={FiLock}
                  type="password"
                  containerStyle={containerStyle}
                  placeholder="Senha"
                />
                <Input
                  name="password_confirmation"
                  icon={FiLock}
                  type="password"
                  placeholder="Confirme a sua senha"
                  containerStyle={containerStyle}
                />

                <Button type="submit">Cadastrar</Button>
              </Form>
              <div>
                <Link to="/signup">
                  <p>Cadastrar empresa</p>
                </Link>
                <Link to="/">Fazer login</Link>
              </div>
            </>
          )}

          {!options && !!personInfo && (
            <Form ref={formRef} onSubmit={handleSubmitPersonInfo}>
              <QuestionTitle>Dados Cadastrais</QuestionTitle>
              <div>
                <h3>Work</h3> <h1>Smart!</h1>
              </div>
              <p>Nome</p>
              <Input
                name="first_name"
                icon={FiUser}
                type="text"
                placeholder="Primeiro nome"
              />
              <p>Sobrenome</p>
              <Input
                name="last_name"
                icon={FiUser}
                type="text"
                placeholder="Sobrenome"
              />
              <p>CPF</p>
              <Input
                name="person_id"
                icon={FiUser}
                type="number"
                placeholder="CPF"
              />

              <Button type="submit">Próximo</Button>
            </Form>
          )}
          {!options && !!contactInfo && (
            <Form ref={formRef} onSubmit={handleSubmitContactInfo}>
              <QuestionTitle>Dados Cadastrais</QuestionTitle>
              <div>
                <h3>Work</h3> <h1>Smart!</h1>
              </div>
              <p>Qual o melhor telefone para contato?</p>
              <p>Pode ser até o seu whatsapp! </p>
              <Input
                name="contact_info"
                type="text"
                placeholder="Telefone com DDD"
              />

              <Button type="submit">Cadastrar</Button>
            </Form>
          )}
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default PersonSignUp;
