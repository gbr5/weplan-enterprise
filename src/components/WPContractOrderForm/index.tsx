import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useToast } from '../../hooks/toast';

import WindowContainer from '../WindowContainer';

import ComercialImage from '../../assets/comercial_module_small.svg';
import ProductionImage from '../../assets/production_module_small.svg';
import ProjectsImage from '../../assets/projects_module_small.svg';
import FinancialImage from '../../assets/financial_module_small.svg';

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
  handleWpProductsSection: Function;
  getCompanyWPContractOrders: Function;
}

const WPContractOrderForm: React.FC<IPropsDTO> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  handleWpProductsSection,
  getCompanyWPContractOrders,
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
  const wpProduction = wpProducts.find(wpM => wpM.name === 'Production');
  const wpProject = wpProducts.find(wpM => wpM.name === 'Projects');
  const wpFinancial = wpProducts.find(wpM => wpM.name === 'Financial');

  const inputHeight = { height: '40px', width: '80px' };

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

      await api.post('/wp/contract-orders', {
        user_id: company.id,
        products: selectedWPProducts,
      });

      addToast({
        type: 'success',
        title: 'Compra efetuada com sucesso!',
        description: 'Você já pode utilizar os produtos contratados.',
      });
      getCompanyWPContractOrders();
      handleWpProductsSection();
      handleCloseWindow();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Algum erro ocorreu!',
        description: 'Compra não efetuada, tente novamente.',
      });
      throw new Error(err);
    }
  }, [
    addToast,
    getCompanyWPContractOrders,
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
    handleWpProductsSection,
  ]);

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 20,
        top: '5%',
        left: '20%',
        height: '90%',
        width: '60%',
      }}
    >
      <form>
        <Container>
          <h2>Contratar Módulo de Gestão</h2>
          <p>Selecione o número de acessos para cada módulo</p>
          <p>1 acesso por pessoa</p>
          <WPModule>
            <div>
              <img src={ComercialImage} alt="We Plan | Comercial" />
              <input
                type="number"
                style={inputHeight}
                name="quantity"
                onChange={e => setCRMQuantity(Number(e.target.value))}
              />
            </div>
            <div>
              <img src={ProductionImage} alt="We Plan | Production" />
              <input
                type="number"
                style={inputHeight}
                name="quantity"
                onChange={e => setProductionQuantity(Number(e.target.value))}
              />
            </div>
            <div>
              <img src={ProjectsImage} alt="We Plan | Projects" />
              <input
                type="number"
                style={inputHeight}
                name="quantity"
                onChange={e => setProjectQuantity(Number(e.target.value))}
              />
            </div>
            <div>
              <img src={FinancialImage} alt="We Plan | Financial" />
              <input
                type="number"
                style={inputHeight}
                name="quantity"
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
