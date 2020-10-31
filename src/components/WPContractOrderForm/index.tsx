import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useToast } from '../../hooks/toast';

import WindowContainer from '../WindowContainer';

import api from '../../services/api';

import { Container, WPModule, AddButton } from './styles';
import { useAuth } from '../../hooks/auth';

interface ICompanyWPContractOrderDTO {
  id: string;
  name: string;
}

interface ISelectedWPManagementModulesDTO {
  weplan_product_id: string;
  quantity: number;
}

interface IWPProductDTO {
  id: string;
  name: string;
  price: number;
}

interface IPropsDTO {
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  handleEmployeeSection: Function;
  handleFinancialSection: Function;
  getCompanyWPContracts: Function;
}

const WPContractOrderForm: React.FC<IPropsDTO> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  handleEmployeeSection,
  handleFinancialSection,
  getCompanyWPContracts,
}: IPropsDTO) => {
  const { addToast } = useToast();
  const { company } = useAuth();

  const [wpProducts, setWPProducts] = useState<IWPProductDTO[]>([]);
  const [companyCRMModuleQuantity, setCRMQuantity] = useState(0);
  const [companyProductionModuleQuantity, setProductionQuantity] = useState(0);
  const [companyProjectModuleQuantity, setProjectQuantity] = useState(0);
  const [companyFinancialModuleQuantity, setFinancialQuantity] = useState(0);

  const getWPProducts = useCallback(() => {
    try {
      api.get<IWPProductDTO[]>('wp-products').then(response => {
        setWPProducts(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    getWPProducts();
  }, [getWPProducts]);

  const wpCRM = wpProducts.find(wpM => wpM.name === 'Comercial');
  const wpProduction = wpProducts.find(wpM => wpM.name === 'Operations');
  const wpProject = wpProducts.find(wpM => wpM.name === 'Projects');
  const wpFinancial = wpProducts.find(wpM => wpM.name === 'Financial');

  const inputHeight = { height: '40px' };

  const handleSubmit = useCallback(async () => {
    try {
      const selectedWPProducts: ISelectedWPManagementModulesDTO[] = [];

      companyCRMModuleQuantity > 0 &&
        selectedWPProducts.push({
          weplan_product_id: wpCRM ? wpCRM.id : '',
          quantity: companyCRMModuleQuantity,
        });
      companyProductionModuleQuantity > 0 &&
        selectedWPProducts.push({
          weplan_product_id: wpProduction ? wpProduction.id : '',
          quantity: companyProductionModuleQuantity,
        });
      companyProjectModuleQuantity > 0 &&
        selectedWPProducts.push({
          weplan_product_id: wpProject ? wpProject.id : '',
          quantity: companyProjectModuleQuantity,
        });
      companyFinancialModuleQuantity > 0 &&
        selectedWPProducts.push({
          weplan_product_id: wpFinancial ? wpFinancial.id : '',
          quantity: companyFinancialModuleQuantity,
        });

      console.log(wpProducts);

      await api.post('/wp/contract-orders', {
        user_id: company.id,
        products: selectedWPProducts,
      });

      addToast({
        type: 'success',
        title: 'Membro da festa adicionado com sucesso',
        description: 'Ele já pode visualizar as informações do evento.',
      });
      getCompanyWPContracts();
      handleEmployeeSection();
      handleFinancialSection();
      handleCloseWindow();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao adicionar membro da festa',
        description: 'Erro ao adicionar membro da festa, tente novamente.',
      });
      throw new Error(err);
    }
  }, [
    addToast,
    getCompanyWPContracts,
    companyCRMModuleQuantity,
    companyProductionModuleQuantity,
    companyProjectModuleQuantity,
    companyFinancialModuleQuantity,
    company,
    wpCRM,
    wpFinancial,
    wpProduction,
    wpProject,
    handleCloseWindow,
    handleEmployeeSection,
    wpProducts,
    handleFinancialSection,
  ]);

  return (
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
      <form>
        <Container>
          <h2>Contratar Módulo de Gestão</h2>
          <p>Selecione o número de acessos para cada módulo</p>
          <p>1 acesso por pessoa</p>
          <WPModule>
            <div>
              <strong>CRM</strong>
              <input
                type="number"
                style={inputHeight}
                name="crm_quantity"
                onChange={e => setCRMQuantity(Number(e.target.value))}
              />
            </div>
            <div>
              <strong>Produção</strong>
              <input
                type="number"
                style={inputHeight}
                name="production_quantity"
                onChange={e => setProductionQuantity(Number(e.target.value))}
              />
            </div>
            <div>
              <strong>Projetos</strong>
              <input
                type="number"
                style={inputHeight}
                name="project_quantity"
                onChange={e => setProjectQuantity(Number(e.target.value))}
              />
            </div>
            <div>
              <strong>Financeiro</strong>
              <input
                type="number"
                style={inputHeight}
                name="financial_quantity"
                onChange={e => setFinancialQuantity(Number(e.target.value))}
              />
            </div>
          </WPModule>
          <AddButton type="button" onClick={handleSubmit}>
            Contratar
          </AddButton>
        </Container>
      </form>
    </WindowContainer>
  );
};

export default WPContractOrderForm;
