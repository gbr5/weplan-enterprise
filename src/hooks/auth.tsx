import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface ICompanyInfo {
  id: string;
  name: string;
  company_id: string;
  logo_url?: string;
}
interface IPersonInfo {
  first_name: string;
  last_name: string;
  person_id: string;
}

interface IManagementModule {
  management_module: string;
}
interface IUser {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
}

interface ICompanyMaster {
  id: string;
  email: string;
  // masterUser: IUser;
  // company: IUser;
}

interface IAuthState {
  token: string;
  userMaster: ICompanyMaster;
  modules: IManagementModule[];
  companyInfo: ICompanyInfo;
  company: IUser;
  person: IUser;
  personInfo: IPersonInfo;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  userMaster: ICompanyMaster;
  companyInfo: ICompanyInfo;
  company: IUser;
  person: IUser;
  personInfo: IPersonInfo;
  modules: IManagementModule[];
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
  updateUserMaster(userMaster: ICompanyMaster): void;
  updateCompanyInfo(companyInfo: ICompanyInfo): void;
  updateCompany(company: IUser): void;
  updateModules(modules: IManagementModule[]): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@WePlan:token');
    const userMaster = localStorage.getItem('@WePlan:userMaster');
    const company = localStorage.getItem('@WePlan:company');
    const companyInfo = localStorage.getItem('@WePlan:companyInfo');
    const person = localStorage.getItem('@WePlan:person');
    const personInfo = localStorage.getItem('@WePlan:personInfo');
    const modules = localStorage.getItem('@WePlan:modules');

    if (
      token &&
      userMaster &&
      person &&
      personInfo &&
      company &&
      companyInfo &&
      modules
    ) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        userMaster: JSON.parse(userMaster),
        companyInfo: JSON.parse(companyInfo),
        company: JSON.parse(company),
        person: JSON.parse(person),
        personInfo: JSON.parse(personInfo),
        modules: JSON.parse(modules),
      };
    }

    return {} as IAuthState;
  });

  const signOut = useCallback(() => {
    localStorage.removeItem('@WePlan:token');
    localStorage.removeItem('@WePlan:userMaster');
    localStorage.removeItem('@WePlan:company');
    localStorage.removeItem('@WePlan:companyInfo');
    localStorage.removeItem('@WePlan:person');
    localStorage.removeItem('@WePlan:personInfo');
    localStorage.removeItem('@WePlan:modules');

    setData({} as IAuthState);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions/enterprise', {
      email,
      password,
    });

    const {
      token,
      userMaster,
      person,
      personInfo,
      company,
      companyInfo,
      modules,
    } = response.data;

    localStorage.setItem('@WePlan:token', token);
    localStorage.setItem(
      '@WePlan:userMaster',
      JSON.stringify({
        id: userMaster.id,
        email: userMaster.email,
      }),
    );
    localStorage.setItem(
      '@WePlan:person',
      JSON.stringify({
        id: person.id,
        name: person.name,
        email: person.email,
        avatar_url: person.avatar_url,
      }),
    );
    localStorage.setItem(
      '@WePlan:personInfo',
      JSON.stringify({
        first_name: personInfo.first_name,
        last_name: personInfo.last_name,
        person_id: personInfo.person_id,
      }),
    );
    localStorage.setItem(
      '@WePlan:company',
      JSON.stringify({
        id: company.id,
        name: company.name,
        email: company.email,
        avatar_url: company.avatar_url,
      }),
    );
    localStorage.setItem(
      '@WePlan:companyInfo',
      JSON.stringify({
        name: company.name,
        logo_url: company.logo_url,
        company_id: company.company_id,
      }),
    );
    localStorage.setItem('@WePlan:modules', JSON.stringify(modules));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({
      token,
      userMaster,
      personInfo,
      companyInfo,
      modules,
      company,
      person,
    });
  }, []);

  const updateCompany = useCallback(
    (updatedUser: IUser) => {
      localStorage.setItem('@WePlan:company', JSON.stringify(updatedUser));

      setData({
        token: data.token,
        userMaster: data.userMaster,
        companyInfo: data.companyInfo,
        company: updatedUser,
        person: data.person,
        personInfo: data.personInfo,
        modules: data.modules,
      });
    },
    [data],
  );
  const updateUserMaster = useCallback(
    (updatedUser: ICompanyMaster) => {
      localStorage.setItem('@WePlan:userMaster', JSON.stringify(updatedUser));

      setData({
        token: data.token,
        userMaster: updatedUser,
        companyInfo: data.companyInfo,
        company: data.company,
        person: data.person,
        personInfo: data.personInfo,
        modules: data.modules,
      });
    },
    [data],
  );
  const updateCompanyInfo = useCallback(
    (updatedCompanyInfo: ICompanyInfo) => {
      localStorage.setItem(
        '@WePlan:companyInfo',
        JSON.stringify(updatedCompanyInfo),
      );

      setData({
        token: data.token,
        userMaster: data.userMaster,
        companyInfo: updatedCompanyInfo,
        company: data.company,
        person: data.person,
        personInfo: data.personInfo,
        modules: data.modules,
      });
    },
    [data],
  );
  const updateModules = useCallback(
    (updatedModules: IManagementModule[]) => {
      localStorage.setItem('@WePlan:modules', JSON.stringify(updatedModules));

      setData({
        token: data.token,
        userMaster: data.userMaster,
        companyInfo: data.companyInfo,
        company: data.company,
        person: data.person,
        personInfo: data.personInfo,
        modules: updatedModules,
      });
    },
    [data],
  );

  return (
    <AuthContext.Provider
      value={{
        userMaster: data.userMaster,
        modules: data.modules,
        companyInfo: data.companyInfo,
        company: data.company,
        person: data.person,
        personInfo: data.personInfo,
        signIn,
        signOut,
        updateUserMaster,
        updateCompany,
        updateCompanyInfo,
        updateModules,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must bu used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
