import React, { MouseEventHandler, useCallback, useState } from 'react';
import { useToast } from '../../hooks/toast';

import WindowContainer from '../WindowContainer';

import api from '../../services/api';

import { Container, BooleanButton } from './styles';

interface IPropsDTO {
  employeeID: string;
  moduleName: string;
  moduleID?: string;
  moduleAccessLevel: number;
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
}

const EditEmployeeModulesWindow: React.FC<IPropsDTO> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  employeeID,
  moduleName,
  moduleAccessLevel,
  moduleID,
}: IPropsDTO) => {
  const { addToast } = useToast();

  const [accessLevel, setAccessLevel] = useState(0);

  const handleDeleteModule = useCallback(async () => {
    try {
      if (moduleAccessLevel !== 0 && moduleID) {
        await api.delete(`user/modules/${moduleID}`);

        addToast({
          type: 'success',
          title: 'Acesso removido com sucesso',
          description: 'As informações do colaborador já foram atualizadas.',
        });
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao remover acesso',
        description: `Erro ao remover acesso ao módulo ${moduleName}, tente novamente.`,
      });
      throw new Error(err);
    }
  }, [moduleAccessLevel, moduleID, addToast, moduleName]);

  const handleSubmit = useCallback(async () => {
    try {
      if (moduleAccessLevel !== 0 && moduleID) {
        await api.put(`user/modules/${moduleID}`, {
          access_level: accessLevel,
        });

        addToast({
          type: 'success',
          title: 'Acesso editado com sucesso',
          description: 'As informações do colaborador já foram atualizadas.',
        });
      } else {
        await api.post('user/modules/', {
          user_id: employeeID,
          management_module: moduleName,
          access_level: accessLevel,
        });

        addToast({
          type: 'success',
          title: 'Acesso editado com sucesso',
          description: 'As informações do colaborador já foram atualizadas.',
        });
      }
      handleCloseWindow();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao adicionar módulo',
        description: 'Erro ao adicionar membro da festa, tente novamente.',
      });
      throw new Error(err);
    }
  }, [
    addToast,
    employeeID,
    moduleName,
    moduleAccessLevel,
    moduleID,
    handleCloseWindow,
    accessLevel,
  ]);

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 25,
        top: '30%',
        left: '30%',
        height: '70%',
        width: '70%',
      }}
    >
      <Container>
        <h2>Conceder acesso ao colaborador</h2>
        <div>
          <p>Qual o nível de acesso?</p>
          <span>
            <BooleanButton
              type="button"
              isActive={accessLevel === 1}
              onClick={() => setAccessLevel(1)}
            >
              Global
            </BooleanButton>
            <BooleanButton
              type="button"
              isActive={accessLevel === 2}
              onClick={() => setAccessLevel(2)}
            >
              Equipe
            </BooleanButton>
            <BooleanButton
              type="button"
              isActive={accessLevel === 3}
              onClick={() => setAccessLevel(3)}
            >
              Individual
            </BooleanButton>
            <BooleanButton
              type="button"
              isActive={accessLevel === 0}
              onClick={handleDeleteModule}
            >
              Retirar acesso
            </BooleanButton>
          </span>
          <button type="button" onClick={handleSubmit}>
            Salvar
          </button>
        </div>
      </Container>
    </WindowContainer>
  );
};

export default EditEmployeeModulesWindow;
