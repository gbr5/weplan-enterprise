import React, { MouseEventHandler, useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useToast } from '../../hooks/toast';

import Input from '../Input';

import api from '../../services/api';

import { Container } from './styles';
import { useAuth } from '../../hooks/auth';

interface ICompanyInformationDTO {
  user_id: string;
  userName: string;
  email: string;
  companyName: string;
  company_info_id: string;
  companyID: string;
  phone: number;
}

interface IPropsDTO {
  companyInformation: ICompanyInformationDTO;
  inputName: string;
  defaultValue: string;
  type: string;
  handleCloseWindow: Function;
  onHandleCloseWindow: MouseEventHandler;
  getCompanyInfo?: Function;
}

const EditCompanyInfoInput: React.FC<IPropsDTO> = ({
  companyInformation,
  inputName,
  defaultValue,
  type,
  handleCloseWindow,
  getCompanyInfo,
  onHandleCloseWindow,
}: IPropsDTO) => {
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const { updateCompany, company, updateCompanyInfo } = useAuth();

  const inputHeight = { height: '32px' };

  const handleSubmit = useCallback(
    async (data: ICompanyInformationDTO) => {
      try {
        if (inputName === 'companyName') {
          if (
            companyInformation.companyName === undefined ||
            companyInformation.companyName === ''
          ) {
            const response = await api.post('company-info', {
              name: data.companyName,
              company_id:
                companyInformation.companyID === undefined
                  ? companyInformation.user_id
                  : companyInformation.companyID,
              user_id: companyInformation.user_id,
            });
            updateCompanyInfo(response.data);
          } else {
            const response = await api.put(
              `company-info/${companyInformation.user_id}`,
              {
                name: data.companyName,
                company_id: companyInformation.companyID,
              },
            );
            updateCompanyInfo(response.data);
          }
        }
        if (inputName === 'companyID') {
          if (
            companyInformation.companyID === undefined ||
            companyInformation.companyID === ''
          ) {
            const response = await api.post('company-info', {
              name:
                companyInformation.companyName === undefined
                  ? companyInformation.user_id
                  : companyInformation.companyName,
              company_id: data.companyID,
              user_id: companyInformation.user_id,
            });
            updateCompanyInfo(response.data);
          } else {
            const response = await api.put(
              `company-info/${companyInformation.user_id}`,
              {
                name: companyInformation.companyName,
                company_id: data.companyID,
              },
            );
            updateCompanyInfo(response.data);
          }
        }
        if (inputName === 'userName') {
          const response = await api.put(`profile/${company.id}`, {
            name: data.userName,
            email: companyInformation.email,
          });

          updateCompany(response.data);
        }
        if (inputName === 'email') {
          const response = await api.put(`profile/${company.id}`, {
            name: companyInformation.userName,
            email: data.email,
          });

          updateCompany(response.data);
        }
        if (inputName === 'phone') {
          if (companyInformation.phone === 0) {
            await api.post(
              `profile/contact-info/add/${companyInformation.user_id}`,
              {
                contact_info: data.phone,
                contact_type: 'phone',
              },
            );
          } else {
            await api.put(
              `profile/contact-info/${companyInformation.user_id}/phone`,
              {
                contact_info: data.phone,
              },
            );
          }
        }

        addToast({
          type: 'success',
          title: 'Membro da festa adicionado com sucesso',
          description: 'Ele já pode visualizar as informações do evento.',
        });
        getCompanyInfo && getCompanyInfo();
        handleCloseWindow();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao adicionar membro da festa',
          description: 'Erro ao adicionar membro da festa, tente novamente.',
        });
        throw new Error(err);
      }
    },
    [
      addToast,
      handleCloseWindow,
      getCompanyInfo,
      inputName,
      companyInformation,
      updateCompany,
      company,
      updateCompanyInfo,
    ],
  );

  const default_value = type === 'string' ? defaultValue : Number(defaultValue);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name={inputName}
          type={type}
          defaultValue={default_value}
          containerStyle={inputHeight}
        />
        <button type="submit">Salvar</button>
        <button type="button" onClick={onHandleCloseWindow}>
          Cancelar
        </button>
      </Form>
    </Container>
  );
};

export default EditCompanyInfoInput;
