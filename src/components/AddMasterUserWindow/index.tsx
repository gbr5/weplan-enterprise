import React, { MouseEventHandler, useCallback, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import IUserDTO from '../../dtos/IUserDTO';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import WindowContainer from '../WindowContainer';

import {
  Container,
  ToggleRow,
  InputContainer,
  ButtonContainer,
} from './styles';
import logo from '../../assets/weplan.svg';

interface IPropsDTO {
  handleCloseWindow: Function;
  handleMessageWindow: Function;
  onHandleCloseWindow: MouseEventHandler;
  getMasterUsers: Function;
}

const AddMasterUserWindow: React.FC<IPropsDTO> = ({
  handleCloseWindow,
  onHandleCloseWindow,
  getMasterUsers,
  handleMessageWindow,
}: IPropsDTO) => {
  const { person, company } = useAuth();

  const [users, setUsers] = useState<IUserDTO[]>([]);
  const [masterUser, setMasterUser] = useState<IUserDTO>({} as IUserDTO);
  console.log(masterUser);

  const handleSelectUser = useCallback(
    (props: IUserDTO) => {
      if (masterUser.id === undefined) {
        setMasterUser(props);
      } else {
        setMasterUser({} as IUserDTO);
      }
    },
    [masterUser],
  );

  const handleGetUsers = useCallback(
    (props: string) => {
      try {
        api.get<IUserDTO[]>(`/users?name=${props}`).then(response => {
          const allUsers = response.data.filter(
            thisUser => thisUser.id !== person.id,
          );
          setUsers(allUsers);
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    [person],
  );

  const handleAddMasterUser = useCallback(async () => {
    console.log(company, masterUser);
    try {
      await api.post(`suppliers/master/user/${company.id}/${masterUser.id}`, {
        email: `${masterUser.name}@${masterUser.name}.com`,
        password: masterUser.name,
      });
      console.log(company, masterUser);

      getMasterUsers();
      handleMessageWindow();
      handleCloseWindow();
    } catch (err) {
      throw new Error(err);
    }
  }, [
    company,
    getMasterUsers,
    handleCloseWindow,
    handleMessageWindow,
    masterUser,
  ]);

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        top: '0%',
        left: '0%',
        height: '100%',
        width: '100%',
        zIndex: 100000,
      }}
    >
      <Container>
        <img src={logo} alt="WePlanPRO" />
        <h1>Adicionar Usuário Master</h1>
        <InputContainer>
          <h2>Buscar</h2>
          <input onChange={e => handleGetUsers(e.target.value)} />
          <MdSearch size={30} />
        </InputContainer>
        <ul>
          {users.map(thisUser => (
            <ToggleRow
              isActive={masterUser.id === thisUser.id}
              key={thisUser.id}
            >
              <h2>{thisUser.name}</h2>
              {masterUser.id !== thisUser.id ? (
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
        <ButtonContainer>
          <button type="button" onClick={handleAddMasterUser}>
            Selecionar usuário
          </button>
          <a href="https://weplan.party">Ainda não criei o usuário master</a>
        </ButtonContainer>
      </Container>
    </WindowContainer>
  );
};

export default AddMasterUserWindow;
