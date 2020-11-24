import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FiChevronRight } from 'react-icons/fi';

import WindowContainer from '../WindowContainer';

import api from '../../services/api';
import avatarPlaceholder from '../../assets/avatar_placeholder_cat2.jpeg';

import {
  Container,
  FirstRow,
  SecondRow,
  ModulesContainer,
  ModuleContainer,
  MessageField,
} from './styles';
import { useAuth } from '../../hooks/auth';
import EditCompanyEmployeeInput from '../EditCompanyEmployeeInput';
import EditEmployeeModulesWindow from '../EditEmployeeModulesWindow';

interface IUserModules {
  id: string;
  management_module: string;
  access_level: number;
}

interface IUserConfirmation {
  id: string;
  sender_id: string;
  receiver_id: string;
  title: string;
  message: string;
  isConfirmed: boolean;
}

interface IEmployeeUserPersonInfoDTO {
  id: string;
  first_name: string;
  last_name: string;
  person_id: string;
}

interface IUserEmployeeDTO {
  id: string;
  name: string;
  position: string;
  access_key: string;
  email: string;
  isActive: boolean;
  employee_id: string;
}

interface IEmployeeInfo {
  id: string;
  position: string;
  access_key: string;
  email: string;
  isActive: boolean;
  title: string;
  message: string;
  isConfirmed: boolean;
  confirmationID: string;
}

interface IPropsDTO {
  userEmployee: IUserEmployeeDTO;
  onHandleCloseWindow: MouseEventHandler;
  getEmployees: Function;
}

