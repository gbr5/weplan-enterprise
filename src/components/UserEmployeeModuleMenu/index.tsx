import React, { MouseEventHandler } from 'react';

import { Modules, ModuleTitle } from './styles';

interface IPropsDTO {
  title: string;
  // 1°
  handleMainDashboard: MouseEventHandler;
  // 2°
  comercialAccess: boolean;
  handleCRMDashboard: MouseEventHandler;
  // 3°
  productionAccess: boolean;
  handleProductionDashboard?: MouseEventHandler;
  // 4°
  projectsAccess: boolean;
  handleProjectsDashboard?: MouseEventHandler;
  // 5°
  financialAccess: boolean;
  handleFinancialDashboard?: MouseEventHandler;
}

const UserEmployeeModuleMenu: React.FC<IPropsDTO> = ({
  title,
  handleMainDashboard,
  comercialAccess,
  handleCRMDashboard,
  productionAccess,
  handleProductionDashboard,
  projectsAccess,
  handleProjectsDashboard,
  financialAccess,
  handleFinancialDashboard,
}: IPropsDTO) => {
  return (
    <Modules>
      <button type="button" onClick={handleMainDashboard}>
        <ModuleTitle isActive={title === 'Dashboard'}>
          <strong>Dashboard</strong>
        </ModuleTitle>
      </button>
      {comercialAccess && (
        <button type="button" onClick={handleCRMDashboard}>
          <ModuleTitle isActive={title === 'Comercial'}>
            <strong>Comercial</strong>
          </ModuleTitle>
        </button>
      )}
      {productionAccess && (
        <button type="button" onClick={handleProductionDashboard}>
          <ModuleTitle isActive={title === 'Produção'}>
            <strong>Produção</strong>
          </ModuleTitle>
        </button>
      )}
      {projectsAccess && (
        <button type="button" onClick={handleProjectsDashboard}>
          <ModuleTitle isActive={title === 'Projetos'}>
            <strong>Projetos</strong>
          </ModuleTitle>
        </button>
      )}
      {financialAccess && (
        <button type="button" onClick={handleFinancialDashboard}>
          <ModuleTitle isActive={title === 'Financeiro'}>
            <strong>Financeiro</strong>
          </ModuleTitle>
        </button>
      )}
    </Modules>
  );
};

export default UserEmployeeModuleMenu;
