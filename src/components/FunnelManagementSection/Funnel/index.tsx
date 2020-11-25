import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useAuth } from '../../../hooks/auth';

import IFunnelDTO from '../../../dtos/IFunnelDTO';

import { Container, StageFunnel, StageSection } from './styles';
import api from '../../../services/api';
import FunnelDefaultCardInfoWindow from '../../FunnelDefaultCardInfoWindow';
import IFunnelStageDTO from '../../../dtos/IFunnelStageDTO';

interface IProps {
  funnel: IFunnelDTO;
  isActive: boolean;
  getFunnels: Function;
}

const Funnel: React.FC<IProps> = ({ funnel, getFunnels, isActive }: IProps) => {
  const { company } = useAuth();

  const [funnelStagesSection, setFunnelStagesSection] = useState(false);
  const [funnelStages, setFunnelStages] = useState<IFunnelStageDTO[]>([]);

  const [funnelCardInfoFieldWindow, setFunnelCardInfoFieldWindow] = useState(
    true,
  );

  const handleFunnelCardInfoFieldWindow = useCallback(() => {
    setFunnelCardInfoFieldWindow(true);
  }, []);
  const handleCloseFunnelCardInfoFieldWindow = useCallback(() => {
    setFunnelCardInfoFieldWindow(false);
  }, []);

  const createFunnelCardDefaultInfoField = useCallback(async () => {
    try {
      if (funnel.funnel_type === 'Comercial') {
        await api.post(`/comercial/funnel`, {
          company_id: company.id,
          funnel_id: funnel.id,
        });
      }
      if (funnel.funnel_type === 'Production') {
        await api.post(`/production/funnel`, {
          company_id: company.id,
          funnel_id: funnel.id,
        });
      }
      if (funnel.funnel_type === 'Projects') {
        await api.post(`/projects/funnel`, {
          company_id: company.id,
          funnel_id: funnel.id,
        });
      }
      if (funnel.funnel_type === 'Financial') {
        await api.post(`/financial/funnel`, {
          company_id: company.id,
          funnel_id: funnel.id,
        });
      }
      getFunnels();
    } catch (err) {
      throw new Error(err);
    }
  }, [funnel, company, getFunnels]);

  useEffect(() => {
    if (funnel.company_funnel_card_info_fields === undefined) {
      createFunnelCardDefaultInfoField();
    }
  }, [funnel, createFunnelCardDefaultInfoField]);

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
  useEffect(() => {
    if (funnel.stages) {
      const sortedStages = funnel.stages.sort(compareStageOrder);
      setFunnelStages(sortedStages);
    }
  }, [funnel, compareStageOrder]);

  return (
    <>
      {!!funnelCardInfoFieldWindow && (
        <FunnelDefaultCardInfoWindow
          funnel={funnel}
          getFunnels={getFunnels}
          handleCloseWindow={handleCloseFunnelCardInfoFieldWindow}
          onHandleCloseWindow={() => setFunnelCardInfoFieldWindow(false)}
        />
      )}
      {funnelStagesSection && funnelStages && (
        <StageSection>
          {funnelStages.length > 0 &&
            funnelStages.map(stage => (
              <StageFunnel isActive={false}>
                <p>{stage.funnel_order}° </p>
                <h3>{stage.name}</h3>
              </StageFunnel>
            ))}
        </StageSection>
      )}
      <Container isActive={isActive}>
        <h3>{funnel.name}</h3>
        <span>
          <button type="button" onClick={handleFunnelCardInfoFieldWindow}>
            Informações
          </button>
        </span>
        <span>
          <button type="button" onClick={handleFunnelCardInfoFieldWindow}>
            Tarefas
          </button>
        </span>
        <span>
          <button
            type="button"
            onClick={() => setFunnelStagesSection(!funnelStagesSection)}
          >
            Etapas
            {funnelStagesSection ? (
              <FiChevronUp size={24} />
            ) : (
              <FiChevronDown size={24} />
            )}
          </button>
        </span>
      </Container>
    </>
  );
};

export default Funnel;
