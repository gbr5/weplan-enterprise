import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { MdDelete } from 'react-icons/md';
import { useToast } from '../../hooks/toast';

import WindowContainer from '../WindowContainer';

import api from '../../services/api';

import {
  Container,
  BooleanButton,
  SecondRow,
  AddButton,
  DeleteButton,
} from './styles';

import IFunnelDTO from '../../dtos/IFunnelDTO';

interface IFunnelCardInfoField {
  id: string;
  name: string;
  field_type: string;
  isRequired: boolean;
}

interface IDefaultFunnelInfoFieldForm {
  name: string;
}

interface IPropsDTO {
  funnel: IFunnelDTO;
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  getFunnels: Function;
}

const FunnelDefaultCardInfoWindow: React.FC<IPropsDTO> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  getFunnels,
  funnel,
}: IPropsDTO) => {
  const { addToast } = useToast();

  const [funnelCardInfoFields, setFunnelCardInfoFields] = useState<
    IFunnelCardInfoField[]
  >([]);
  const [
    selectedFunnelCardInfoField,
    setSelectedFunnelCardInfoField,
  ] = useState<IFunnelCardInfoField>({} as IFunnelCardInfoField);
  const getFunnelInfoFields = useCallback(() => {
    try {
      api
        .get<IFunnelCardInfoField[]>(
          `funnels/company-funnel-card-info-field/${funnel.id}`,
        )
        .then(response => {
          setFunnelCardInfoFields(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [funnel]);

  const handleDeleteInfoField = useCallback(
    async (props: IFunnelCardInfoField) => {
      try {
        await api.delete(`funnels/company-funnel-card-info-field/${props.id}`);
        getFunnels();
        getFunnelInfoFields();
        handleCloseWindow();
        addToast({
          type: 'success',
          title: 'Informação default de módulo deletada com sucesso',
          description: 'As alterações já podem ser visualizadas.',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar informação default de módulo',
          description: 'Erro ao deletar informação default, tente novamente.',
        });
        throw new Error(err);
      }
    },
    [addToast, getFunnels, handleCloseWindow, getFunnelInfoFields],
  );

  const handleSelectInfoField = useCallback((props: IFunnelCardInfoField) => {
    setSelectedFunnelCardInfoField(props);
  }, []);

  useEffect(() => {
    getFunnelInfoFields();
  }, [getFunnelInfoFields]);

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
      <Container>
        <h2>Informações Default do Módulo {funnel.name}</h2>
        <div>
          <SecondRow>
            {funnelCardInfoFields.map(field => (
              <span key={field.id}>
                <BooleanButton
                  isActive={field.id === selectedFunnelCardInfoField.id}
                  onClick={() => handleSelectInfoField(field)}
                >
                  <h2>{field.name}</h2>
                  <p>{field.field_type}</p>
                  <p>{field.isRequired}</p>
                </BooleanButton>
                <DeleteButton
                  type="button"
                  onClick={() => handleDeleteInfoField(field)}
                >
                  <MdDelete size={32} />
                </DeleteButton>
              </span>
            ))}
          </SecondRow>
        </div>
        <AddButton type="submit">Adicionar Campo</AddButton>
      </Container>
    </WindowContainer>
  );
};

export default FunnelDefaultCardInfoWindow;
