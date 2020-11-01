import React, { useCallback, useState, useContext } from 'react';
import Swicth from 'react-switch';
import { ThemeContext } from 'styled-components';

import { useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { Header, HeaderContent, Menu, ToggleButton } from './styles';
import { useToggleTheme } from '../../hooks/theme';

import supplierlogo from '../../assets/elefante.png';
import logo from '../../assets/weplan.svg';
import { useAuth } from '../../hooks/auth';

import WindowContainer from '../WindowContainer';

interface ICompanyInfoDTO {
  id: string;
  name: string;
  logo: string;
}

const SupplierPageHeader: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const history = useHistory();
  const { company, companyInfo, signOut } = useAuth();

  const [helpWindow, setHelpWindow] = useState(false);
  const [settingsWindow, setSettingsWindow] = useState(false);
  // const [supplierLogo, setSupplierLogo] = useState('');

  const { toggleTheme, themeBoolean } = useToggleTheme();

  const handleNavigateToDashboard = useCallback(() => {
    history.push('/dashboard');
  }, [history]);

  const companyLogo = companyInfo.logo_url
    ? companyInfo.logo_url
    : supplierlogo;

  return (
    <>
      <Header>
        <HeaderContent>
          <img src={companyLogo} alt="WePlanPRO" />

          <button type="button" onClick={handleNavigateToDashboard}>
            <img src={logo} alt="WePlan" />
            <h1>PRO</h1>
          </button>

          <h2>{company.name}</h2>
          <Menu>
            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </Menu>
        </HeaderContent>
      </Header>
      {!!helpWindow && (
        <WindowContainer
          onHandleCloseWindow={() => setHelpWindow(false)}
          containerStyle={{
            top: '2%',
            left: '5%',
            height: '96%',
            width: '90%',
          }}
        >
          <h1>Opções de ajuda</h1>
        </WindowContainer>
      )}
      {!!settingsWindow && (
        <WindowContainer
          onHandleCloseWindow={() => setSettingsWindow(false)}
          containerStyle={{
            top: '100px',
            right: '8px',
            height: '200px',
            width: '250px',
          }}
        >
          <ToggleButton>
            <h3>Tema {themeBoolean ? 'Escuro' : 'Claro'}</h3>
            <Swicth
              onChange={toggleTheme}
              checked={themeBoolean}
              checkedIcon={false}
              uncheckedIcon={false}
              height={10}
              width={40}
              handleDiameter={20}
              offColor={colors.secondary}
              onColor={colors.primary}
            />
          </ToggleButton>
        </WindowContainer>
      )}
    </>
  );
};

export default SupplierPageHeader;
