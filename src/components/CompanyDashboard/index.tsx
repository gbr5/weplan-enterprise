import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { MdPersonAdd } from 'react-icons/md';
import { FiUpload, FiChevronsRight, FiEdit3, FiEye } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import IEmployeeDTO from '../../dtos/IEmployeeDTO';

import {
  Container,
  SideMenu,
  WorkStation,
  Section,
  EmployeeScrollList,
  CompanyInfoList,
  FirstRow,
  SecondRow,
  AvatarInput,
  ImageContainer,
  EmployeeSection,
  ConfirmedEmployeeSection,
  UnConfirmedEmployeeSection,
} from './styles';
import AddEmployeeWindow from '../AddEmployeeWindow';
// import WPContractOrderForm from '../WPContractOrderForm';
import logo from '../../assets/elefante.png';
import WindowContainer from '../WindowContainer';
import IUserDTO from '../../dtos/IUserDTO';
import EditCompanyInfoInput from '../EditCompanyInfoInput';
import AddMasterUserWindow from '../AddMasterUserWindow';
import { useToast } from '../../hooks/toast';
import SupplierPageHeader from '../SupplierPageHeader';
import EditCompanyEmployeeForm from '../EditCompanyEmployeeForm';
import WPContractOrderForm from '../WPContractOrderForm';
import FunnelManagementSection from '../FunnelManagementSection';

interface IUserEmployeeDTO {
  id: string;
  name: string;
  position: string;
  access_key: string;
  email: string;
  isActive: boolean;
  employee_id: string;
}
interface IWPProduct {
  id: string;
  name: string;
  target_audience: string;
  price: string;
}

interface IOrderProduct {
  id: string;
  weplanProduct: IWPProduct;
  quantity: number;
  price: string;
}

interface IWPContractOrder {
  id: string;
  created_at: Date;
  customer: IUserDTO;
  products: IOrderProduct[];
}

interface IContractWPModulesDTO {
  id: string;
  management_module: string;
}

interface IMasterUserDTO {
  id: string;
  masterUser: {
    id: string;
    name: string;
  };
  isConfirmed: boolean;
}

interface ICompanyInformationDTO {
  user_id: string;
  userName: string;
  email: string;
  companyName: string;
  company_info_id: string;
  companyID: string;
  phone: number;
}

