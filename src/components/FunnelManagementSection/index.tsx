import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';

import IFunnelDTO from '../../dtos/IFunnelDTO';

import { Container } from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import Funnel from './Funnel';

interface ICreateFunnel {
  name: string;
  funnel_type: string;
}
interface ICreateFunnelStage {
  name: string;
  funnel_id: string;
  funnel_order: number;
}

const FunnelManagementSection: React.FC = () => {
  const { company, modules } = useAuth();
  const { addToast } = useToast();

  const [companyComercialAccess, setCompanyComercialAccess] = useState(false);
  const [companyProductionAccess, setCompanyProductionAccess] = useState(false);
  const [companyProjectsAccess, setCompanyProjectsAccess] = useState(false);
  const [companyFinancialAccess, setCompanyFinancialAccess] = useState(false);

  const [comercialFunnel, setComercialFunnel] = useState({} as IFunnelDTO);
  const [productionFunnel, setProductionFunnel] = useState({} as IFunnelDTO);
  const [projectsFunnel, setProjectsFunnel] = useState({} as IFunnelDTO);
  const [financialFunnel, setFinancialFunnel] = useState({} as IFunnelDTO);

  const getFunnels = useCallback(() => {
    try {
      api.get<IFunnelDTO[]>(`funnels/${company.id}`).then(response => {
        // !!!!!!!!!! => ==> Usar este se tiver apenas um funil por tipo
        response.data.map(funnel => {
          if (funnel.funnel_type === 'Comercial') {
            setComercialFunnel(funnel);
          }
          if (funnel.funnel_type === 'Production') {
            setProductionFunnel(funnel);
          }
          if (funnel.funnel_type === 'Projects') {
            setProjectsFunnel(funnel);
          }
          if (funnel.funnel_type === 'Financial') {
            setFinancialFunnel(funnel);
          }
          return funnel;
        });
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao editar logo',
        description: 'Erro ao logo da empresa, tente novamente.',
      });

      throw new Error(err);
    }
  }, [addToast, company]);

  useEffect(() => {
    getFunnels();
  }, [getFunnels]);
  useEffect(() => {
    const ciaComercialAccess = modules.find(
      xModule => xModule.management_module === 'Comercial',
    );
    setCompanyComercialAccess(!!ciaComercialAccess);
    const ciaProductionAccess = modules.find(
      xModule => xModule.management_module === 'Production',
    );
    setCompanyProductionAccess(!!ciaProductionAccess);
    const ciaProjectsAccess = modules.find(
      xModule => xModule.management_module === 'Projects',
    );
    setCompanyProjectsAccess(!!ciaProjectsAccess);
    const ciaFinancialAccess = modules.find(
      xModule => xModule.management_module === 'Financial',
    );
    setCompanyFinancialAccess(!!ciaFinancialAccess);
  }, [modules]);

  return (
    <>
      <Container>
        {companyComercialAccess && (
          <Funnel
            isActive={false}
            funnel={comercialFunnel}
            getFunnels={getFunnels}
          />
        )}
        {companyProductionAccess && (
          <Funnel
            isActive={false}
            funnel={productionFunnel}
            getFunnels={getFunnels}
          />
        )}
        {companyProjectsAccess && (
          <Funnel
            isActive={false}
            funnel={projectsFunnel}
            getFunnels={getFunnels}
          />
        )}
        {companyFinancialAccess && (
          <Funnel
            isActive={false}
            funnel={financialFunnel}
            getFunnels={getFunnels}
          />
        )}
      </Container>
    </>
  );
};

export default FunnelManagementSection;
