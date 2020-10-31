interface ICompanyInfoDTO {
  id: string;
  name: string;
  company_id: string;
  logo_url: string;
  updated_at: Date;
}

interface IWPModulesDTO {
  id: string;
  name: string;
  quantity: number;
}

export default interface IEnterpriseDTO {
  id: string;
  companyInfo: ICompanyInfoDTO;
  name: string;
  avatar_url: string;
  email: string;
  modules: IWPModulesDTO[];
  isWPMarketPlace: boolean;
}
