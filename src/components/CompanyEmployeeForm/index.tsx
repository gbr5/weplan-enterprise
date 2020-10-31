import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
// import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useToast } from '../../hooks/toast';

import Input from '../Input';
import WindowContainer from '../WindowContainer';
import AddEmployeeModulesWindow from '../AddEmployeeModulesWindow';

import api from '../../services/api';
import avatarPlaceholder from '../../assets/avatar_placeholder_cat2.jpeg';

import {
  Container,
  FirstRow,
  SecondRow,
  BooleanButton,
  AddButton,
  ModulesContainer,
} from './styles';
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
  const { company, modules } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const [modulesWindow, setModulesWindow] = useState(false);
  const [addModulesWindow, setAddModulesWindow] = useState(false);
  const [moduleName, setModuleName] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  const handleModulesWindow = useCallback((props: string) => {
    setModuleName(props);
    setModulesWindow(true);
  }, []);

  const [employeeUserInfo, setEmployeeUserInfo] = useState(
    {} as IEmployeeUserPersonInfoDTO,
  );

  const inputHeight = { height: '40px' };

  const handleSubmit = useCallback(
    async (data: IEmployeeForm) => {
      try {
        const newEmployee = await api.post(
          `supplier-employees/${company.id}/${userEmployee.id}`,
          {
            position: data.position,
            access_key: data.access_key,
            password: data.password,
            title: data.title,
            message: data.message,
          },
        );
        const newEmployeeId = newEmployee.data.id;
        setEmployeeId(newEmployeeId);

        addToast({
          type: 'success',
          title: 'Colaborador adicionado com sucesso',
          description:
            'As informações do seu dashboard de colaboradores já foram atualizadas.',
        });
        getEmployees();
        setAddModulesWindow(true);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao adicionar membro da festa',
          description: 'Erro ao adicionar membro da festa, tente novamente.',
        });
        throw new Error(err);
      }
    },
    [addToast, getEmployees, userEmployee, company],
  );

  const handleCloseModulesWindow = useCallback(() => {
    setModulesWindow(false);
  }, []);

  const getEmployeePersonInfo = useCallback(() => {
    try {
      api.get<IEmployeeUserPersonInfoDTO>('person-info').then(response => {
        setEmployeeUserInfo(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    getEmployeePersonInfo();
  }, [getEmployeePersonInfo]);

  return (
    <>
      {modulesWindow && (
        <AddEmployeeModulesWindow
          employeeID={employeeId}
          handleCloseWindow={() => setModulesWindow(false)}
          moduleName={moduleName}
          onHandleCloseWindow={handleCloseModulesWindow}
        />
      )}
      {addModulesWindow && (
        <WindowContainer
          onHandleCloseWindow={onHandleCloseWindow}
          containerStyle={{
            zIndex: 22,
            top: '5%',
            left: '15%',
            height: '90%',
            width: '70%',
          }}
        >
          <ModulesContainer>
            <h3>Acessos</h3>
            {modules.length !== 0 ? (
              <span>
                {modules.map(xModule => (
                  <BooleanButton
                    isActive={xModule.management_module === 'omercial'}
                    type="button"
                    onClick={() =>
                      handleModulesWindow(xModule.management_module)
                    }
                    key={xModule.management_module}
                  >
                    <strong>{xModule.management_module}</strong>
                  </BooleanButton>
                ))}
              </span>
            ) : (
              <span>
                <strong>Você ainda não possui módulos de gestão</strong>
                <button type="button">Eu quero vencer!</button>
              </span>
            )}
          </ModulesContainer>
        </WindowContainer>
      )}
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
                    <p>xxx.xxx.xxx-xx</p>
                    {/* <p>{employeeUserInfo.person_id}</p> */}
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
                    <Input name="access_key" containerStyle={inputHeight} />
                  </div>
                  <div>
                    <p>Senha</p>
                    <Input name="password" containerStyle={inputHeight} />
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
    </>
  );
};

export default CompanyEmployeeForm;
