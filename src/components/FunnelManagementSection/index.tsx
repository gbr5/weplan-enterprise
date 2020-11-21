import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

import IFunnelDTO from '../../dtos/IFunnelDTO';

import { Container, Funnel, StageFunnel, StageSection } from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import FunnelDefaultCardInfoWindow from '../FunnelDefaultCardInfoWindow';
import IFunnelStageDTO from '../../dtos/IFunnelStageDTO';

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
  const [companyOperationsAccess, setCompanyOperationsAccess] = useState(false);
  const [companyProjectsAccess, setCompanyProjectsAccess] = useState(false);
  const [companyFinancialAccess, setCompanyFinancialAccess] = useState(false);
  const [comercialStagesSection, setComercialStagesSection] = useState(false);
  const [operationsStagesSection, setOperationsStagesSection] = useState(false);
  const [projectsStagesSection, setProjectsStagesSection] = useState(false);
  const [funnelCardInfoFieldWindow, setFunnelCardInfoFieldWindow] = useState(
    false,
  );
  const [financialStagesSection, setFinancialStagesSection] = useState(false);
  const [selectedFunnel, setSelectedFunnel] = useState<IFunnelDTO>(
    {} as IFunnelDTO,
  );
  const [comercialFunnel, setComercialFunnel] = useState({} as IFunnelDTO);
  const [comercialFunnelStages, setComercialFunnelStages] = useState<
    IFunnelStageDTO[]
  >([]);
  const [operationsFunnel, setOperationsFunnel] = useState({} as IFunnelDTO);
  const [operationsFunnelStages, setOperationsFunnelStages] = useState<
    IFunnelStageDTO[]
  >([]);
  const [projectsFunnel, setProjectsFunnel] = useState({} as IFunnelDTO);
  const [projectsFunnelStages, setProjectsFunnelStages] = useState<
    IFunnelStageDTO[]
  >([]);
  const [financialFunnel, setFinancialFunnel] = useState({} as IFunnelDTO);
  const [financialFunnelStages, setFinancialFunnelStages] = useState<
    IFunnelStageDTO[]
  >([]);

  const compareStageOrder = useCallback(
    (a: IFunnelStageDTO, b: IFunnelStageDTO) => {
      if (Number(a.funnel_order) > Number(b.funnel_order)) {
        return 1;
      }
      if (Number(a.funnel_order) < Number(b.funnel_order)) {
        return -1;
      }
      return 0;
    },
    [],
  );

  const getFunnels = useCallback(() => {
    try {
      api.get<IFunnelDTO[]>(`funnels/${company.id}`).then(response => {
        // !!!!!!!!!! => ==> Usar este se tiver apenas um funil por tipo
        response.data.map(funnel => {
          funnel.funnel_type === 'Comercial' && setComercialFunnel(funnel);
          funnel.funnel_type === 'Comercial' &&
            setComercialFunnelStages(funnel.stages.sort(compareStageOrder));
          funnel.funnel_type === 'Operations' && setOperationsFunnel(funnel);
          funnel.funnel_type === 'Operations' &&
            setOperationsFunnelStages(funnel.stages.sort(compareStageOrder));
          funnel.funnel_type === 'Projects' && setProjectsFunnel(funnel);
          funnel.funnel_type === 'Projects' &&
            setProjectsFunnelStages(funnel.stages.sort(compareStageOrder));
          funnel.funnel_type === 'Financial' && setFinancialFunnel(funnel);
          funnel.funnel_type === 'Financial' &&
            setFinancialFunnelStages(funnel.stages.sort(compareStageOrder));
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
  }, [addToast, company, compareStageOrder]);

  const handleFunnelCardInfoFieldWindow = useCallback(
    (props: IFunnelDTO) => {
      setSelectedFunnel(props);
      setFunnelCardInfoFieldWindow(!funnelCardInfoFieldWindow);
    },
    [funnelCardInfoFieldWindow],
  );
  const handleCloseFunnelCardInfoFieldWindow = useCallback(() => {
    setFunnelCardInfoFieldWindow(false);
  }, []);

  useEffect(() => {
    getFunnels();
  }, [getFunnels]);

  useEffect(() => {
    const ciaComercialAccess = modules.find(
      xModule => xModule.management_module === 'Comercial',
    );
    setCompanyComercialAccess(!!ciaComercialAccess);
    const ciaOperationsAccess = modules.find(
      xModule => xModule.management_module === 'Operations',
    );
    setCompanyOperationsAccess(!!ciaOperationsAccess);
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
      {!!funnelCardInfoFieldWindow && (
        <FunnelDefaultCardInfoWindow
          funnel={selectedFunnel}
          getFunnels={getFunnels}
          handleCloseWindow={handleCloseFunnelCardInfoFieldWindow}
          onHandleCloseWindow={() => setFunnelCardInfoFieldWindow(false)}
        />
      )}
      <Container>
        {companyComercialAccess && (
          <Funnel isActive={false}>
            <h3>{comercialFunnel.name}</h3>
            <span>
              <button
                type="button"
                onClick={() => handleFunnelCardInfoFieldWindow(comercialFunnel)}
              >
                Informações
              </button>
            </span>
            <span>
              <button
                type="button"
                onClick={() => handleFunnelCardInfoFieldWindow(comercialFunnel)}
              >
                Tarefas
              </button>
            </span>
            <span>
              <button
                type="button"
                onClick={() =>
                  setComercialStagesSection(!comercialStagesSection)
                }
              >
                Etapas
                {comercialStagesSection ? (
                  <FiChevronUp size={24} />
                ) : (
                  <FiChevronDown size={24} />
                )}
              </button>
            </span>
          </Funnel>
        )}
        {comercialStagesSection && (
          <StageSection>
            {comercialFunnelStages.length > 0 &&
              comercialFunnelStages.map(stage => (
                <StageFunnel isActive={false}>
                  <p>{stage.funnel_order}° </p>
                  <h3>{stage.name}</h3>
                </StageFunnel>
              ))}
          </StageSection>
        )}
        {companyOperationsAccess && (
          <Funnel isActive={false}>
            <h3>{operationsFunnel.name}</h3>
            <span>
              <button
                type="button"
                onClick={() =>
                  handleFunnelCardInfoFieldWindow(operationsFunnel)
                }
              >
                Informações
              </button>
            </span>
            <span>
              <button
                type="button"
                onClick={() =>
                  handleFunnelCardInfoFieldWindow(operationsFunnel)
                }
              >
                Tarefas
              </button>
            </span>
            <span>
              <button
                type="button"
                onClick={() =>
                  setOperationsStagesSection(!operationsStagesSection)
                }
              >
                Etapas
                {operationsStagesSection ? (
                  <FiChevronUp size={24} />
                ) : (
                  <FiChevronDown size={24} />
                )}
              </button>
            </span>
          </Funnel>
        )}
        {operationsStagesSection && (
          <StageSection>
            {operationsFunnelStages.length > 0 &&
              operationsFunnelStages.map(stage => (
                <StageFunnel isActive={false}>
                  <h3>{stage.name}</h3>
                </StageFunnel>
              ))}
          </StageSection>
        )}
        {companyProjectsAccess && (
          <Funnel isActive={false}>
            <h3>{projectsFunnel.name}</h3>
            <span>
              <button
                type="button"
                onClick={() => handleFunnelCardInfoFieldWindow(projectsFunnel)}
              >
                Informações
              </button>
            </span>
            <span>
              <button
                type="button"
                onClick={() => handleFunnelCardInfoFieldWindow(projectsFunnel)}
              >
                Tarefas
              </button>
            </span>
            <span>
              <button
                type="button"
                onClick={() => setProjectsStagesSection(!projectsStagesSection)}
              >
                Etapas
                {projectsStagesSection ? (
                  <FiChevronUp size={24} />
                ) : (
                  <FiChevronDown size={24} />
                )}
              </button>
            </span>
          </Funnel>
        )}
        {projectsStagesSection && (
          <StageSection>
            {projectsFunnelStages.length > 0 &&
              projectsFunnelStages.map(stage => (
                <StageFunnel isActive={false}>
                  <h3>{stage.name}</h3>
                </StageFunnel>
              ))}
          </StageSection>
        )}
        {companyFinancialAccess && (
          <Funnel isActive={false}>
            <h3>{financialFunnel.name}</h3>
            <span>
              <button
                type="button"
                onClick={() => handleFunnelCardInfoFieldWindow(financialFunnel)}
              >
                Informações
              </button>
            </span>
            <span>
              <button
                type="button"
                onClick={() => handleFunnelCardInfoFieldWindow(financialFunnel)}
              >
                Tarefas
              </button>
            </span>
            <span>
              <button
                type="button"
                onClick={() =>
                  setFinancialStagesSection(!financialStagesSection)
                }
              >
                Etapas
                {financialStagesSection ? (
                  <FiChevronUp size={24} />
                ) : (
                  <FiChevronDown size={24} />
                )}
              </button>
            </span>
          </Funnel>
        )}
        {financialStagesSection && (
          <StageSection>
            {financialFunnelStages.length > 0 &&
              financialFunnelStages.map(stage => (
                <StageFunnel isActive={false}>
                  <h3>{stage.name}</h3>
                </StageFunnel>
              ))}
          </StageSection>
        )}
      </Container>
    </>
  );
};

export default FunnelManagementSection;
