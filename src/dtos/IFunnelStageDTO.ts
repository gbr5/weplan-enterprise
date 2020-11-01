import IStageCardDTO from './IStageCardDTO';

export default interface IFunnelStageDTO {
  id: string;
  name: string;
  funnel_order: string;
  cards: IStageCardDTO[];
}
