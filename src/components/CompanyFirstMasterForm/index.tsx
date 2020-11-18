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

interface IMasterUserPersonInfoDTO {
  id: string;
  first_name: string;
  last_name: string;
  person_id: string;
}

interface IUserMasterDTO {
  id: string;
  name: string;
}

interface IMasterForm {
  password: string;
  email: string;
}

interface IPropsDTO {
  userMaster: IUserMasterDTO;
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  getMasters: Function;
  company_id: string;
}

const CompanyFirstMasterForm: React.FC<IPropsDTO> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  getMasters,
  userMaster,
  company_id,
}: IPropsDTO) => {
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const [employeeUserInfo, setMasterUserInfo] = useState(
    {} as IMasterUserPersonInfoDTO,
  );

  const inputHeight = { height: '40px' };

  const handleSubmit = useCallback(
    async (data: IMasterForm) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          password: Yup.string().required('A senha deve conter 6 dígitos.'),
          email: Yup.string().required('Email é obrigatório.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(`suppliers/master/user/${company_id}/${userMaster.id}`, {
          password: data.password,
          email: data.email,
        });
        getMasters();
        handleCloseWindow();
        addToast({
          type: 'success',
          title: 'Usuário master adicionado com sucesso',
          description:
            'Lembre-se de adicionar-lo como colaborador para conceder os devidos acessos aos módulos de gestão.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao adicionar usuário master',
          description: 'Erro ao adicionar usuário master, tente novamente.',
        });
        throw new Error(err);
      }
    },
    [addToast, getMasters, userMaster, company_id, handleCloseWindow],
  );

  const getMasterPersonInfo = useCallback(() => {
    try {
      api
        .get<IMasterUserPersonInfoDTO>(`person-info/${userMaster.id}`)
        .then(response => {
          setMasterUserInfo(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [userMaster.id]);

  useEffect(() => {
    getMasterPersonInfo();
  }, [getMasterPersonInfo]);

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 2000,
        top: '5%',
        left: '15%',
        height: '90%',
        width: '70%',
      }}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Container>
          <h2>Adicionar Master</h2>
          <div>
            <FirstRow>
              <img src={avatarPlaceholder} alt="WePlanPRO Company Master" />
              <div>
                <span>
                  <strong>Nome de Usuário</strong>
                  <p>{userMaster.name}</p>
                </span>
                <span>
                  <strong>Nome</strong>
                  <span>
                    <p>{employeeUserInfo.first_name}</p>
                    <p>{employeeUserInfo.last_name}</p>
                  </span>
                </span>
              </div>
            </FirstRow>
            <SecondRow>
              <span>
                <div>
                  <p>Email</p>
                  <Input
                    placeholder="Login do usuário master"
                    name="email"
                    containerStyle={inputHeight}
                  />
                </div>
                <div>
                  <p>Senha</p>
                  <Input
                    placeholder="Senha do usuário master"
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
          <AddButton type="submit">Adicionar Master</AddButton>
        </Container>
      </Form>
    </WindowContainer>
  );
};

export default CompanyFirstMasterForm;
