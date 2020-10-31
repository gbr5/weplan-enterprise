import React, { MouseEventHandler, useCallback } from 'react';
import { FiChevronRight, FiEdit2 } from 'react-icons/fi';

import {
  EmployeeScrollList,
  EmployeeSection,
  ConfirmedEmployeeSection,
} from './styles';
import WindowContainer from '../WindowContainer';

interface ICompany {
  id: string;
  name: string;
  avatar_url: string;
  email: string;
}

interface IMasterInfoDTO {
  id: string;
  isConfirmed: boolean;
  company: ICompany;
}

interface IPropsDTO {
  userAsCompanyMasters: IMasterInfoDTO[];
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  selectEnterprise: Function;
}

const SelectCurrentEnterpriseWindow: React.FC<IPropsDTO> = ({
  userAsCompanyMasters,
  onHandleCloseWindow,
  handleCloseWindow,
  selectEnterprise,
}: IPropsDTO) => {
  const handleSelectMaster = useCallback(
    props => {
      handleCloseWindow();
      selectEnterprise(props);
    },
    [handleCloseWindow, selectEnterprise],
  );

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
        zIndex: 10000,
      }}
    >
      <EmployeeSection>
        <h2>Seus acessos por empresa</h2>
        <ConfirmedEmployeeSection>
          <EmployeeScrollList>
            <table>
              <tr>
                <th>N°</th>
                <th>Nome</th>
                <th>Confirmado</th>
                <th>
                  <FiEdit2 size={30} />
                </th>
              </tr>
              <div>
                {userAsCompanyMasters.map(thiEmployee => {
                  const employeeIndex =
                    userAsCompanyMasters.findIndex(
                      index => index.id === thiEmployee.id,
                    ) + 1;
                  return (
                    <tr key={thiEmployee.id}>
                      <td>
                        <p>{employeeIndex}</p>
                      </td>
                      <td>
                        <p>{thiEmployee.company.name}</p>
                      </td>
                      <td>
                        <p>{thiEmployee.isConfirmed}</p>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleSelectMaster(thiEmployee)}
                        >
                          <FiChevronRight size={24} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </div>
            </table>
          </EmployeeScrollList>
        </ConfirmedEmployeeSection>
      </EmployeeSection>
    </WindowContainer>
  );
};

export default SelectCurrentEnterpriseWindow;
