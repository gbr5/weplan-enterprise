import React, { MouseEventHandler } from 'react';
import WindowContainer from '../../WindowContainer';

interface IProps {
  handleWePlanProductsSection: MouseEventHandler;
  onHandleCloseWindow: MouseEventHandler;
}

const MasterUserCreatedSuccessfuly: React.FC<IProps> = ({
  handleWePlanProductsSection,
  onHandleCloseWindow,
}: IProps) => {
  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 150,
        top: '30%',
        left: '25%',
      }}
    >
      <h2>Sucesso</h2>
      <p>
        Foi enviado um e-mail para que o usuário confirme a sua solicitação.
      </p>
      <h4>
        Qualquer dúvida, pode enviar uma mensagem no meu whatsapp - 31 99932
        4093
      </h4>
      <div>
        <button type="button" onClick={handleWePlanProductsSection}>
          Produtos We Plan!
        </button>
      </div>{' '}
    </WindowContainer>
  );
};

export default MasterUserCreatedSuccessfuly;
