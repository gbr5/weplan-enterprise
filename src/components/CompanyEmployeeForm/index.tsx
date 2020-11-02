import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErros';

import Input from '../Input';
import WindowContainer from '../WindowContainer';

import api from '../../services/api';
import avatarPlaceholder from '../../assets/avatar_placeholder_cat2.jpeg';

import { Container, FirstRow, SecondRow, AddButton } from './styles';
import { useAuth } from '../../hooks/auth';

interface IEmployeeUserPersonInfoDTO {
  id: string;
  first_name: string;
  last_name: string;
  person_id: string;
}

interface IUserEmployeeDTO {
  id: string;
  name: string;
}

interface IEmployeeForm {
  position: string;
  access_key: string;
  password: string;
  title: string;
  email: string;
  message: string;
}

interface IPropsDTO {
  userEmployee: IUserEmployeeDTO;
  onHandleCloseWindow: MouseEventHandler;
  getEmployees: Function;
}

const CompanyEmployeeForm: React.FC<IPropsDTO> = ({
  onHandleCloseWindow,
  getEmployees,
  userEmployee,
}: IPropsDTO) => {
  const { addToast } = useToast();
  const { company } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const [employeeUserInfo, setEmployeeUserInfo] = useState(
    {} as IEmployeeUserPersonInfoDTO,
  );

  const inputHeight = { height: '40px' };

  const handleSubmit = useCallback(
    async (data: IEmployeeForm) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          position: Yup.string().required('Cargo é obrigatório'),
          access_key: Yup.string().required('Chave de acesso é obrigatório.'),
          password: Yup.string().required('A senha deve conter 6 dígitos.'),
          title: Yup.string().required('Título da mensagem é obrigatório.'),
          email: Yup.string().required('Email é obrigatório.'),
          message: Yup.string().required('Mensagem é obrigatório.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(`supplier-employees/${company.id}/${userEmployee.id}`, {
          position: data.position,
          access_key: data.access_key,
          password: data.password,
          title: data.title,
          email: data.email,
          message: data.message,
        });

        addToast({
          type: 'success',
          title: 'Colaborador adicionado com sucesso',
          description:
            'Lembre-se de ativar-lo e conceder os devidos acesso aos módulos de gestão.',
        });
        getEmployees();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao adicionar colaborador',
          description: 'Erro ao adicionar colaborador, tente novamente.',
        });
        throw new Error(err);
      }
    },
    [addToast, getEmployees, userEmployee, company],
  );

  const getEmployeePersonInfo = useCallback(() => {
    try {
      api
        .get<IEmployeeUserPersonInfoDTO>(`person-info/${userEmployee.id}`)
        .then(response => {
          setEmployeeUserInfo(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [userEmployee.id]);

  useEffect(() => {
    getEmployeePersonInfo();
  }, [getEmployeePersonInfo]);

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 20,
        top: '5%',
        left: '15%',
        height: '90%',
        width: '70%',
      }}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Container>
          <h2>Adicionar Colaborador</h2>
          <div>
            <FirstRow>
              <img src={avatarPlaceholder} alt="WePlanPRO Company Employee" />
              <div>
                <span>
                  <strong>Nome de Usuário</strong>
                  <p>{userEmployee.name}</p>
                </span>
                <span>
                  <strong>Nome</strong>
                  <span>
                    <p>{employeeUserInfo.first_name}</p>
                    <p>{employeeUserInfo.last_name}</p>
                  </span>
                </span>
                <span>
                  <strong>CPF</strong>
                  <p>{employeeUserInfo.person_id}</p>
                </span>
              </div>
            </FirstRow>
            <SecondRow>
              <span>
                <div>
                  <p>Cargo</p>
                  <Input name="position" containerStyle={inputHeight} />
                </div>
                <div>
                  <p>Título da Mensagem</p>
                  <Input name="title" containerStyle={inputHeight} />
                </div>
                <div>
                  <p>Mensagem</p>
                  <Input name="message" containerStyle={inputHeight} />
                </div>
              </span>
              <span>
                <div>
                  <p>Chave de acesso</p>
                  <Input
                    placeholder="Controle master do perfil. Não compartilhe esta chave!"
                    name="access_key"
                    containerStyle={inputHeight}
                  />
                </div>
                <div>
                  <p>Email</p>
                  <Input
                    placeholder="Login do colaborador"
                    name="email"
                    containerStyle={inputHeight}
                  />
                </div>
                <div>
                  <p>Senha</p>
                  <Input
                    placeholder="Senha do colaborador"
                    name="password"
                    containerStyle={inputHeight}
                  />
                  {/* <Input
                      name="password_confirmation"
                      placeholder="Confirme a sua senha"
                      containerStyle={inputHeight}
                    /> */}
                </div>
              </span>
            </SecondRow>
          </div>
          <AddButton type="submit">Adicionar Colaborador</AddButton>
        </Container>
      </Form>
    </WindowContainer>
  );
};

export default CompanyEmployeeForm;
