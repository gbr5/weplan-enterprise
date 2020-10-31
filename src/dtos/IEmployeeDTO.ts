interface IUserEmployee {
  id: string;
  name: string;
}
interface ICompany {
  id: string;
  name: string;
  avatar_url: string;
}

interface IModulesDTO {
  management_module_id: string;
  access_level: number;
}

interface IEmployeeConfirmationDTO {
  id: string;
  request_message: string;
  isConfirmed: boolean;
  salary: number;
}

export default interface IEmployeeDTO {
  id: string;
  position: string;
  access_key: string;
  email: string;
  isActive: boolean;
  employee: IUserEmployee;
  company: ICompany;
  // modules: IModulesDTO[];
  // confirmation: IEmployeeConfirmationDTO;
}
