import React, { useCallback, useState } from 'react';
import ISelectedSupplierDTO from '../../dtos/ISelectedSupplierDTO';
import PageContainer from '../PageContainer';

import {
  Container,
  Suppliers,
  SupplierButton,
  MenuButton,
  SupplierTransactionAgreementsWindow,
} from './styles';
import { numberFormat } from '../../utils/numberFormat';

const CompanyFinanceSection: React.FC = () => {
  const [supplierTransactions, setSupplierTransactions] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<
    ISelectedSupplierDTO
  >({} as ISelectedSupplierDTO);
  const [totalEventCost, setTotalEventCost] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalToPay, setTotalToPay] = useState(0);
  const [totalOverdue, setTotalOverdue] = useState(0);
  const [allTransactionsWindow, setAllTransactionsWindow] = useState(true);
  const [paidTransactionsWindow, setPaidTransactionsWindow] = useState(false);
  const [notPaidTransactionsWindow, setNotPaidTransactionsWindow] = useState(
    false,
  );
  const [overdueTransactionsWindow, setOverdueTransactionsWindow] = useState(
    false,
  );

  // const transactions = [] as ITransactionDTO[];
  // const paidTransactions = [] as ITransactionDTO[];
  // const notPaidTransactions = [] as ITransactionDTO[];
  // const overdueTransactions = [] as ITransactionDTO[];
  // const agreements = [] as ITransactionAgreementDTO[];

  // const today = new Date();

  const closeAllWindow = useCallback(() => {
    setSupplierTransactions(false);
    setAllTransactionsWindow(false);
    setPaidTransactionsWindow(false);
    setNotPaidTransactionsWindow(false);
    setOverdueTransactionsWindow(false);
    setSelectedSupplier({} as ISelectedSupplierDTO);
  }, []);

  const handleAllTransactionsWindow = useCallback(() => {
    closeAllWindow();
    setAllTransactionsWindow(!allTransactionsWindow);
  }, [closeAllWindow, allTransactionsWindow]);

  const handlePaidTransactionsWindow = useCallback(() => {
    closeAllWindow();
    setPaidTransactionsWindow(!paidTransactionsWindow);
  }, [closeAllWindow, paidTransactionsWindow]);

  const handleNotPaidTransactionsWindow = useCallback(() => {
    closeAllWindow();
    setNotPaidTransactionsWindow(!notPaidTransactionsWindow);
  }, [closeAllWindow, notPaidTransactionsWindow]);

  const handleOverdueTransactionsWindow = useCallback(() => {
    closeAllWindow();
    setOverdueTransactionsWindow(!overdueTransactionsWindow);
  }, [closeAllWindow, overdueTransactionsWindow]);

  // const sortByTransactionsDifferenceInDays = useCallback(
  //   (a: ITransactionDTO, b: ITransactionDTO) => {
  //     if (a.difference_in_days === b.difference_in_days) {
  //       return 0;
  //     }
  //     if (a.difference_in_days && b.difference_in_days) {
  //       if (
  //         a.difference_in_days > 0 &&
  //         a.difference_in_days > b.difference_in_days
  //       ) {
  //         return -1;
  //       }

  //       return 1;
  //     }
  //     return 0;
  //   },
  //   [],
  // );

  // const sortByOverdueTransactionsDifferenceInDays = useCallback(
  //   (a: ITransactionDTO, b: ITransactionDTO) => {
  //     if (a.difference_in_days === b.difference_in_days) {
  //       return 0;
  //     }
  //     if (a.difference_in_days && b.difference_in_days) {
  //       if (
  //         a.difference_in_days > 0 &&
  //         a.difference_in_days > b.difference_in_days
  //       ) {
  //         return 1;
  //       }
  //       if (
  //         a.difference_in_days < 0 &&
  //         a.difference_in_days > b.difference_in_days
  //       ) {
  //         return 1;
  //       }
  //       return -1;
  //     }
  //     return 0;
  //   },
  //   [],
  // );

  console.log(
    setTotalEventCost,
    setTotalPaid,
    setTotalToPay,
    setTotalOverdue,
    selectedSupplier,
  );
  // const supplierIndex = 0;
  // const agreementIndex = 0;
  // const allTransactionsIndex = 0;

  // hiredSuppliers.map(supplier => {
  //   supplier.transactionAgreement &&
  //     supplier.transactionAgreement.map(agreement => {
  //       agreements.push(agreement);
  //       agreement.transactions &&
  //         agreement.transactions.map(transaction => {
  //           const transactionDate = formatDateToString(
  //             String(transaction.due_date),
  //           ) as string;
  //           const newDate = new Date(String(transaction.due_date));
  //           const daysTillDueDate = differenceInDays(newDate, today) as number;

  //           transactions.push({
  //             id: transaction.id,
  //             agreement_id: transaction.agreement_id,
  //             amount: Number(transaction.amount),
  //             due_date: new Date(transaction.due_date),
  //             isPaid: transaction.isPaid,
  //             formattedDate: transactionDate,
  //             difference_in_days: daysTillDueDate,
  //             supplier_name: supplier.name,
  //             index: allTransactionsIndex,
  //           });
  //           return transaction;
  //         });

  //       return agreement;
  //     });
  //   return supplier;
  // });

  // const handleGetTotalEventCost = useCallback(() => {
  //   setTotalEventCost(
  //     agreements
  //       .map(agreement => Number(agreement.amount))
  //       .reduce((a, b) => a + b, 0),
  //   );
  //   setTotalPaid(
  //     paidTransactions.map(paid => paid.amount).reduce((a, b) => a + b, 0),
  //   );
  //   setTotalToPay(
  //     notPaidTransactions
  //       .map(notPaid => notPaid.amount)
  //       .reduce((a, b) => a + b, 0),
  //   );
  //   setTotalOverdue(
  //     overdueTransactions
  //       .map(overdue => overdue.amount)
  //       .reduce((a, b) => a + b, 0),
  //   );
  // }, [agreements, paidTransactions, notPaidTransactions, overdueTransactions]);

  // useEffect(() => {
  //   handleGetTotalEventCost();
  // }, [handleGetTotalEventCost]);

  // const handleSelectedSupplier = useCallback(
  //   props => {
  //     closeAllWindow();
  //     setSelectedSupplier(props);
  //     setSupplierTransactions(true);
  //   },
  //   [closeAllWindow],
  // );

  // const sortedTransactions = useMemo(() => {
  //   const sortedByDifferenceInDays = transactions.sort(
  //     sortByTransactionsDifferenceInDays,
  //   );
  //   return sortedByDifferenceInDays;
  // }, [transactions, sortByTransactionsDifferenceInDays]);

  // const paidSortedTransactions = useMemo(() => {
  //   sortedTransactions.map(
  //     transaction =>
  //       transaction.isPaid === true && paidTransactions.push(transaction),
  //   );
  //   const sortedByDifferenceInDays = paidTransactions.sort(
  //     sortByTransactionsDifferenceInDays,
  //   );
  //   return sortedByDifferenceInDays;
  // }, [
  //   paidTransactions,
  //   sortByTransactionsDifferenceInDays,
  //   sortedTransactions,
  // ]);

  // const notPaidSortedTransactions = useMemo(() => {
  //   transactions.map(
  //     transaction =>
  //       transaction.isPaid === false && notPaidTransactions.push(transaction),
  //   );

  //   const sortedByDifferenceInDays = notPaidTransactions.sort(
  //     sortByOverdueTransactionsDifferenceInDays,
  //   );
  //   return sortedByDifferenceInDays;
  // }, [
  //   notPaidTransactions,
  //   sortByOverdueTransactionsDifferenceInDays,
  //   transactions,
  // ]);

  // const overdueSortedTransactions = useMemo(() => {
  //   transactions.map(transaction => {
  //     transaction.difference_in_days &&
  //       transaction.isPaid !== true &&
  //       transaction.difference_in_days < 0 &&
  //       overdueTransactions.push(transaction);
  //     return transaction;
  //   });
  //   const sortedByDifferenceInDays = overdueTransactions.sort(
  //     sortByOverdueTransactionsDifferenceInDays,
  //   );
  //   return sortedByDifferenceInDays;
  // }, [
  //   overdueTransactions,
  //   transactions,
  //   sortByOverdueTransactionsDifferenceInDays,
  // ]);

  return (
    <Container>
      <h1>Financeiro</h1>
      <span>
        <div>
          <MenuButton
            booleanActiveButton={allTransactionsWindow}
            type="button"
            onClick={handleAllTransactionsWindow}
          >
            Transações
          </MenuButton>
          <div>
            <h3>Total:</h3>
            <p>{numberFormat(totalEventCost)}</p>
          </div>
        </div>
        <div>
          <MenuButton
            booleanActiveButton={paidTransactionsWindow}
            type="button"
            onClick={handlePaidTransactionsWindow}
          >
            Trasações Efetuadas
          </MenuButton>
          <div>
            <p>{numberFormat(totalPaid)}</p>
          </div>
        </div>
        <div>
          <MenuButton
            booleanActiveButton={notPaidTransactionsWindow}
            type="button"
            onClick={handleNotPaidTransactionsWindow}
          >
            Transações a Pagar
          </MenuButton>
          <div>
            <p>{numberFormat(totalToPay)}</p>
          </div>
        </div>
        <div>
          <MenuButton
            booleanActiveButton={overdueTransactionsWindow}
            type="button"
            onClick={handleOverdueTransactionsWindow}
          >
            Transações Vencidas
          </MenuButton>
          <div>
            <p style={{ color: 'red' }}>{numberFormat(totalOverdue)}</p>
          </div>
        </div>
      </span>
      <div>
        <Suppliers>
          <h2>Fornecedores</h2>
          <div>
            <SupplierButton booleanActiveButton type="button">
              <p>supplierIndex</p>
              <h3>supplier.name</h3>
            </SupplierButton>
          </div>
        </Suppliers>

        <PageContainer
          containerStyle={{ height: '368px', boxSizing: 'border-box' }}
        >
          {!!supplierTransactions && (
            <SupplierTransactionAgreementsWindow>
              {/* <h1>{selectedSupplier.name}</h1>

              <div>
                {selectedSupplier.transactionAgreement?.map(agreement => {
                  agreementIndex += 1;
                  const key = String(agreementIndex);
                  return (
                    <>
                      <TransactionAgreement
                        key={key}
                        transactionAgreement={agreement}
                      />
                      <SupplierTransactionAgreementsWindow>
                        {agreement.transactions.map(transaction => {
                          allTransactionsIndex += 1;
                          const supplierTransactionKey = String(
                            allTransactionsIndex,
                          );
                          return (
                            <Transaction
                              isOwner={true}
                              refreshHiredSuppliers={refreshHiredSuppliers}
                              key={supplierTransactionKey}
                              allTransactions={false}
                              transaction={transaction}
                            />
                          );
                        })}
                        </SupplierTransactionAgreementsWindow>
                    </>
                  );
                })}
              </div> */}
            </SupplierTransactionAgreementsWindow>
          )}
          {/* {!!allTransactionsWindow && (
            <TransactionsWindow>
              <h3>Transações</h3>
              {sortedTransactions.map(transaction => {
                allTransactionsIndex += 1;
                const key = String(allTransactionsIndex);
                return (
                  <Transaction
                    isOwner={isOwner}
                    refreshHiredSuppliers={refreshHiredSuppliers}
                    key={key}
                    allTransactions
                    transaction={transaction}
                  />
                );
              })}
            </TransactionsWindow>
          )}
          {!!paidTransactionsWindow && (
            <TransactionsWindow>
              <h3>Transações Efetuadas</h3>
              {paidSortedTransactions.map(transaction => {
                allTransactionsIndex += 1;
                const key = String(allTransactionsIndex);
                return (
                  <Transaction
                    isOwner={isOwner}
                    allTransactions={false}
                    refreshHiredSuppliers={refreshHiredSuppliers}
                    key={key}
                    transaction={transaction}
                  />
                );
              })}
            </TransactionsWindow>
          )}
          {!!notPaidTransactionsWindow && (
            <TransactionsWindow>
              <h3>Transações a Pagar</h3>
              {notPaidSortedTransactions.map(transaction => {
                allTransactionsIndex += 1;
                const key = String(allTransactionsIndex);
                return (
                  <Transaction
                    isOwner={isOwner}
                    allTransactions={false}
                    refreshHiredSuppliers={refreshHiredSuppliers}
                    key={key}
                    transaction={transaction}
                  />
                );
              })}
            </TransactionsWindow>
          )}
          {!!overdueTransactionsWindow && (
            <TransactionsWindow>
              <h3>Transações Atrasadas</h3>
              {overdueSortedTransactions.map(transaction => {
                allTransactionsIndex += 1;
                const key = String(allTransactionsIndex);
                return (
                  <Transaction
                    isOwner={isOwner}
                    allTransactions={false}
                    refreshHiredSuppliers={refreshHiredSuppliers}
                    key={key}
                    transaction={transaction}
                  />
                );
              })}
            </TransactionsWindow>
          )} */}
        </PageContainer>
      </div>
    </Container>
  );
};

export default CompanyFinanceSection;