const EditCompanyEmployeeForm: React.FC<IPropsDTO> = ({
  onHandleCloseWindow,
  getEmployees,
  userEmployee,
}: IPropsDTO) => {
  const { company, modules } = useAuth();

  const [userConfirmation, setUserConfirmation] = useState(
    {} as IUserConfirmation,
  );
  const [userModules, setUserModules] = useState<IUserModules[]>([]);
  const [selectedModule, setSelectedModule] = useState({} as IUserModules);
  const [companyComercialAccess, setCompanyComercialAccess] = useState(false);
  const [companyProductionAccess, setCompanyProductionAccess] = useState(false);
  const [companyProjectsAccess, setCompanyProjectsAccess] = useState(false);
  const [companyFinancialAccess, setCompanyFinancialAccess] = useState(false);
  const [editModulesWindow, setEditModulesWindow] = useState(false);
  const [positionInput, setPositionInput] = useState(false);
  const [isActiveInput, setIsActiveInput] = useState(false);
  const [accessKeyInput, setAccessKeyInput] = useState(false);
  const [emailInput, setEmailInput] = useState(false);
  const [titleInput, setTitleInput] = useState(false);
  const [messageInput, setMessageInput] = useState(false);
  const [crmAccessLevel, setCRMAccessLevel] = useState('-');
  const [crmAccess, setCRMAccess] = useState(false);
  const [productionAccess, setProductionAccess] = useState(false);
  const [productionAccessLevel, setProductionAccessLevel] = useState('-');
  const [projectsAccessLevel, setProjectsAccessLevel] = useState('-');
  const [projectsAccess, setProjectsAccess] = useState(false);
  const [financialAccessLevel, setFinancialAccessLevel] = useState('-');
  const [financialAccess, setFinancialAccess] = useState(false);
  const [employeeInfo, setEmployeeInfo] = useState({} as IEmployeeInfo);

  const [employeeUserInfo, setEmployeeUserInfo] = useState(
    {} as IEmployeeUserPersonInfoDTO,
  );
  const handleCloseEmployeeInput = useCallback(() => {
    setPositionInput(false);
    setIsActiveInput(false);
    setAccessKeyInput(false);
    setEmailInput(false);
    setTitleInput(false);
    setMessageInput(false);
  }, []);

  const getEmployeePersonInfo = useCallback(() => {
    try {
      api.get<IEmployeeUserPersonInfoDTO>('person-info').then(response => {
        setEmployeeUserInfo(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    getEmployeePersonInfo();
  }, [getEmployeePersonInfo]);

  const getUserModules = useCallback(() => {
    try {
      api
        .get<IUserModules[]>(`user/modules/${userEmployee.id}`)
        .then(response => {
          setUserModules(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [userEmployee]);

  useEffect(() => {
    getUserModules();
  }, [getUserModules]);

  const getUserConfirmation = useCallback(() => {
    try {
      api
        .get<IUserConfirmation>(
          `user/confirmations/${userEmployee.id}/${company.id}`,
        )
        .then(response => {
          setUserConfirmation(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [company, userEmployee]);

  useEffect(() => {
    getUserConfirmation();
  }, [getUserConfirmation]);

  const handleEditModulesWindow = useCallback(props => {
    setSelectedModule(props);
    setEditModulesWindow(true);
  }, []);

  const handleCloseEditModulesWindow = useCallback(() => {
    setEditModulesWindow(false);
  }, []);

  useEffect(() => {
    setEmployeeInfo({
      id: userEmployee.id,
      position: userEmployee.position,
      access_key: userEmployee.access_key,
      email: userEmployee.email,
      isActive: userEmployee.isActive,
      title: userConfirmation.title,
      message: userConfirmation.message,
      isConfirmed: userConfirmation.isConfirmed,
      confirmationID: userConfirmation.id,
    });
  }, [userConfirmation, userEmployee]);

  useEffect(() => {
    const ciaComercialAccess = modules.find(
      xModule => xModule.management_module === 'Comercial',
    );
    setCompanyComercialAccess(!!ciaComercialAccess);
    const ciaProductionAccess = modules.find(
      xModule => xModule.management_module === 'Production',
    );
    setCompanyProductionAccess(!!ciaProductionAccess);
    const ciaProjectsAccess = modules.find(
      xModule => xModule.management_module === 'Projects',
    );
    setCompanyProjectsAccess(!!ciaProjectsAccess);
    const ciaFinancialAccess = modules.find(
      xModule => xModule.management_module === 'Financial',
    );
    setCompanyFinancialAccess(!!ciaFinancialAccess);
  }, [modules]);
  useEffect(() => {
    userModules.map(thisModule => {
      thisModule.management_module === 'Comercial' && setCRMAccess(true);
      thisModule.management_module === 'Comercial' &&
        thisModule.access_level === 1 &&
        setCRMAccessLevel('Global');
      thisModule.management_module === 'Comercial' &&
        thisModule.access_level === 2 &&
        setCRMAccessLevel('Equipe');
      thisModule.management_module === 'Comercial' &&
        thisModule.access_level === 3 &&
        setCRMAccessLevel('Individual');
      thisModule.management_module === 'Production' &&
        setProductionAccess(true);
      thisModule.management_module === 'Production' &&
        thisModule.access_level === 1 &&
        setProductionAccessLevel('Global');
      thisModule.management_module === 'Production' &&
        thisModule.access_level === 2 &&
        setProductionAccessLevel('Equipe');
      thisModule.management_module === 'Production' &&
        thisModule.access_level === 3 &&
        setProductionAccessLevel('Individual');
      thisModule.management_module === 'Projects' && setProjectsAccess(true);
      thisModule.management_module === 'Projects' &&
        thisModule.access_level === 1 &&
        setProjectsAccessLevel('Global');
      thisModule.management_module === 'Projects' &&
        thisModule.access_level === 2 &&
        setProjectsAccessLevel('Equipe');
      thisModule.management_module === 'Projects' &&
        thisModule.access_level === 3 &&
        setProjectsAccessLevel('Individual');
      thisModule.management_module === 'Financial' && setFinancialAccess(true);
      thisModule.management_module === 'Financial' &&
        thisModule.access_level === 1 &&
        setFinancialAccessLevel('Global');
      thisModule.management_module === 'Financial' &&
        thisModule.access_level === 2 &&
        setFinancialAccessLevel('Equipe');
      thisModule.management_module === 'Financial' &&
        thisModule.access_level === 3 &&
        setFinancialAccessLevel('Individual');
      return thisModule;
    });
  }, [userModules]);

  return (
    <>
      {editModulesWindow && (
        <EditEmployeeModulesWindow
          onHandleCloseWindow={() => setEditModulesWindow(false)}
          employeeID={employeeInfo.id}
          handleCloseWindow={handleCloseEditModulesWindow}
          moduleAccessLevel={selectedModule.access_level}
          moduleName={selectedModule.management_module}
          moduleID={selectedModule.id}
        />
      )}
      <WindowContainer
        onHandleCloseWindow={onHandleCloseWindow}
        containerStyle={{
          zIndex: 20,
          top: '5%',
          left: '5%',
          height: '90%',
          width: '90%',
        }}
      >
        <Container>
          <h2>Editar Perfil do Colaborador</h2>
          <div>
            <FirstRow>
              <img src={avatarPlaceholder} alt="WePlanPRO Company Employee" />
              <div>
                <span>
                  <strong>Nome de Usuário</strong>
                  <p>{userEmployee.name}</p>
                </span>
                <span>
                  <strong>Nome</strong>
                  <span>
                    <p>{employeeUserInfo.first_name}</p>
                    <p>{employeeUserInfo.last_name}</p>
                  </span>
                </span>
                <span>
                  <strong>CPF</strong>
                  <p>xxx.xxx.xxx-xx</p>
                  {/* <p>{employeeUserInfo.person_id}</p> */}
                </span>
              </div>
            </FirstRow>
            <SecondRow>
              <span>
                <div>
                  <h3>Cargo</h3>
                  {!positionInput ? (
                    <td>
                      {userEmployee.position}
                      <button
                        type="button"
                        onClick={() => setPositionInput(true)}
                      >
                        <FiChevronRight size={30} />
                      </button>
                    </td>
                  ) : (
                    <EditCompanyEmployeeInput
                      inputName="position"
                      defaultValue={userEmployee.position}
                      getCompanyEmployees={getEmployees}
                      handleCloseWindow={() => setPositionInput(false)}
                      onHandleCloseWindow={handleCloseEmployeeInput}
                      type="string"
                      employeeInfo={employeeInfo}
                    />
                  )}
                </div>
                <div>
                  <h3>Status do Colaborador</h3>
                  {!isActiveInput ? (
                    <td>
                      {userEmployee.isActive ? 'Ativo' : 'Desativado'}
                      <button
                        type="button"
                        onClick={() => setIsActiveInput(true)}
                      >
                        <FiChevronRight size={30} />
                      </button>
                    </td>
                  ) : (
                    <EditCompanyEmployeeInput
                      inputName="isActive"
                      defaultValue={`${userEmployee.isActive}`}
                      getCompanyEmployees={getEmployees}
                      handleCloseWindow={() => setIsActiveInput(false)}
                      onHandleCloseWindow={handleCloseEmployeeInput}
                      type="boolean"
                      employeeInfo={employeeInfo}
                    />
                  )}
                </div>
                <div>
                  <h3>Chave de acesso</h3>
                  {!accessKeyInput ? (
                    <td>
                      {userEmployee.access_key}
                      <button
                        type="button"
                        onClick={() => setAccessKeyInput(true)}
                      >
                        <FiChevronRight size={30} />
                      </button>
                    </td>
                  ) : (
                    <EditCompanyEmployeeInput
                      inputName="access_key"
                      defaultValue={userEmployee.access_key}
                      getCompanyEmployees={getEmployees}
                      handleCloseWindow={() => setAccessKeyInput(false)}
                      onHandleCloseWindow={handleCloseEmployeeInput}
                      type="string"
                      employeeInfo={employeeInfo}
                    />
                  )}
                </div>
                <div>
                  <h3>Email de acesso</h3>
                  {!emailInput ? (
                    <td>
                      {userEmployee.email}
                      <button type="button" onClick={() => setEmailInput(true)}>
                        <FiChevronRight size={30} />
                      </button>
                    </td>
                  ) : (
                    <EditCompanyEmployeeInput
                      inputName="email"
                      defaultValue={userEmployee.email}
                      getCompanyEmployees={getEmployees}
                      handleCloseWindow={() => setEmailInput(false)}
                      onHandleCloseWindow={handleCloseEmployeeInput}
                      type="string"
                      employeeInfo={employeeInfo}
                    />
                  )}
                </div>
              </span>
              <span>
                <ModulesContainer>
                  <span>
                    {!!companyComercialAccess && (
                      <ModuleContainer>
                        <h3>Comercial</h3>
                        {crmAccess ? (
                          userModules.map(thisModule => {
                            const companyModule = modules.find(
                              xModule =>
                                xModule.management_module ===
                                thisModule.management_module,
                            );
                            if (
                              thisModule.management_module === 'Comercial' &&
                              companyModule
                            ) {
                              return (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleEditModulesWindow(thisModule)
                                  }
                                >
                                  {crmAccessLevel}
                                </button>
                              );
                            }
                            return '';
                          })
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              handleEditModulesWindow({
                                id: '',
                                management_module: 'Comercial',
                                access_level: 0,
                              })
                            }
                          >
                            {crmAccessLevel}
                          </button>
                        )}
                      </ModuleContainer>
                    )}
                    {!!companyProductionAccess && (
                      <ModuleContainer>
                        <h3>Produção</h3>
                        {productionAccess ? (
                          userModules.map(thisModule => {
                            if (thisModule.management_module === 'Production') {
                              return (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleEditModulesWindow(thisModule)
                                  }
                                >
                                  {productionAccessLevel}
                                </button>
                              );
                            }
                            return '';
                          })
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              handleEditModulesWindow({
                                id: '',
                                management_module: 'Production',
                                access_level: 0,
                              })
                            }
                          >
                            {productionAccessLevel}
                          </button>
                        )}
                      </ModuleContainer>
                    )}
                  </span>
                  <span>
                    {!!companyProjectsAccess && (
                      <ModuleContainer>
                        <h3>Projetos</h3>
                        {projectsAccess ? (
                          userModules.map(thisModule => {
                            if (thisModule.management_module === 'Projects') {
                              return (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleEditModulesWindow(thisModule)
                                  }
                                >
                                  {projectsAccessLevel}
                                </button>
                              );
                            }
                            return '';
                          })
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              handleEditModulesWindow({
                                id: '',
                                management_module: 'Projects',
                                access_level: 0,
                              })
                            }
                          >
                            {projectsAccessLevel}
                          </button>
                        )}
                      </ModuleContainer>
                    )}
                    {!!companyFinancialAccess && (
                      <ModuleContainer>
                        <h3>Financeiro</h3>
                        {financialAccess ? (
                          userModules.map(thisModule => {
                            if (thisModule.management_module === 'Financial') {
                              return (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleEditModulesWindow(thisModule)
                                  }
                                >
                                  {financialAccessLevel}
                                </button>
                              );
                            }
                            return '';
                          })
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              handleEditModulesWindow({
                                id: '',
                                management_module: 'Financial',
                                access_level: 0,
                              })
                            }
                          >
                            {financialAccessLevel}
                          </button>
                        )}
                      </ModuleContainer>
                    )}
                  </span>
                </ModulesContainer>
                <div>
                  <h3>Título da Mensagem</h3>
                  {!titleInput ? (
                    <td>
                      {userConfirmation.title}
                      <button type="button" onClick={() => setTitleInput(true)}>
                        <FiChevronRight size={30} />
                      </button>
                    </td>
                  ) : (
                    <EditCompanyEmployeeInput
                      inputName="title"
                      defaultValue={userConfirmation.title}
                      getCompanyEmployees={getUserConfirmation}
                      handleCloseWindow={() => setTitleInput(false)}
                      onHandleCloseWindow={handleCloseEmployeeInput}
                      type="string"
                      employeeInfo={employeeInfo}
                    />
                  )}
                </div>
                <MessageField>
                  <h3>Mensagem</h3>
                  {!messageInput ? (
                    <td>
                      {userConfirmation.message}
                      <button
                        type="button"
                        onClick={() => setMessageInput(true)}
                      >
                        <FiChevronRight size={30} />
                      </button>
                    </td>
                  ) : (
                    <EditCompanyEmployeeInput
                      inputName="message"
                      defaultValue={userConfirmation.message}
                      getCompanyEmployees={getUserConfirmation}
                      handleCloseWindow={() => setMessageInput(false)}
                      onHandleCloseWindow={handleCloseEmployeeInput}
                      type="string"
                      employeeInfo={employeeInfo}
                    />
                  )}
                </MessageField>
              </span>
            </SecondRow>
          </div>
        </Container>
      </WindowContainer>
    </>
  );
};

export default EditCompanyEmployeeForm;
