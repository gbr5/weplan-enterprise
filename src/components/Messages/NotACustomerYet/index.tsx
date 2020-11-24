import React, { MouseEventHandler } from 'react';
import { useAuth } from '../../../hooks/auth';
import WindowContainer from '../../WindowContainer';

interface IProps {
  handleWePlanProductsSection: MouseEventHandler;
  onHandleCloseWindow: MouseEventHandler;
}

const NotACustomerYet: React.FC<IProps> = ({
  handleWePlanProductsSection,
  onHandleCloseWindow,
}: IProps) => {
  const { company } = useAuth();

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 15,
        top: '30%',
        left: '25%',
      }}
    >
      <h2>Olá {company.name}, tudo bem?</h2>
      <p>Vi que você ainda não possui nenhum produto contratado.</p>
      <p>Qual a sua necessidade no momento?</p>
      <p>Posso pedir para um de nossos consultores te ligar?</p>
      <h4>
        Se precisar de mim, pode enviar uma mensagem no meu whatsapp - 31 99932
        4093
      </h4>
      <div>
        <button type="button" onClick={handleWePlanProductsSection}>
          Quero ser um vencedor!
        </button>
      </div>
    </WindowContainer>
  );
};

export default NotACustomerYet;
