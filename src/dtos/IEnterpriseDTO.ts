interface ICompanyInfoDTO {
  id: string;
  name: string;
  company_id: string;
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
  modules: IWPModulesDTO;
  isWPMarketPlace: boolean;
}
