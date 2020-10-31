import React, { MouseEventHandler, useCallback, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import IUserDTO from '../../dtos/IUserDTO';
import api from '../../services/api';
import CompanyEmployeeForm from '../CompanyEmployeeForm';
import WindowContainer from '../WindowContainer';

import { Container, InputContainer, ToggleRow } from './styles';

interface IPropsDTO {
  onHandleCloseWindow: MouseEventHandler;
  getEmployees: Function;
}

const AddEmployeeWindow: React.FC<IPropsDTO> = ({
  onHandleCloseWindow,
  getEmployees,
}: IPropsDTO) => {
  const [users, setUsers] = useState<IUserDTO[]>([]);
  const [addEmployeeFormWindow, setAddEmployeeFormWindow] = useState(false);
  const [userEmployee, setUserEmployee] = useState<IUserDTO>({} as IUserDTO);

  const handleSelectUser = useCallback(
    (props: IUserDTO) => {
      if (userEmployee.id === undefined) {
        setUserEmployee(props);
      } else {
        setUserEmployee({} as IUserDTO);
      }
    },
    [userEmployee],
  );

  const handleGetUsers = useCallback((props: string) => {
    try {
      api.get<IUserDTO[]>(`/users?name=${props}`).then(response => {
        const allUsers = response.data.filter(thisUser => !thisUser.isCompany);
        setUsers(allUsers);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  const handleAddEmployee = useCallback(async () => {
    setAddEmployeeFormWindow(true);
  }, []);

  return (
    <>
      {addEmployeeFormWindow && (
        <CompanyEmployeeForm
          getEmployees={getEmployees}
          onHandleCloseWindow={onHandleCloseWindow}
          userEmployee={userEmployee}
        />
      )}
      <WindowContainer
        onHandleCloseWindow={onHandleCloseWindow}
        containerStyle={{
          top: '5%',
          left: '20%',
          height: '90%',
          width: '60%',
          zIndex: 15,
        }}
      >
        <Container>
          <h1>Adicionar Colaborador</h1>
          <InputContainer>
            <h2>Buscar</h2>
            <input onChange={e => handleGetUsers(e.target.value)} />
            <MdSearch size={30} />
          </InputContainer>
          <ul>
            {users.map(thisUser => (
              <ToggleRow
                isActive={thisUser.id === userEmployee.id}
                key={thisUser.id}
              >
                <h2>{thisUser.name}</h2>
                {userEmployee.id !== thisUser.id ? (
                  <button
                    type="button"
                    onClick={() => handleSelectUser(thisUser)}
                  >
                    Selecionar
                  </button>
                ) : (
                  <span>
                    <button
                      type="button"
                      onClick={() => handleSelectUser(thisUser)}
                    >
                      Selecionado
                    </button>
                  </span>
                )}
              </ToggleRow>
            ))}
          </ul>
          {userEmployee.id !== '' && (
            <button type="button" onClick={handleAddEmployee}>
              Selecionar usuário
            </button>
          )}
        </Container>
      </WindowContainer>
    </>
  );
};

export default AddEmployeeWindow;
