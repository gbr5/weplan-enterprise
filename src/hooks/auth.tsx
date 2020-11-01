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
    const token = localStorage.getItem(`@WP-Enterprise:token`);
    const userMaster = localStorage.getItem(`@WP-Enterprise:userMaster`);
    const company = localStorage.getItem(`@WP-Enterprise:company`);
    const companyInfo = localStorage.getItem(`@WP-Enterprise:companyInfo`);
    const person = localStorage.getItem(`@WP-Enterprise:person`);
    const personInfo = localStorage.getItem(`@WP-Enterprise:personInfo`);
    const modules = localStorage.getItem(`@WP-Enterprise:modules`);

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
    localStorage.removeItem(`@WP-Enterprise:token`);
    localStorage.removeItem(`@WP-Enterprise:userMaster`);
    localStorage.removeItem(`@WP-Enterprise:company`);
    localStorage.removeItem(`@WP-Enterprise:companyInfo`);
    localStorage.removeItem(`@WP-Enterprise:person`);
    localStorage.removeItem(`@WP-Enterprise:personInfo`);
    localStorage.removeItem(`@WP-Enterprise:modules`);

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

    localStorage.setItem(`@WP-Enterprise:token`, token);
    localStorage.setItem(
      `@WP-Enterprise:userMaster`,
      JSON.stringify({
        id: userMaster.id,
        email: userMaster.email,
      }),
    );
    localStorage.setItem(
      `@WP-Enterprise:person`,
      JSON.stringify({
        id: person.id,
        name: person.name,
        email: person.email,
        avatar_url: person.avatar_url,
      }),
    );
    localStorage.setItem(
      `@WP-Enterprise:personInfo`,
      JSON.stringify({
        first_name: personInfo.first_name,
        last_name: personInfo.last_name,
        person_id: personInfo.person_id,
      }),
    );
    localStorage.setItem(
      `@WP-Enterprise:company`,
      JSON.stringify({
        id: company.id,
        name: company.name,
        email: company.email,
        avatar_url: company.avatar_url,
      }),
    );
    localStorage.setItem(
      `@WP-Enterprise:companyInfo`,
      JSON.stringify({
        name: companyInfo.name,
        logo_url: companyInfo.logo_url,
        company_id: companyInfo.company_id,
      }),
    );
    localStorage.setItem(`@WP-Enterprise:modules`, JSON.stringify(modules));

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
      localStorage.setItem(
        `@WP-Enterprise:company`,
        JSON.stringify(updatedUser),
      );

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
      localStorage.setItem(
        `@WP-Enterprise:userMaster`,
        JSON.stringify(updatedUser),
      );

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
        `@WP-Enterprise:companyInfo`,
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
      localStorage.setItem(
        `@WP-Enterprise:modules`,
        JSON.stringify(updatedModules),
      );

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
