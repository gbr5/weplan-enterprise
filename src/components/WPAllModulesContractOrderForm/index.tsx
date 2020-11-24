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
// import HRImage from '../../assets/hr_module_small.svg';

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

const WPAllModulesContractOrderForm: React.FC<IPropsDTO> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  handleWpProductsSection,
  getCompanyWPContractOrders,
}: IPropsDTO) => {
  const { addToast } = useToast();
  const { company } = useAuth();

  const [wpProducts, setWPProducts] = useState<IWPProductDTO[]>([]);
  const [
    companyManagementModulesQuantity,
    setCompanyManagementModulesQuantity,
  ] = useState(0);

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
  // const wpHR = wpProducts.find(wpM => wpM.name === 'HR');

  const inputHeight = { height: '40px', width: '80px' };

  const handleSubmit = useCallback(async () => {
    try {
      const selectedWPProducts: ISelectedWPManagementModulesDTO[] = [];

      companyManagementModulesQuantity > 0 &&
        selectedWPProducts.push(
          {
            weplan_product_id: wpCRM ? wpCRM.id : '',
            quantity: companyManagementModulesQuantity,
          },
          {
            weplan_product_id: wpProduction ? wpProduction.id : '',
            quantity: companyManagementModulesQuantity,
          },
          {
            weplan_product_id: wpProject ? wpProject.id : '',
            quantity: companyManagementModulesQuantity,
          },
          {
            weplan_product_id: wpFinancial ? wpFinancial.id : '',
            quantity: companyManagementModulesQuantity,
          },
        );

      await api.post('/wp/contract-orders', {
        user_id: company.id,
        products: selectedWPProducts,
      });

      addToast({
        type: 'success',
        title: 'Membro da festa adicionado com sucesso',
        description: 'Ele já pode visualizar as informações do evento.',
      });
      getCompanyWPContractOrders();
      handleWpProductsSection();
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
    getCompanyWPContractOrders,
    companyManagementModulesQuantity,
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
          <p>Selecione o número de acessos WePlanChampion</p>
          <p>1 acesso por pessoa</p>
          <WPModule>
            <div>
              <div>
                <img src={ComercialImage} alt="We Plan | Comercial" />
                <img src={ProductionImage} alt="We Plan | Production" />
                <img src={ProjectsImage} alt="We Plan | Projects" />
                <img src={FinancialImage} alt="We Plan | Financial" />
              </div>
              <input
                type="number"
                style={inputHeight}
                name="crm_quantity"
                onChange={e =>
                  setCompanyManagementModulesQuantity(Number(e.target.value))
                }
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

export default WPAllModulesContractOrderForm;
