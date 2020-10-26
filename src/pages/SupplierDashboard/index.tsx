import React, { useCallback, useEffect, useState } from 'react';

import { Container } from './styles';

import CompanyDashboard from '../../components/CompanyDashboard';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

interface ICompanyInfoDTO {
  id: string;
  name: string;
  company_id: string;
  updated_at: Date;
}
interface IMasterInfoDTO {
  id: string;
  isConfirmed: boolean;
  company: {
    id: string;
    name: string;
    avatar_url: string;
    email: string;
  };
}
interface IProductDTO {
  id: string;
  name: string;
}
interface IWPModulesDTO {
  id: string;
  name: string;
  quantity: number;
}
interface IEnterprise {
  id: string;
  companyInfo: ICompanyInfoDTO;
  name: string;
  modules: IWPModulesDTO;
  isWPMarketPlace: boolean;
}

const SupplierDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  // const findEnterprise = localStorage.getItem('@WePlan:enterprise');
  // const [enterprise, setEnterprise] = useState<IEnterprise>(
  //   findEnterprise === null ? ({} as IEnterprise) : JSON.parse(findEnterprise),
  // );
  // const [company, setCompany] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<ICompanyInfoDTO>(
    {} as ICompanyInfoDTO,
  );
  console.log(companyInfo);

  const getCompanyInfo = useCallback(async () => {
    try {
      if (user.isCompany) {
        const response = await api.get(`company-info/${user.id}`);
        setCompanyInfo(response.data);
      } else {
        const master = localStorage.getItem('@WePlan:userMasters');
        if (master !== null) {
          const masterUser: IMasterInfoDTO = JSON.parse(master);
          console.log(masterUser);
          // Tem que refazer essa parte abaixo, pois virá um array
          if (masterUser.company !== undefined) {
            const response = await api.get(
              `company-info/${masterUser.company.id}`,
            );
            setCompanyInfo(response.data);
          } else {
            signOut();
          }
        } else {
          signOut();
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  }, [user, signOut]);

  useEffect(() => {
    getCompanyInfo();
  }, [getCompanyInfo]);

  // localStorage.setItem('@WePlan:master', JSON.stringify();

  return (
    <Container>
      <CompanyDashboard />
    </Container>
  );
};

export default SupplierDashboard;
