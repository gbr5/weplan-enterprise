import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import { Container, BooleanButton } from './styles';

interface IEmployeeInfo {
  id: string;
  position: string;
  access_key: string;
  email: string;
  isActive: boolean;
  title: string;
  message: string;
  isConfirmed: boolean;
  confirmationID: string;
}

interface IFormDTO {
  position?: string;
  access_key?: string;
  email?: string;
  title?: string;
  message?: string;
  isConfirmed?: boolean;
  confirmationID?: string;
}

interface IPropsDTO {
  employeeInfo: IEmployeeInfo;
  inputName: string;
  defaultValue: string;
  type: string;
  handleCloseWindow: Function;
  onHandleCloseWindow: MouseEventHandler;
  getCompanyEmployees: Function;
}

const EditCompanyEmployeeInput: React.FC<IPropsDTO> = ({
  employeeInfo,
  inputName,
  defaultValue,
  type,
  handleCloseWindow,
  getCompanyEmployees,
  onHandleCloseWindow,
}: IPropsDTO) => {
  const { addToast } = useToast();

  const [employeeIsActive, setEmployeeIsActive] = useState(false);
  const [data, setData] = useState('');

  const handleAddEmployee = useCallback(async () => {
    try {
      if (inputName === 'position') {
        await api.put(`supplier-employees/${employeeInfo.id}`, {
          position: data,
          isActive: employeeInfo.isActive,
          email: employeeInfo.email,
        });
      }
      if (inputName === 'email') {
        await api.put(`supplier-employees/${employeeInfo.id}`, {
          position: employeeInfo.position,
          isActive: employeeInfo.isActive,
          email: data,
        });
      }
      if (inputName === 'isActive') {
        await api.put(`supplier-employees/${employeeInfo.id}`, {
          position: employeeInfo.position,
          isActive: employeeInfo.isActive,
          email: employeeInfo.email,
        });
      }
      if (inputName === 'access_key') {
        await api.put(`supplier-employees/access_key/${employeeInfo.id}`, {
          access_key: data,
        });
      }
      if (inputName === 'title') {
        await api.post(
          `supplier-employees/user/confirmation/${employeeInfo.confirmationID}`,
          {
            title: data,
            message: employeeInfo.message,
            isConfirmed: employeeInfo.isConfirmed,
          },
        );
      }
      if (inputName === 'message') {
        await api.post(
          `supplier-employees/user/confirmation/${employeeInfo.confirmationID}`,
          {
            title: employeeInfo.title,
            message: data,
            isConfirmed: employeeInfo.isConfirmed,
          },
        );
      }

      addToast({
        type: 'success',
        title: 'Colaborador editado com sucesso',
        description: 'As ĩnformações já foram atualizadas.',
      });
      getCompanyEmployees();
      handleCloseWindow();
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao adicionar membro da festa',
        description: 'Erro ao adicionar membro da festa, tente novamente.',
      });
    }
  }, [
    addToast,
    handleCloseWindow,
    getCompanyEmployees,
    inputName,
    employeeInfo,
    data,
  ]);

  const handleEmployeeActivation = useCallback(
    async (props: boolean) => {
      try {
        await api.put(`supplier-employees/${employeeInfo.id}`, {
          position: employeeInfo.position,
          isActive: props,
          email: employeeInfo.email,
        });
        addToast({
          type: 'success',
          title: 'Colaborador editado com sucesso',
          description: 'As ĩnformações já foram atualizadas.',
        });
        getCompanyEmployees();
        handleCloseWindow();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao adicionar membro da festa',
          description: 'Erro ao adicionar membro da festa, tente novamente.',
        });
        throw new Error(err);
      }
    },
    [employeeInfo, addToast, handleCloseWindow, getCompanyEmployees],
  );

  const default_value = type === 'string' ? defaultValue : Number(defaultValue);

  useEffect(() => {
    if (inputName === 'isActive' && defaultValue === 'true') {
      setEmployeeIsActive(true);
    } else {
      setEmployeeIsActive(false);
    }
  }, [defaultValue, inputName]);

  return (
    <Container>
      {inputName === 'isActive' ? (
        <>
          <BooleanButton
            type="button"
            isActive={employeeIsActive}
            onClick={() => handleEmployeeActivation(true)}
          >
            Ativo
          </BooleanButton>
          <BooleanButton
            type="button"
            isActive={!employeeIsActive}
            onClick={() => handleEmployeeActivation(false)}
          >
            Desativado
          </BooleanButton>
        </>
      ) : (
        <div>
          <input
            defaultValue={default_value}
            onChange={e => setData(e.target.value)}
          />
          <button type="button" onClick={handleAddEmployee}>
            Salvar
          </button>
          <button type="button" onClick={onHandleCloseWindow}>
            Cancelar
          </button>
        </div>
      )}
    </Container>
  );
};

export default EditCompanyEmployeeInput;
