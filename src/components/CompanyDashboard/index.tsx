import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { MdPersonAdd } from 'react-icons/md';
import {
  FiUpload,
  FiChevronsRight,
  FiEdit3,
  FiEye,
  FiImage,
} from 'react-icons/fi';
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
  FinacialSection,
  Payments,
} from './styles';
import AddEmployeeWindow from '../AddEmployeeWindow';
import logo from '../../assets/elefante.png';
import IUserDTO from '../../dtos/IUserDTO';
import EditCompanyInfoInput from '../EditCompanyInfoInput';
import AddMasterUserWindow from '../AddMasterUserWindow';
import { useToast } from '../../hooks/toast';
import SupplierPageHeader from '../SupplierPageHeader';
import EditCompanyEmployeeForm from '../EditCompanyEmployeeForm';
import FunnelManagementSection from '../FunnelManagementSection';
import WePlanProductsSection from '../WePlanProductsSection';
import NotACustomerYet from '../Messages/NotACustomerYet';
import MasterUserCreatedSuccessfuly from '../Messages/MasterUserCreatedSuccessfuly';
import AddEmployeeMessageWindow from '../Messages/AddEmployeeMessageWindow';

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
  const [companyNameInput, setCompanyNameInput] = useState(false);
  const [companyIDInput, setCompanyIDInput] = useState(false);
  const [companyUserNameInput, setCompanyUserNameInput] = useState(false);
  const [companyEmailInput, setCompanyEmailInput] = useState(false);
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

  // Sections
  const [contracts, setContracts] = useState<string[]>([]);
  const [companyInfoSection, setCompanyInfoSection] = useState(true);
  const [employeesSection, setEmployeesSection] = useState(false);
  const [funnelsSection, setFunnelsSection] = useState(false);
  const [wePlanProductsSection, setWePlanProductsSection] = useState(false);
  const [financialSection, setFinancialSection] = useState(false);
  const [advancedOptionsSection, setAdvancedOptionsSection] = useState(false);
  const [helpSection, setHelpSection] = useState(false);
  const [documentationSection, setDocumentationSection] = useState(false);
  const [
    chooseWPproductMessageWindow,
    setChooseWPproductMessageWindow,
  ] = useState(false);
  const [addEmployeeMessageWindow, setAddEmployeeMessageWindow] = useState(
    false,
  );
  const [emailSentMessageWindow, setEmailSentMessageWindow] = useState(false);
  const [addEmployeeWindow, setAddEmployeeWindow] = useState(false);
  const [editEmployeeWindow, setEditEmployeeWindow] = useState(false);
  const [addMasterUserWindow, setAddMasterUserWindow] = useState(false);
  const [wpContractOrders, setWPContractOrders] = useState<IWPContractOrder[]>(
    [],
  );
  const [dontReRender, setDontReRender] = useState(0);

  const handleCloseCompanyInfoInput = useCallback(() => {
    setCompanyNameInput(false);
    setCompanyIDInput(false);
    setCompanyUserNameInput(false);
    setCompanyEmailInput(false);
    setCompanyPhoneInput(false);
  }, []);

  const closeAllWindow = useCallback(() => {
    setCompanyInfoSection(false);
    setEmployeesSection(false);
    setFunnelsSection(false);
    setFinancialSection(false);
    setAdvancedOptionsSection(false);
    setHelpSection(false);
    setDocumentationSection(false);
    setEmailSentMessageWindow(false);
    setChooseWPproductMessageWindow(false);
    setAddEmployeeMessageWindow(false);
    setEditEmployeeWindow(false);
    setAddEmployeeWindow(false);
    setAddMasterUserWindow(false);
    handleCloseCompanyInfoInput();
    setWePlanProductsSection(false);
  }, [handleCloseCompanyInfoInput]);
  const handleCloseAllWindowAndVariables = useCallback(() => {
    closeAllWindow();
    setSelectedEmployee({} as IUserEmployeeDTO);
    setCompanyInfoSection(true);
  }, [closeAllWindow]);

  const handleInitialWindow = useCallback(() => {
    closeAllWindow();
    setCompanyInfoSection(true);
  }, [closeAllWindow]);
  const handleEmployeesSection = useCallback(() => {
    closeAllWindow();
    setEmployeesSection(true);
  }, [closeAllWindow]);
  const handleFunnelsSection = useCallback(() => {
    closeAllWindow();
    setFunnelsSection(true);
  }, [closeAllWindow]);
  const handleWePlanProductsSection = useCallback(() => {
    closeAllWindow();
    setWePlanProductsSection(true);
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
      setDontReRender(1);
      api
        .get<IWPContractOrder[]>(`/wp/contract-orders/${company.id}`)
        .then(response => {
          const wpContracts = response.data.filter(
            wpContract => wpContract.products.length > 0,
          );

          if (wpContracts.length <= 0) {
            setChooseWPproductMessageWindow(true);
            handleWePlanProductsSection();
          }
          setWPContractOrders(wpContracts);

          const sortModules: IContractWPModulesDTO[] = [];
          response.data.map(hModule => {
            hModule.products.map(mProduct => {
              const pName = mProduct.weplanProduct.name;
              if (
                pName === 'Comercial' ||
                pName === 'Production' ||
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
              }
              return mProduct;
            });
            return sortModules;
          });
          sortModules.map(sortedModule => {
            modules.find(
              thisModule =>
                thisModule.management_module === sortedModule.management_module,
            );
            return sortedModule;
          });
          updateModules(sortModules);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [company, modules, updateModules, handleWePlanProductsSection]);

  useEffect(() => {
    if (dontReRender <= 0) {
      getCompanyWPContractOrders();
    }
  }, [getCompanyWPContractOrders, dontReRender]);

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
                pName === 'Production' ||
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
              }
              return mProduct;
            });
            return sortModules;
          });
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [company]);
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
  useEffect(() => {
    const pRODUCTS: IOrderProduct[] = [];
    const cONTRACTS: string[] = [];
    wpContractOrders.map(contract => {
      const { products } = contract;

      products.map(crm => {
        pRODUCTS.push(crm);
        crm.weplanProduct.name === 'Marketplace' && setMarketPlace(true);

        return crm;
      });
      return contract;
    });
    setContracts(cONTRACTS);
  }, [wpContractOrders]);

  return (
    <>
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
            getMasterUsers={getCompanyMasterUsers}
            handleCloseWindow={() => setAddMasterUserWindow(false)}
            onHandleCloseWindow={handleCloseAllWindowAndVariables}
          />
        )}
        {!!emailSentMessageWindow && (
          <MasterUserCreatedSuccessfuly
            onHandleCloseWindow={() => setEmailSentMessageWindow(false)}
            handleWePlanProductsSection={handleWePlanProductsSection}
          />
        )}
        {!!chooseWPproductMessageWindow && (
          <NotACustomerYet
            onHandleCloseWindow={() => setChooseWPproductMessageWindow(false)}
            handleWePlanProductsSection={handleWePlanProductsSection}
          />
        )}
        {!!addEmployeeMessageWindow && (
          <AddEmployeeMessageWindow
            onHandleCloseWindow={() => setAddEmployeeMessageWindow(false)}
            handleEmployeeSection={handleEmployeesSection}
          />
        )}
      </>
      <Container>
        <SupplierPageHeader />
        <SideMenu>
          <button type="button" onClick={handleInitialWindow}>
            Informações da empresa
          </button>
          <button type="button" onClick={handleWePlanProductsSection}>
            Produtos Weplan
          </button>
          <button type="button" onClick={handleFunnelsSection}>
            Funil
          </button>
          <button type="button" onClick={handleEmployeesSection}>
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
                    Product
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
            {!!wePlanProductsSection && (
              <WePlanProductsSection
                handleWpProductsSection={handleWePlanProductsSection}
              />
            )}
            {!!financialSection && (
              <FinacialSection>
                <h1>Financeiro</h1>
                <Payments>
                  <h1>Contratos</h1>
                  <div>
                    <h3>ID</h3>
                  </div>
                  {contracts.map(contract => (
                    <div key={contract}>
                      <p>{contract}</p>
                    </div>
                  ))}
                </Payments>
                <Payments>
                  <h1>Pagamentos efetuados</h1>
                  <div>
                    <h3>Vencimento</h3>
                    <h3>Valor</h3>
                    <h3>Pagamento</h3>
                    <h3>Comprovante</h3>
                  </div>
                  <div>
                    <p>15/09/2020</p>
                    <p>R$ 400,00</p>
                    <p>10/09/2020</p>
                    <p>
                      <FiImage />
                    </p>
                  </div>
                </Payments>
              </FinacialSection>
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
