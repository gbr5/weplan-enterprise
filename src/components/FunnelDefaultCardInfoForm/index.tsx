import React, { MouseEventHandler, useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErros';

import Input from '../Input';
import WindowContainer from '../WindowContainer';

import api from '../../services/api';

import {
  Container,
  RowContainer,
  BooleanButton,
  Row,
  AddButton,
} from './styles';
import { useAuth } from '../../hooks/auth';
import IFunnelDTO from '../../dtos/IFunnelDTO';

interface IDefaultFunnelInfoFieldForm {
  name: string;
}

interface IPropsDTO {
  funnel: IFunnelDTO;
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  getFunnels: Function;
}

const FunnelDefaultCardInfoForm: React.FC<IPropsDTO> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  getFunnels,
  funnel,
}: IPropsDTO) => {
  const { addToast } = useToast();
  const { company } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const [fieldIsRequired, setFieldIsRequired] = useState(false);
  const [fieldDataType, setFieldDataType] = useState('string');

  const inputHeight = { height: '40px' };

  const handleFieldIsRequired = useCallback((props: boolean) => {
    setFieldIsRequired(props);
  }, []);
  const handleFieldDataType = useCallback((props: string) => {
    setFieldDataType(props);
  }, []);

  const handleSubmit = useCallback(
    async (data: IDefaultFunnelInfoFieldForm) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(`funnels/company-funnel-card-info-field/${company.id}`, {
          funnel_id: funnel.id,
          name: data.name,
          field_type: fieldDataType,
          isRequired: fieldIsRequired,
        });
        getFunnels();
        handleCloseWindow();
        addToast({
          type: 'success',
          title: 'Informação default de módulo adicionado com sucesso',
          description: 'As alterações já podem ser visualizadas.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao adicionar informação default de módulo',
          description: 'Erro ao adicionar informação default, tente novamente.',
        });
        throw new Error(err);
      }
    },
    [
      addToast,
      getFunnels,
      funnel,
      company,
      handleCloseWindow,
      fieldIsRequired,
      fieldDataType,
    ],
  );

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 35,
        top: '5%',
        left: '15%',
        height: '90%',
        width: '70%',
      }}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Container>
          <h2>Adicionar Campo Default do Funil {funnel.name}</h2>
          <RowContainer>
            <span>
              <Row>
                <div>
                  <p>Qual o tipo de dado do campo</p>
                  <span>
                    <BooleanButton
                      isActive={fieldDataType === 'string'}
                      type="button"
                      onClick={() => handleFieldDataType('string')}
                    >
                      Texto
                    </BooleanButton>
                    <BooleanButton
                      isActive={fieldDataType === 'Date'}
                      type="button"
                      onClick={() => handleFieldDataType('Date')}
                    >
                      Data
                    </BooleanButton>
                    <BooleanButton
                      isActive={fieldDataType === 'number'}
                      type="button"
                      onClick={() => handleFieldDataType('number')}
                    >
                      Número
                    </BooleanButton>
                  </span>
                </div>
              </Row>
              <Row>
                <div>
                  <p>Campo obrigatório?</p>
                  <span>
                    <BooleanButton
                      isActive={fieldIsRequired === true}
                      type="button"
                      onClick={() => handleFieldIsRequired(true)}
                    >
                      Sim
                    </BooleanButton>
                    <BooleanButton
                      isActive={fieldIsRequired === false}
                      type="button"
                      onClick={() => handleFieldIsRequired(false)}
                    >
                      Não
                    </BooleanButton>
                  </span>
                </div>
              </Row>
            </span>
            <Row>
              <div>
                <p>Nome do Campo</p>
                <Input name="name" containerStyle={inputHeight} />
              </div>
            </Row>
          </RowContainer>
          <AddButton type="submit">Adicionar Campo</AddButton>
        </Container>
      </Form>
    </WindowContainer>
  );
};

export default FunnelDefaultCardInfoForm;
