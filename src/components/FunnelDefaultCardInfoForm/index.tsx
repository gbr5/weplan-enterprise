import React, { MouseEventHandler, useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErros';

import Input from '../Input';
import WindowContainer from '../WindowContainer';

import api from '../../services/api';

import { Container, BooleanButton, SecondRow, AddButton } from './styles';
import { useAuth } from '../../hooks/auth';

interface IDefaultFunnelInfoFieldForm {
  name: string;
}

interface IPropsDTO {
  funnel_id: string;
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  getFunnels: Function;
}

const FunnelDefaultCardInfoForm: React.FC<IPropsDTO> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  getFunnels,
  funnel_id,
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

        await api.post(`funnels/company-funnel-info-field/${company.id}`, {
          funnel_id,
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
      funnel_id,
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
        zIndex: 2000,
        top: '5%',
        left: '15%',
        height: '90%',
        width: '70%',
      }}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Container>
          <h2>Adicionar Master</h2>
          <div>
            <SecondRow>
              <span>
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
                <div>
                  <p>Nome do Campo</p>
                  <Input
                    placeholder="Nome do campo"
                    name="name"
                    containerStyle={inputHeight}
                  />
                </div>
              </span>
            </SecondRow>
          </div>
          <AddButton type="submit">Adicionar Campo</AddButton>
        </Container>
      </Form>
    </WindowContainer>
  );
};

export default FunnelDefaultCardInfoForm;
