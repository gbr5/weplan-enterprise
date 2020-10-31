import React, { MouseEventHandler, useCallback, useState } from 'react';
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
  company_id: string;
}
interface IUser {
  id: string;
  name: string;
  email: string;
  isCompany: boolean;
}

const AddFirstMasterUserWindow: React.FC<IPropsDTO> = ({
  handleCloseWindow,
  onHandleCloseWindow,
  company_id,
  handleMessageWindow,
}: IPropsDTO) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [masterUser, setMasterUser] = useState<IUser>({} as IUser);

  const handleSelectUser = useCallback(
    (props: IUser) => {
      if (masterUser.id === undefined) {
        setMasterUser(props);
      } else {
        setMasterUser({} as IUser);
      }
    },
    [masterUser],
  );

  const handleGetUsers = useCallback((props: string) => {
    try {
      api.get<IUser[]>(`/users?name=${props}`).then(response => {
        const allUsers = response.data.filter(thisUser => !thisUser.isCompany);
        setUsers(allUsers);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  const handleAddMasterUser = useCallback(async () => {
    try {
      await api.post(`suppliers/master/user/${company_id}/${masterUser.id}`, {
        email: masterUser.email,
        password: masterUser.email,
      });

      handleMessageWindow();
      handleCloseWindow();
    } catch (err) {
      throw new Error(err);
    }
  }, [handleCloseWindow, handleMessageWindow, masterUser, company_id]);

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        top: '0%',
        left: '0%',
        height: '100%',
        width: '100%',
        zIndex: 30,
      }}
    >
      <Container>
        <img src={logo} alt="WePlanPRO" />
        <h1>Adicionar Usuário Master</h1>
        <div>
          <InputContainer>
            <h2>Buscar</h2>
            <input onChange={e => handleGetUsers(e.target.value)} />
            {/* <MdSearch size={30} /> */}
          </InputContainer>
          <ul>
            {users.map(thisUser => (
              <ToggleRow
                isActive={masterUser.id === thisUser.id}
                key={thisUser.id}
              >
                <h2 style={{ color: 'black' }}>{thisUser.name}</h2>
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
        </div>
      </Container>
    </WindowContainer>
  );
};

export default AddFirstMasterUserWindow;
