import React, { MouseEventHandler, useCallback, useState } from 'react';
import IFriendGroupDTO from '../../dtos/IFriendGroupDTO';
import IUserDTO from '../../dtos/IUserDTO';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import WindowContainer from '../WindowContainer';

import { Container } from './styles';

interface IPropsDTO {
  allFriendGroupId: IFriendGroupDTO;
  handleCloseWindow: Function;
  onHandleCloseWindow: MouseEventHandler;
  getFriends: Function;
  getFriendGroups: Function;
  handleFriendLists: Function;
}

const AddFriendWindow: React.FC<IPropsDTO> = ({
  allFriendGroupId,
  handleCloseWindow,
  onHandleCloseWindow,
  getFriends,
  getFriendGroups,
  handleFriendLists,
}: IPropsDTO) => {
  const { addToast } = useToast();
  const { company } = useAuth();

  const [users, setUsers] = useState<IUserDTO[]>([]);
  const [friendId, setFriendId] = useState('');

  const handleGetUsers = useCallback(
    (props: string) => {
      try {
        api.get<IUserDTO[]>(`/users?name=${props}`).then(response => {
          const allUsers = response.data.filter(
            thisUser => thisUser.id !== company.id,
          );
          setUsers(allUsers);
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    [company],
  );

  const handleSelectUser = useCallback(
    (props: string) => {
      if (friendId === props) {
        setFriendId('');
      } else {
        setFriendId(props);
      }
    },
    [friendId],
  );

  const handleAddFriend = useCallback(async () => {
    try {
      await api.post('/users/friends', {
        friend_id: friendId,
        friend_group: allFriendGroupId.id,
      });

      getFriends();
      getFriendGroups();
      handleCloseWindow();
      handleFriendLists(allFriendGroupId);

      addToast({
        type: 'success',
        title: 'Amigo adicionado com sucesso',
        description: 'As informações do evento já foram atualizadas.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao adicionar amigo',
        description: 'Erro ao adicionar amigo, tente novamente.',
      });
      throw new Error(err);
    }
  }, [
    friendId,
    addToast,
    getFriends,
    getFriendGroups,
    handleCloseWindow,
    allFriendGroupId,
    handleFriendLists,
  ]);

  return (
    <>
      <WindowContainer
        onHandleCloseWindow={onHandleCloseWindow}
        containerStyle={{
          top: '10%',
          left: '25%',
          height: '80%',
          width: '50%',
          zIndex: '1000',
        }}
      >
        <Container>
          <h1>Adicionar contato</h1>
          <input onChange={e => handleGetUsers(e.target.value)} />
          <ul>
            {users.map(thisUser => (
              <li key={thisUser.id}>
                <h2>{thisUser.name}</h2>
                {friendId !== thisUser.id ? (
                  <button
                    type="button"
                    onClick={() => handleSelectUser(thisUser.id)}
                  >
                    Selecionar
                  </button>
                ) : (
                  <span>
                    <button
                      type="button"
                      onClick={() => handleSelectUser(thisUser.id)}
                    >
                      Selecionado
                    </button>
                  </span>
                )}
              </li>
            ))}
          </ul>
          {friendId !== '' && (
            <button type="button" onClick={handleAddFriend}>
              Adicionar
            </button>
          )}
        </Container>
      </WindowContainer>
    </>
  );
};

export default AddFriendWindow;
