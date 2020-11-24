import React, { MouseEventHandler } from 'react';
import WindowContainer from '../../WindowContainer';

interface IProps {
  handleEmployeeSection: MouseEventHandler;
  onHandleCloseWindow: MouseEventHandler;
}

const AddEmployeeMessageWindow: React.FC<IProps> = ({
  handleEmployeeSection,
  onHandleCloseWindow,
}: IProps) => {
  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 16,
        top: '30%',
        left: '25%',
      }}
    >
      <p>Vi também que você ainda não possui nenhum colaborador cadastrado.</p>
      <p>No menu lateral você gerenciar os seus colaboradores.</p>
      <h4>
        Se precisar de mim, pode enviar uma mensagem no meu whatsapp - 31 99932
        4093
      </h4>
      <div>
        <button type="button" onClick={handleEmployeeSection}>
          Adicionar colaborador!
        </button>
      </div>
    </WindowContainer>
  );
};

export default AddEmployeeMessageWindow;
