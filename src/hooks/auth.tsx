import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface IUser {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  isCompany: boolean;
}

interface IAuthState {
  token: string;
  user: IUser;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUser;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: IUser): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@WePlan:token');
    const rawUser = localStorage.getItem('@WePlan:user');
    const userMasters = localStorage.getItem('@WePlan:userMasters');

    if (rawUser) {
      const user = JSON.parse(rawUser);
      if ((token && user.isCompany) || (token && userMasters)) {
        api.defaults.headers.authorization = `Bearer ${token}`;

        return {
          token,
          user,
        };
      }
    }
    return {} as IAuthState;
  });

  const signOut = useCallback(() => {
    localStorage.removeItem('@WePlan:token');
    localStorage.removeItem('@WePlan:user');
    localStorage.removeItem('@WePlan:userMasters');
    localStorage.removeItem('@WePlan:enterprise');

    setData({} as IAuthState);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.isCompany) {
      const findSupplier = await api.get(`/suppliers/masters/user/${user.id}`);
      const isSupplier = findSupplier.data[0];
      if (!isSupplier) {
        throw new Error('user not found');
      }
      console.log(isSupplier);
      localStorage.setItem('@WePlan:userMasters', JSON.stringify(isSupplier));
    }
    localStorage.setItem('@WePlan:token', token);
    localStorage.setItem('@WePlan:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const updateUser = useCallback(
    (updatedUser: IUser) => {
      localStorage.setItem('@WePlan:user', JSON.stringify(updatedUser));

      setData({
        token: data.token,
        user: updatedUser,
      });
    },
    [data],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
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
