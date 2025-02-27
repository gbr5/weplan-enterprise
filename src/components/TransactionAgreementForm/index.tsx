import React, { MouseEventHandler, useCallback, useRef, useState } from 'react';
// import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useToast } from '../../hooks/toast';

import Input from '../Input';
import WindowContainer from '../WindowContainer';

import TransactionInputRow from '../TransactionInputRow';
import ITransactionAgreementDTO from '../../dtos/ITransactionAgreementDTO';
import api from '../../services/api';
import ISelectedSupplierDTO from '../../dtos/ISelectedSupplierDTO';

interface IPropsDTO {
  // eslint-disable-next-line react/require-default-props
  agreement?: ITransactionAgreementDTO;
  hiredSupplier: ISelectedSupplierDTO;
  onHandleCloseWindow: MouseEventHandler;
  getEventSuppliers: Function;
  getHiredSuppliers: Function;
}

const TransactionAgreementForm: React.FC<IPropsDTO> = ({
  onHandleCloseWindow,
  hiredSupplier,
  getEventSuppliers,
  getHiredSuppliers,
  agreement,
}: IPropsDTO) => {
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  // const [transactions, setTransactions] = useState<ITransactionDTO[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [numberOfInstallments, setNumberOfInstallments] = useState(1);
  const [transactionContainer, setTransactionContainer] = useState(false);
  const [installmentsRows, setInstallmentsRows] = useState<number[]>([]);

  const handleTransactionContainer = useCallback(() => {
    setInstallmentsRows([...Array(numberOfInstallments)]);
    setTransactionContainer(!transactionContainer);
  }, [numberOfInstallments, transactionContainer]);

  const inputHeight = { height: '40px' };
  let iCount = 0;

  const handleDeleteTransactionAgreement = useCallback(async () => {
    try {
      if (agreement) {
        await api.delete(`finances/transaction-agreements/${agreement.id}`);
        getHiredSuppliers();
        addToast({
          type: 'success',
          title: 'Contrato deletado com sucesso',
          description: 'As informações do evento já foram atualizadas.',
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  }, [agreement, addToast, getHiredSuppliers]);

  const handleSubmit = useCallback(
    async (data: ITransactionAgreementDTO) => {
      try {
        const transactionArray = data.transactions.map(transaction => {
          let ispaid = false;
          if (transaction.isPaid === true) {
            ispaid = true;
          }

          const thisDate = new Date(transaction.due_date);

          return {
            amount: Number(transaction.amount),
            due_date: thisDate,
            isPaid: ispaid,
          };
        });

        if (agreement) {
          await api.put(`finances/transaction-agreements/${agreement.id}`, {
            amount: Number(data.amount),
            number_of_installments: Number(data.number_of_installments),
            transactions: transactionArray,
          });
        } else {
          await api.post(`finances/transaction-agreements`, {
            supplier_id: hiredSupplier.id,
            amount: Number(data.amount),
            number_of_installments: Number(data.number_of_installments),
            transactions: transactionArray,
          });

          await api.put(`events/event-suppliers/edit/${hiredSupplier.id}`, {
            name: hiredSupplier.name,
            supplier_sub_category: hiredSupplier.supplier_sub_category,
            isHired: true,
          });
        }
        addToast({
          type: 'success',
          title: 'Membro da festa adicionado com sucesso',
          description: 'Ele já pode visualizar as informações do evento.',
        });
        getEventSuppliers();
        getHiredSuppliers();
        setTransactionContainer(false);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao adicionar membro da festa',
          description: 'Erro ao adicionar membro da festa, tente novamente.',
        });
        throw new Error(err);
      }
    },
    [addToast, hiredSupplier, getEventSuppliers, getHiredSuppliers, agreement],
  );

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 10,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div>
          <h2>Informações do Contrato</h2>
          <h1>{hiredSupplier.name}</h1>

          {!!agreement && (
            <button type="button" onClick={handleDeleteTransactionAgreement}>
              Deletar Contrato
            </button>
          )}

          <p>Valor do contrato</p>
          <Input
            defaultValue={totalAmount}
            name="amount"
            type="number"
            containerStyle={inputHeight}
            onChange={e => setTotalAmount(Number(e.target.value))}
          />

          <p>Número de parcelas do contrato</p>
          <Input
            defaultValue={numberOfInstallments}
            name="number_of_installments"
            type="number"
            containerStyle={inputHeight}
            onChange={e => setNumberOfInstallments(Number(e.target.value))}
          />

          <button type="button" onClick={handleTransactionContainer}>
            Definir Parcelas
          </button>
        </div>
        {!!transactionContainer && (
          <WindowContainer
            onHandleCloseWindow={onHandleCloseWindow}
            containerStyle={{
              zIndex: 10,
              top: '5%',
              left: '5%',
              height: '90%',
              width: '90%',
              overflow: 'scroll',
            }}
          >
            {installmentsRows.map(row => {
              iCount += 1;
              row && console.log(row);
              return (
                <>
                  <TransactionInputRow
                    key={iCount}
                    rowIndex={iCount}
                    installmentDefaultAmount={
                      totalAmount / numberOfInstallments
                    }
                  />
                </>
              );
            })}
            <div>
              <button type="submit">Salvar</button>
            </div>
          </WindowContainer>
        )}
      </Form>
    </WindowContainer>
  );
};

export default TransactionAgreementForm;
