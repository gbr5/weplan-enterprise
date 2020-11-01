import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

import IFunnelDTO from '../../dtos/IFunnelDTO';

import { Container, Funnel, StageFunnel, StageSection } from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

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
  const { company } = useAuth();
  const { addToast } = useToast();

  const [comercialStagesSection, setComercialStagesSection] = useState(false);
  const [operationsStagesSection, setOperationsStagesSection] = useState(false);
  const [projectsStagesSection, setProjectsStagesSection] = useState(false);
  const [financialStagesSection, setFinancialStagesSection] = useState(false);
  const [comercialFunnel, setComercialFunnel] = useState({} as IFunnelDTO);
  const [operationsFunnel, setOperationsFunnel] = useState({} as IFunnelDTO);
  const [projectsFunnel, setProjectsFunnel] = useState({} as IFunnelDTO);
  const [financialFunnel, setFinancialFunnel] = useState({} as IFunnelDTO);

  const getFunnels = useCallback(() => {
    try {
      api.get<IFunnelDTO[]>(`funnels/${company.id}`).then(response => {
        // !!!!!!!!!! => ==> Usar este se tiver apenas um funil por tipo
        response.data.map(funnel => {
          console.log(funnel);
          funnel.funnel_type === 'Comercial' && setComercialFunnel(funnel);
          funnel.funnel_type === 'Operations' && setOperationsFunnel(funnel);
          funnel.funnel_type === 'Projects' && setProjectsFunnel(funnel);
          funnel.funnel_type === 'Financial' && setFinancialFunnel(funnel);
          return funnel;
        });
        // !!!!!!!!!! ==> ==> Não está funcionando !!! <== <== !!! Usar este se tiver mais de um funil por tipo
        // setComercialFunnel(
        //   response.data.filter(funnel => funnel.funnel_type === 'Comercial'),
        // );
        // setOperationsFunnel(
        //   response.data.filter(funnel => funnel.funnel_type === 'Operations'),
        // );
        // setProjectsFunnel(
        //   response.data.filter(funnel => funnel.funnel_type === 'Projects'),
        // );
        // setFinancialFunnel(
        //   response.data.filter(funnel => funnel.funnel_type === 'Financial'),
        // );
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

  return (
    <Container>
      <Funnel isActive={false}>
        <h3>Comercial</h3>
        <span>{comercialFunnel.name}</span>
        <button
          type="button"
          onClick={() => setComercialStagesSection(!comercialStagesSection)}
        >
          {comercialStagesSection ? (
            <FiChevronUp size={24} />
          ) : (
            <FiChevronDown size={24} />
          )}
        </button>
      </Funnel>
      {comercialStagesSection && (
        <StageSection>
          {comercialFunnel.stages &&
            comercialFunnel.stages.map(stage => (
              <StageFunnel isActive={false}>
                <h3>{stage.funnel_order}</h3>
                <h3>{stage.name}</h3>
              </StageFunnel>
            ))}
        </StageSection>
      )}
      <Funnel isActive={false}>
        <h3>Operações</h3>
        <span>{operationsFunnel.name}</span>
        <button
          type="button"
          onClick={() => setOperationsStagesSection(!operationsStagesSection)}
        >
          {operationsStagesSection ? (
            <FiChevronUp size={24} />
          ) : (
            <FiChevronDown size={24} />
          )}
        </button>
      </Funnel>
      {operationsStagesSection && (
        <StageSection>
          {operationsFunnel.stages &&
            operationsFunnel.stages.map(stage => (
              <StageFunnel isActive={false}>
                <h3>{stage.name}</h3>
              </StageFunnel>
            ))}
        </StageSection>
      )}
      <Funnel isActive={false}>
        <h3>Projetos</h3>
        <span>{projectsFunnel.name}</span>
        <button
          type="button"
          onClick={() => setProjectsStagesSection(!projectsStagesSection)}
        >
          {projectsStagesSection ? (
            <FiChevronUp size={24} />
          ) : (
            <FiChevronDown size={24} />
          )}
        </button>
      </Funnel>
      {projectsStagesSection && (
        <StageSection>
          {projectsFunnel.stages &&
            projectsFunnel.stages.map(stage => (
              <StageFunnel isActive={false}>
                <h3>{stage.name}</h3>
              </StageFunnel>
            ))}
        </StageSection>
      )}
      <Funnel isActive={false}>
        <h3>Financeiro</h3>
        <span>{financialFunnel.name}</span>
        <button
          type="button"
          onClick={() => setFinancialStagesSection(!financialStagesSection)}
        >
          {financialStagesSection ? (
            <FiChevronUp size={24} />
          ) : (
            <FiChevronDown size={24} />
          )}
        </button>
      </Funnel>
      {financialStagesSection && (
        <StageSection>
          {financialFunnel.stages &&
            financialFunnel.stages.map(stage => (
              <StageFunnel isActive={false}>
                <h3>{stage.name}</h3>
              </StageFunnel>
            ))}
        </StageSection>
      )}
    </Container>
  );
};

export default FunnelManagementSection;