const CompanyDashboard: React.FC = () => {
  const {
    company,
    companyInfo,
    modules,
    updateCompany,
    updateCompanyInfo,
    updateModules,
  } = useAuth();

  const { addToast } = useToast();
  // 1
  const [companyNameInput, setCompanyNameInput] = useState(false);
  // 2
  const [companyIDInput, setCompanyIDInput] = useState(false);
  // 3
  const [companyUserNameInput, setCompanyUserNameInput] = useState(false);
  // 4
  const [companyEmailInput, setCompanyEmailInput] = useState(false);
  // 5
  const [companyPhoneInput, setCompanyPhoneInput] = useState(false);
  const [companyInformation, setCompanyInformation] = useState(
    {} as ICompanyInformationDTO,
  );

  const [dashboardTitle, setDashboardTitle] = useState(
    'Informações da Empresa',
  );
  const [companyPhone, setCompanyPhone] = useState(0);

  const [wpModules, setWPModules] = useState<IContractWPModulesDTO[]>();

  const [marketPlace, setMarketPlace] = useState(false);
  const [masterUsers, setMasterUsers] = useState<IMasterUserDTO[]>([]);

  const [employees, setEmployees] = useState<IEmployeeDTO[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState(
    {} as IUserEmployeeDTO,
  );
  const [notActiveEmployees, setNotActiveEmployees] = useState<IEmployeeDTO[]>(
    [],
  );
  // 1
  const [companyInfoSection, setCompanyInfoSection] = useState(false);
  // 2
  const [employeesSection, setEmployeesSection] = useState(false);
  const [funnelsSection, setFunnelsSection] = useState(true);
  // 3
  const [financialSection, setFinancialSection] = useState(false);
  // 4
  const [advancedOptionsSection, setAdvancedOptionsSection] = useState(false);
  // 5
  const [helpSection, setHelpSection] = useState(false);
  // 6
  const [documentationSection, setDocumentationSection] = useState(false);
  // 7
  const [
    chooseWPproductMessageWindow,
    setChooseWPproductMessageWindow,
  ] = useState(false);
  // 8
  const [addEmployeeMessageWindow, setAddEmployeeMessageWindow] = useState(
    false,
  );
  // 9
  const [emailSentMessageWindow, setEmailSentMessageWindow] = useState(false);
  // 10
  const [contractOrderWindow, setContractOrderWindow] = useState(false);
  // 11
  const [addEmployeeWindow, setAddEmployeeWindow] = useState(false);
  // 12
  const [editEmployeeWindow, setEditEmployeeWindow] = useState(false);
  // 13
  const [addMasterUserWindow, setAddMasterUserWindow] = useState(false);
  // 14
  const handleCloseCompanyInfoInput = useCallback(() => {
    setCompanyNameInput(false);
    setCompanyIDInput(false);
    setCompanyUserNameInput(false);
    setCompanyEmailInput(false);
    setCompanyPhoneInput(false);
  }, []);

  const closeAllWindow = useCallback(() => {
    // 1 -1
    setCompanyInfoSection(false);
    // 2 -1
    setEmployeesSection(false);
    setFunnelsSection(false);
    // 3 -1
    setFinancialSection(false);
    // 4 -1
    setAdvancedOptionsSection(false);
    // 5 -1
    setHelpSection(false);
    // 6 -1
    setDocumentationSection(false);
    // 7 -2
    setEmailSentMessageWindow(false);
    // 8 -2
    setChooseWPproductMessageWindow(false);
    // 9 -2
    setAddEmployeeMessageWindow(false);
    // 10 -3
    setEditEmployeeWindow(false);
    // 11 -3
    setContractOrderWindow(false);
    // 12 -3
    setAddEmployeeWindow(false);
    // 13 -3
    setAddMasterUserWindow(false);
    // 14 -4
    handleCloseCompanyInfoInput();
  }, [handleCloseCompanyInfoInput]);
  const handleCloseAllWindowAndVariables = useCallback(() => {
    closeAllWindow();
    setAddEmployeeWindow(false);
    setSelectedEmployee({} as IUserEmployeeDTO);
  }, [closeAllWindow]);
  const handleContractOrderWindow = useCallback(() => {
    closeAllWindow();
    setContractOrderWindow(true);
    setFinancialSection(true);
  }, [closeAllWindow]);
  const handleInitialWindow = useCallback(() => {
    closeAllWindow();
    setCompanyInfoSection(true);
  }, [closeAllWindow]);
  const handleEmployeesWindow = useCallback(() => {
    closeAllWindow();
    setEmployeesSection(true);
  }, [closeAllWindow]);
  const handleFunnelsWindow = useCallback(() => {
    closeAllWindow();
    setFunnelsSection(true);
  }, [closeAllWindow]);
  const handleFinanceWindow = useCallback(() => {
    closeAllWindow();
    setFinancialSection(true);
  }, [closeAllWindow]);
  const handleAdvancedOptionsWindow = useCallback(() => {
    closeAllWindow();
    setAdvancedOptionsSection(true);
  }, [closeAllWindow]);
  const handleHelpDashboard = useCallback(() => {
    closeAllWindow();
    setHelpSection(true);
  }, [closeAllWindow]);
  const handleDocumentationDashboard = useCallback(() => {
    closeAllWindow();
    setDocumentationSection(true);
  }, [closeAllWindow]);

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch(`/users/avatar/${company.id}`, data).then(response => {
          updateCompany(response.data);
        });
        addToast({
          type: 'success',
          title: 'Avatar atualizado com sucesso.',
        });
      } else {
        addToast({
          type: 'error',
          title: 'Erro ao editar avatar',
          description: 'Erro ao avatar da empresa, tente novamente.',
        });
      }
    },
    [addToast, updateCompany, company],
  );

  const handleEditEmployeeFormWindow = useCallback((props: IEmployeeDTO) => {
    setSelectedEmployee({
      id: props.id,
      name: props.employee.name,
      access_key: props.access_key,
      email: props.email,
      position: props.position,
      isActive: props.isActive,
      employee_id: props.employee.id,
    });
    setEditEmployeeWindow(true);
  }, []);
  const getCompanyWPContractOrders = useCallback(() => {
    try {
      api
        .get<IWPContractOrder[]>(`/wp/contract-orders/${company.id}`)
        .then(response => {
          if (response.data.length <= 0) {
            setChooseWPproductMessageWindow(true);
          }
          const sortModules: IContractWPModulesDTO[] = [];
          response.data.map(hModule => {
            hModule.products.map(mProduct => {
              const pName = mProduct.weplanProduct.name;
              if (
                pName === 'Comercial' ||
                pName === 'Operations' ||
                pName === 'Financial' ||
                pName === 'Projects'
              ) {
                const findModules = sortModules.find(
                  sModule => sModule.management_module === pName,
                );
                if (findModules === undefined) {
                  sortModules.push({
                    id: mProduct.weplanProduct.id,
                    management_module: mProduct.weplanProduct.name,
                  });
                }
              } else {
                setMarketPlace(true);
              }
              return mProduct;
            });
            return sortModules;
          });
          sortModules.map(sortedModule => {
            const foundModule = modules.find(
              thisModule =>
                thisModule.management_module === sortedModule.management_module,
            );
            if (foundModule === undefined) {
              throw new Error('Module no found');
            }
            return sortedModule;
          });
          updateModules(sortModules);
          // setCompanyWPContracts(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [company, modules, updateModules]);

  const getCompanyFunnels = useCallback(() => {
    try {
      api
        .get<IWPContractOrder[]>(`/wp/contract-orders/${company.id}`)
        .then(response => {
          if (response.data.length <= 0) {
            setChooseWPproductMessageWindow(true);
          }
          const sortModules: IContractWPModulesDTO[] = [];
          response.data.map(hModule => {
            hModule.products.map(mProduct => {
              const pName = mProduct.weplanProduct.name;
              if (
                pName === 'Comercial' ||
                pName === 'Operations' ||
                pName === 'Financial' ||
                pName === 'Projects'
              ) {
                const findModules = sortModules.find(
                  sModule => sModule.management_module === pName,
                );
                if (findModules === undefined) {
                  sortModules.push({
                    id: mProduct.weplanProduct.id,
                    management_module: mProduct.weplanProduct.name,
                  });
                }
              } else {
                setMarketPlace(true);
              }
              return mProduct;
            });
            return sortModules;
          });
          sortModules.map(sortedModule => {
            const foundModule = modules.find(
              thisModule =>
                thisModule.management_module === sortedModule.management_module,
            );
            if (foundModule === undefined) {
              api.post(`funnels/${company.id}`, {
                name: 'first',
                funnel_type: sortedModule.management_module,
              });
            }
            return sortedModule;
          });
          // setCompanyWPContracts(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [company, modules]);
  useEffect(() => {
    getCompanyFunnels();
  }, [getCompanyFunnels]);

  const getCompanyEmployees = useCallback(() => {
    try {
      api
        .get<IEmployeeDTO[]>(`supplier-employees/${company.id}`)
        .then(response => {
          if (response.data.length <= 0) {
            setAddEmployeeMessageWindow(true);
          }
          setNotActiveEmployees(
            response.data
              .map(tEmployee => {
                return {
                  id: tEmployee.id,
                  employee: tEmployee.employee,
                  company: tEmployee.company,
                  position: tEmployee.position,
                  access_key: tEmployee.access_key,
                  isActive: tEmployee.isActive,
                  email: tEmployee.email,
                };
              })
              .filter(tEmployee => tEmployee.isActive === false),
          );
          setEmployees(
            response.data
              .map(tEmployee => {
                return {
                  id: tEmployee.id,
                  employee: tEmployee.employee,
                  company: tEmployee.company,
                  position: tEmployee.position,
                  access_key: tEmployee.access_key,
                  isActive: tEmployee.isActive,
                  email: tEmployee.email,
                };
              })
              .filter(tEmployee => tEmployee.isActive === true),
          );
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [company]);

  useEffect(() => {
    getCompanyEmployees();
  }, [getCompanyEmployees]);
  const updateCompanyEmployees = useCallback(() => {
    setAddEmployeeWindow(false);
    setEditEmployeeWindow(false);
    setSelectedEmployee({} as IUserEmployeeDTO);
    getCompanyEmployees();
  }, [getCompanyEmployees]);
  const getCompanyMasterUsers = useCallback(() => {
    try {
      api
        .get<IMasterUserDTO[]>(`suppliers/master/users/${company.id}`)
        .then(response => {
          if (response.data.length <= 0) {
            setAddMasterUserWindow(true);
          }

          setMasterUsers(
            response.data
              .map(tMasterUser => {
                return {
                  id: tMasterUser.id,
                  masterUser: tMasterUser.masterUser,
                  isConfirmed: tMasterUser.isConfirmed,
                };
              })
              .filter(master => master.isConfirmed === true),
          );
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [company]);

  useEffect(() => {
    getCompanyMasterUsers();
  }, [getCompanyMasterUsers]);

  const getWPManagementModules = useCallback(() => {
    try {
      api
        .get<IContractWPModulesDTO[]>('wp-management-modules')
        .then(response => {
          setWPModules(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    getWPManagementModules();
  }, [getWPManagementModules]);

  const getCompanyContactInfo = useCallback(() => {
    try {
      api.get(`/profile/contact-info/${company.id}/phone`).then(response => {
        setCompanyPhone(response.data.contact_info);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [company]);

  useEffect(() => {
    getCompanyContactInfo();
  }, [getCompanyContactInfo]);

  const handleLogoChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('logo', e.target.files[0]);

        const response = await api.patch(
          `/company-info/logo/${company.id}`,
          data,
        );
        updateCompanyInfo(response.data);

        addToast({
          type: 'success',
          title: 'Logo atualizado com sucesso.',
        });
      } else {
        addToast({
          type: 'error',
          title: 'Erro ao editar logo',
          description: 'Erro ao logo da empresa, tente novamente.',
        });
      }
    },
    [addToast, company, updateCompanyInfo],
  );

  useEffect(() => {
    if (companyInfoSection) {
      setDashboardTitle('Informações da Empresa');
    }
    if (employeesSection) {
      setDashboardTitle('Colaboradores');
    }
    if (financialSection) {
      setDashboardTitle('Financeiro');
    }
    if (advancedOptionsSection) {
      setDashboardTitle('Opções Avançadas');
    }
    if (helpSection) {
      setDashboardTitle('Colaboradores');
    }
    if (documentationSection) {
      setDashboardTitle('Colaboradores');
    }
  }, [
    companyInfoSection,
    financialSection,
    employeesSection,
    advancedOptionsSection,
    helpSection,
    documentationSection,
  ]);
  let companyAvatar = logo;
  if (company.avatar_url !== undefined) {
    companyAvatar = company.avatar_url;
  }
  let companyLogo = logo;
  if (companyInfo.logo_url !== undefined) {
    companyLogo = companyInfo.logo_url;
  }

  useEffect(() => {
    setCompanyInformation({
      user_id: company.id,
      userName: company.name,
      email: company.email,
      companyName: companyInfo.name,
      company_info_id: companyInfo.id,
      companyID: companyInfo.company_id,
      phone: companyPhone,
    });
  }, [company, companyPhone, companyInfo]);

  return (
    <>
      {!!editEmployeeWindow && (
        <EditCompanyEmployeeForm
          getEmployees={updateCompanyEmployees}
          onHandleCloseWindow={handleCloseAllWindowAndVariables}
          userEmployee={selectedEmployee}
        />
      )}
      {!!addEmployeeWindow && !!wpModules && (
        <AddEmployeeWindow
          getEmployees={updateCompanyEmployees}
          onHandleCloseWindow={handleCloseAllWindowAndVariables}
        />
      )}
      {!!addMasterUserWindow && (
        <AddMasterUserWindow
          handleMessageWindow={() => setEmailSentMessageWindow(true)}
          getMasterUsers={getCompanyMasterUsers}
          handleCloseWindow={() => setAddMasterUserWindow(false)}
          onHandleCloseWindow={handleCloseAllWindowAndVariables}
        />
      )}

      {!!contractOrderWindow && (
        <WPContractOrderForm
          getCompanyWPContracts={getCompanyWPContractOrders}
          handleCloseWindow={() => setContractOrderWindow(false)}
          handleEmployeeSection={() => setEmployeesSection(true)}
          handleFinancialSection={() => setFinancialSection(false)}
          onHandleCloseWindow={handleCloseAllWindowAndVariables}
        />
      )}
      {!!emailSentMessageWindow && (
        <WindowContainer
          onHandleCloseWindow={() => setEmailSentMessageWindow(false)}
          containerStyle={{
            zIndex: 150,
            top: '30%',
            left: '25%',
          }}
        >
          <h2>Sucesso</h2>
          <p>
            Foi enviado um e-mail para que o usuário confirme a sua solicitação.
          </p>
          <h4>
            Qualquer dúvida, pode enviar uma mensagem no meu whatsapp - 31 99932
            4093
          </h4>
          <div>
            <button type="button" onClick={handleContractOrderWindow}>
              Quero ser um vencedor!
            </button>
          </div>
        </WindowContainer>
      )}
      {!!chooseWPproductMessageWindow && (
        <WindowContainer
          onHandleCloseWindow={() => setChooseWPproductMessageWindow(false)}
          containerStyle={{
            zIndex: 15,
            top: '30%',
            left: '25%',
          }}
        >
          <h2>Olá {company.name}, tudo bem?</h2>
          <p>Vi que você ainda não possui nenhum produto contratado.</p>
          <p>Qual a sua necessidade no momento?</p>
          <p>Posso pedir para um de nossos consultores te ligar?</p>
          <h4>
            Se precisar de mim, pode enviar uma mensagem no meu whatsapp - 31
            99932 4093
          </h4>
          <div>
            <button type="button" onClick={handleContractOrderWindow}>
              Quero ser um vencedor!
            </button>
          </div>
        </WindowContainer>
      )}
      {!!addEmployeeMessageWindow && (
        <WindowContainer
          onHandleCloseWindow={() => setAddEmployeeMessageWindow(false)}
          containerStyle={{
            top: '30%',
            left: '25%',
          }}
        >
          <p>
            Vi também que você ainda não possui nenhum colaborador cadastrado.
          </p>
          <p>No menu lateral você gerenciar os seus colaboradores.</p>
          <h4>
            Se precisar de mim, pode enviar uma mensagem no meu whatsapp - 31
            99932 4093
          </h4>
          <div>
            <button type="button" onClick={() => setAddEmployeeWindow(true)}>
              Adicionar colaborador!
            </button>
          </div>
        </WindowContainer>
      )}
      <Container>
        <SupplierPageHeader />
        <SideMenu>
          <button type="button" onClick={handleInitialWindow}>
            Informações da empresa
          </button>
          <button type="button" onClick={handleFunnelsWindow}>
            Funil
          </button>
          <button type="button" onClick={handleEmployeesWindow}>
            Colaboradores
          </button>
          <button type="button" onClick={handleFinanceWindow}>
            Financeiro
          </button>
          <button type="button" onClick={handleAdvancedOptionsWindow}>
            Opções avançadas
          </button>
          {marketPlace && (
            <button
              style={{ color: '#FF9900' }}
              type="button"
              onClick={handleAdvancedOptionsWindow}
            >
              WePlan Market
            </button>
          )}
          <button type="button" onClick={handleHelpDashboard}>
            Ajuda
          </button>
          <button type="button" onClick={handleDocumentationDashboard}>
            Documentação
          </button>
        </SideMenu>
        <WorkStation>
          <div>
            {!!companyInfoSection && (
              <Section>
                <h2>{dashboardTitle}</h2>
                <CompanyInfoList>
                  <FirstRow>
                    <div>
                      <table>
                        <tr>
                          <td>Razão Social</td>
                          {!companyNameInput ? (
                            <td>{companyInfo ? companyInfo.name : ''}</td>
                          ) : (
                            <EditCompanyInfoInput
                              companyInformation={companyInformation}
                              defaultValue={companyInfo.name}
                              handleCloseWindow={() =>
                                setCompanyNameInput(false)
                              }
                              onHandleCloseWindow={handleCloseCompanyInfoInput}
                              inputName="companyName"
                              type="string"
                            />
                          )}
                          <td>
                            <button
                              type="button"
                              onClick={() =>
                                setCompanyNameInput(!companyNameInput)
                              }
                            >
                              <FiEdit3 size={18} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>CNPJ</td>
                          {!companyIDInput ? (
                            <td>{companyInfo ? companyInfo.company_id : ''}</td>
                          ) : (
                            <EditCompanyInfoInput
                              companyInformation={companyInformation}
                              defaultValue={companyInfo.company_id}
                              onHandleCloseWindow={handleCloseCompanyInfoInput}
                              handleCloseWindow={() => setCompanyIDInput(false)}
                              inputName="companyID"
                              type="string"
                            />
                          )}
                          <td>
                            <button
                              type="button"
                              onClick={() => setCompanyIDInput(!companyIDInput)}
                            >
                              <FiEdit3 size={18} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Nome de Usuário</td>
                          {!companyUserNameInput ? (
                            <td>{company.name}</td>
                          ) : (
                            <EditCompanyInfoInput
                              companyInformation={companyInformation}
                              defaultValue={company.name}
                              onHandleCloseWindow={handleCloseCompanyInfoInput}
                              handleCloseWindow={() =>
                                setCompanyUserNameInput(false)
                              }
                              inputName="userName"
                              type="string"
                            />
                          )}
                          <td>
                            <button
                              type="button"
                              onClick={() =>
                                setCompanyUserNameInput(!companyUserNameInput)
                              }
                            >
                              <FiEdit3 size={18} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>e-mail</td>
                          {!companyEmailInput ? (
                            <td>{company.email}</td>
                          ) : (
                            <EditCompanyInfoInput
                              companyInformation={companyInformation}
                              defaultValue={company.email}
                              onHandleCloseWindow={handleCloseCompanyInfoInput}
                              handleCloseWindow={() =>
                                setCompanyEmailInput(false)
                              }
                              inputName="email"
                              type="string"
                            />
                          )}
                          <td>
                            <button
                              type="button"
                              onClick={() =>
                                setCompanyEmailInput(!companyEmailInput)
                              }
                            >
                              <FiEdit3 size={18} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Telefone</td>
                          {!companyPhoneInput ? (
                            <td>{companyPhone}</td>
                          ) : (
                            <EditCompanyInfoInput
                              companyInformation={companyInformation}
                              defaultValue={String(companyPhone)}
                              onHandleCloseWindow={handleCloseCompanyInfoInput}
                              getCompanyInfo={getCompanyContactInfo}
                              handleCloseWindow={() =>
                                setCompanyPhoneInput(false)
                              }
                              inputName="phone"
                              type="number"
                            />
                          )}
                          <td>
                            <button
                              type="button"
                              onClick={() =>
                                setCompanyPhoneInput(!companyPhoneInput)
                              }
                            >
                              <FiEdit3 size={18} />
                            </button>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <ImageContainer>
                      <AvatarInput htmlFor="logo">
                        <h2>Editar Logo</h2>
                        <img src={companyLogo} alt="WePlanPRO" />
                        <div>
                          <FiUpload size={30} />
                          <input
                            type="file"
                            id="logo"
                            onChange={handleLogoChange}
                          />
                        </div>
                      </AvatarInput>
                      <AvatarInput htmlFor="avatar">
                        <h2>Editar Avatar</h2>
                        <img src={companyAvatar} alt="WePlanPRO" />
                        <div>
                          <FiUpload size={30} />
                          <input
                            type="file"
                            id="avatar"
                            onChange={handleAvatarChange}
                          />
                        </div>
                      </AvatarInput>
                    </ImageContainer>
                  </FirstRow>
                  <SecondRow>
                    <div>
                      <span>
                        <h2>Usuários Master</h2>
                        <button
                          type="button"
                          onClick={() => setAddMasterUserWindow(true)}
                        >
                          <MdPersonAdd size={30} />
                        </button>
                      </span>
                      <table>
                        {masterUsers.map(master => (
                          <tr key={master.id}>
                            <td>Nome de Usuário</td>
                            <td>{master.masterUser.name}</td>
                            <td>
                              <button type="button">
                                <FiEdit3 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </table>
                    </div>
                    <div>
                      <h2>Módulos Contratados</h2>
                      <table>
                        {modules.map(hModule => (
                          <tr key={hModule.management_module}>
                            <td>{hModule.management_module}</td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </SecondRow>
                </CompanyInfoList>
              </Section>
            )}
            {!!employeesSection && (
              <EmployeeSection>
                <ConfirmedEmployeeSection>
                  <h2>{dashboardTitle}</h2>
                  <span>
                    <button
                      type="button"
                      onClick={() => setAddEmployeeWindow(true)}
                    >
                      <MdPersonAdd size={30} />
                    </button>
                  </span>
                  <EmployeeScrollList>
                    <table>
                      <tr>
                        <th>N°</th>
                        <th>Nome</th>
                        <th>Cargo</th>
                        <th>
                          <FiEye size={30} />
                        </th>
                      </tr>
                      {employees.map(thiEmployee => {
                        const employeeIndex =
                          employees.findIndex(
                            index => index.id === thiEmployee.id,
                          ) + 1;
                        return (
                          <tr key={employeeIndex}>
                            <td>{employeeIndex}</td>
                            <td>{thiEmployee.employee.name}</td>
                            <td>{thiEmployee.position}</td>
                            <td>
                              <button
                                type="button"
                                onClick={() =>
                                  handleEditEmployeeFormWindow(thiEmployee)
                                }
                              >
                                <FiChevronsRight size={24} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </table>
                  </EmployeeScrollList>
                </ConfirmedEmployeeSection>
                <UnConfirmedEmployeeSection>
                  <h2>Colaboradores Inativos</h2>
                  <EmployeeScrollList>
                    <table>
                      <tr>
                        <th>N°</th>
                        <th>Nome</th>
                        <th>Cargo</th>
                        <th>
                          <FiEye size={30} />
                        </th>
                      </tr>
                      {notActiveEmployees.length > 0 &&
                        notActiveEmployees.map(thiEmployee => {
                          const employeeIndex =
                            notActiveEmployees.findIndex(
                              index => index.id === thiEmployee.id,
                            ) + 1;
                          return (
                            <tr key={employeeIndex}>
                              <td>{employeeIndex}</td>
                              <td>{thiEmployee.employee.name}</td>
                              <td>{thiEmployee.position}</td>
                              <td>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleEditEmployeeFormWindow(thiEmployee)
                                  }
                                >
                                  <FiChevronsRight size={24} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </table>
                  </EmployeeScrollList>
                </UnConfirmedEmployeeSection>
              </EmployeeSection>
            )}
            {!!funnelsSection && <FunnelManagementSection />}
            {!!financialSection && (
              <Section>
                <h1>Financeiro</h1>
                <button type="button" onClick={handleContractOrderWindow}>
                  Contratar Módulo de Gestão
                </button>
              </Section>
            )}
            {!!advancedOptionsSection && (
              <Section>
                <h1>OpçõesAvançadas</h1>
              </Section>
            )}
            {!!helpSection && (
              <Section>
                <h1>Ajuda</h1>
              </Section>
            )}
            {!!documentationSection && (
              <Section>
                <h1>Documentação</h1>
              </Section>
            )}
          </div>
        </WorkStation>
      </Container>
    </>
  );
};

export default CompanyDashboard;
