import IFunnelCardInfoFieldDTO from './IFunnelCardInfoFieldDTO';
import IFunnelStageDTO from './IFunnelStageDTO';

export default interface IFunnelDTO {
  id: string;
  name: string;
  funnel_type: string;
  stages: IFunnelStageDTO[];
  company_funnel_card_info_fields: IFunnelCardInfoFieldDTO[];
}
