import React, { useCallback, useEffect, useState } from 'react';
import IUserDTO from '../../dtos/IUserDTO';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import WindowContainer from '../WindowContainer';
import WPAllModulesContractOrderForm from '../WPAllModulesContractOrderForm';
import WPContractOrderForm from '../WPContractOrderForm';

import {
  Container,
  Products,
  Payments,
  HiringButton,
  ButtonContainer,
} from './styles';

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

interface IProps {
  handleWpProductsSection: Function;
}

const WePlanProductsSection: React.FC<IProps> = ({
  handleWpProductsSection,
}: IProps) => {
  const { company, modules, updateModules } = useAuth();
  const { addToast } = useToast();

  const [
    wpIndividualContractOrderForm,
    setWPIndividualContractOrderForm,
  ] = useState(false);
  const [
    wpAllModulesContractOrderForm,
    setWPAllModulesContractOrderForm,
  ] = useState(false);
  const [
    hireWePlanMarketConfirmation,
    setHireWePlanMarketConfirmation,
  ] = useState(false);
  const [
    unsubscribeWePlanMarketConfirmation,
    setUnsubscribeWePlanMarketConfirmation,
  ] = useState(false);
  const [companyWPContracts, setCompanyWPContracts] = useState<
    IWPContractOrder[]
  >([]);
  const [comercialProducts, setComercialProducts] = useState<IOrderProduct[]>(
    [],
  );
  const [productionProducts, setProductionProducts] = useState<IOrderProduct[]>(
    [],
  );
  const [projectsProducts, setProjectsProducts] = useState<IOrderProduct[]>([]);
  const [financialProducts, setFinancialProducts] = useState<IOrderProduct[]>(
    [],
  );
  const [marketProduct, setMarketProduct] = useState<IOrderProduct>(
    {} as IOrderProduct,
  );
  const [marketplace, setMarketplace] = useState(false);
  const [hiredProducts, setProducts] = useState<IOrderProduct[]>([]);

  const [wpMarket, setWPMarket] = useState<IWPProduct>({} as IWPProduct);
  const getWPProducts = useCallback(() => {
    try {
      api.get<IWPProduct[]>('wp-products').then(response => {
        const weplanMarket = response.data.find(
          xMarket => xMarket.name === 'Marketplace',
        );
        if (weplanMarket !== undefined) {
          setWPMarket(weplanMarket);
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    getWPProducts();
  }, [getWPProducts]);

  const closeContractOrderForms = useCallback(() => {
    setWPIndividualContractOrderForm(false);
    setWPAllModulesContractOrderForm(false);
    setHireWePlanMarketConfirmation(false);
  }, []);

  const handleIndividualContractOrderForm = useCallback(() => {
    closeContractOrderForms();
    setWPIndividualContractOrderForm(true);
  }, [closeContractOrderForms]);
  const closeIndividualContractOrderForm = useCallback(() => {
    setWPIndividualContractOrderForm(false);
  }, []);
  const handleAllModulesContractOrderForm = useCallback(() => {
    closeContractOrderForms();
    setWPAllModulesContractOrderForm(true);
  }, [closeContractOrderForms]);

  const closeAllModulesContractOrderForm = useCallback(() => {
    setWPAllModulesContractOrderForm(false);
  }, []);

  const getCompanyWPContractOrders = useCallback(() => {
    try {
      api
        .get<IWPContractOrder[]>(`/wp/contract-orders/${company.id}`)
        .then(response => {
          const sortModules: IContractWPModulesDTO[] = [];
          setCompanyWPContracts(response.data);
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
  }, [company, modules, updateModules]);

  useEffect(() => {
    getCompanyWPContractOrders();
  }, [getCompanyWPContractOrders]);

  const handleSubscribeToMarket = useCallback(async () => {
    try {
      await api.post('/wp/contract-orders', {
        user_id: company.id,
        products: [
          {
            weplan_product_id: wpMarket.id,
            quantity: 1,
          },
        ],
      });

      addToast({
        type: 'success',
        title: 'Bem vindo ao WePlan Market!',
        description:
          'Você agora poderá desfrutar do maior mercado de eventos do mundo!',
      });
      getCompanyWPContractOrders();
      setHireWePlanMarketConfirmation(false);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao adicionar membro da festa',
        description: 'Erro ao adicionar membro da festa, tente novamente.',
      });
      throw new Error(err);
    }
  }, [addToast, getCompanyWPContractOrders, company, wpMarket]);

  const unsubscribeToMarket = useCallback(async () => {
    try {
      await api.delete(`/wp/contract-orders/products/${marketProduct.id}`);

      addToast({
        type: 'error',
        title: 'Infelizmente você não faz mais parte do WePlan Market!',
        description:
          'Você não poderá mais desfrutar do maior mercado de eventos do mundo! ;8^(',
      });
      getCompanyWPContractOrders();
      setMarketProduct({} as IOrderProduct);
      setMarketplace(false);
      setUnsubscribeWePlanMarketConfirmation(false);
      handleWpProductsSection();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao excluir produto!',
        description: 'Erro ao excluir produto, tente novamente.',
      });
      throw new Error(err);
    }
  }, [
    addToast,
    getCompanyWPContractOrders,
    marketProduct,
    handleWpProductsSection,
  ]);

  useEffect(() => {
    const pRODUCTS: IOrderProduct[] = [];
    const cRM: IOrderProduct[] = [];
    const pRODUCTION: IOrderProduct[] = [];
    const pROJECT: IOrderProduct[] = [];
    const fINANCIAL: IOrderProduct[] = [];
    companyWPContracts.map(contract => {
      const { products } = contract;

      products.map(crm => {
        pRODUCTS.push(crm);
        crm.weplanProduct.name === 'Comercial' && cRM.push(crm);
        crm.weplanProduct.name === 'Production' && pRODUCTION.push(crm);
        crm.weplanProduct.name === 'Projects' && pROJECT.push(crm);
        crm.weplanProduct.name === 'Financial' && fINANCIAL.push(crm);
        crm.weplanProduct.name === 'Marketplace' && setMarketProduct(crm);
        crm.weplanProduct.name === 'Marketplace' && setMarketplace(true);

        return crm;
      });
      return contract;
    });
    setProducts(pRODUCTS);
    setComercialProducts(cRM);
    setProductionProducts(pRODUCTION);
    setProjectsProducts(pROJECT);
    setFinancialProducts(fINANCIAL);
  }, [companyWPContracts]);

  return (
    <>
      {!!wpIndividualContractOrderForm && (
        <WPContractOrderForm
          getCompanyWPContractOrders={getCompanyWPContractOrders}
          handleCloseWindow={closeIndividualContractOrderForm}
          handleWpProductsSection={handleWpProductsSection}
          onHandleCloseWindow={() => setWPIndividualContractOrderForm(false)}
        />
      )}
      {!!wpAllModulesContractOrderForm && (
        <WPAllModulesContractOrderForm
          getCompanyWPContractOrders={getCompanyWPContractOrders}
          handleCloseWindow={closeAllModulesContractOrderForm}
          handleWpProductsSection={handleWpProductsSection}
          onHandleCloseWindow={() => setWPAllModulesContractOrderForm(false)}
        />
      )}
      {!!hireWePlanMarketConfirmation && (
        <WindowContainer
          containerStyle={{
            zIndex: 25,
            top: '20%',
            left: '20%',
            width: '60%',
            height: '60%',
          }}
          onHandleCloseWindow={() => setHireWePlanMarketConfirmation}
        >
          <h1>Quero ter acesso ao maior mercado de eventos do mundo!</h1>
          <ButtonContainer>
            <button
              type="button"
              style={{ background: 'green' }}
              onClick={handleSubscribeToMarket}
            >
              Sim
            </button>
            <button
              type="button"
              style={{ background: 'red' }}
              onClick={() => setHireWePlanMarketConfirmation(false)}
            >
              Não
            </button>
          </ButtonContainer>
        </WindowContainer>
      )}
      {!!unsubscribeWePlanMarketConfirmation && (
        <WindowContainer
          containerStyle={{
            zIndex: 25,
            top: '20%',
            left: '20%',
            width: '60%',
            height: '60%',
          }}
          onHandleCloseWindow={() => setHireWePlanMarketConfirmation}
        >
          <h1>Tem certeza de que deseja abandonar o mercado de eventos?</h1>
          <ButtonContainer>
            <button
              type="button"
              style={{ background: 'red' }}
              onClick={unsubscribeToMarket}
            >
              Sim
            </button>
            <button
              type="button"
              style={{ background: 'green' }}
              onClick={() => setUnsubscribeWePlanMarketConfirmation(false)}
            >
              Não
            </button>
          </ButtonContainer>
        </WindowContainer>
      )}
      <Container>
        <h1>Mensalidade Produtos WePlan</h1>
        <div>
          <p>Acreditamos na liberdade e na constante busca pela excelência!</p>
          <p>Por isso, aqui você é livre para entrar e sair quando quiser.</p>
        </div>
        <Products>
          <div>
            <HiringButton
              type="button"
              onClick={handleIndividualContractOrderForm}
            >
              Módulos Individuais
            </HiringButton>
            <h3>Recomendável para até 3 módulos</h3>
            <span>
              <h3>
                R$ <strong>29,90</strong> / por usuário
              </h3>
            </span>
            <HiringButton
              type="button"
              onClick={handleIndividualContractOrderForm}
            >
              Contratar
            </HiringButton>
          </div>
          <div>
            <HiringButton
              type="button"
              onClick={handleAllModulesContractOrderForm}
            >
              We Plan Champion
            </HiringButton>
            <h3>Todos os Módulos</h3>
            <span>
              <h3>
                R$ <strong>99,90</strong> / por usuário
              </h3>
            </span>
            <HiringButton
              type="button"
              onClick={handleAllModulesContractOrderForm}
            >
              Contratar
            </HiringButton>
          </div>
          <div>
            <HiringButton
              type="button"
              onClick={() => setHireWePlanMarketConfirmation(true)}
            >
              WePlan Market
            </HiringButton>
            <h3>Acesso aos melhores clientes do mercado de eventos!</h3>
            <span>
              <h3>
                R$ <strong>99,90</strong> / por usuário
              </h3>
            </span>
            {marketplace ? (
              <HiringButton
                type="button"
                onClick={() => setUnsubscribeWePlanMarketConfirmation(true)}
              >
                Você já está entre os melhores!
              </HiringButton>
            ) : (
              <HiringButton
                type="button"
                onClick={() => setHireWePlanMarketConfirmation(true)}
              >
                Contratar
              </HiringButton>
            )}
          </div>
        </Products>

        <Payments>
          <h1>Produtos Contratados: {hiredProducts.length}</h1>
          <div>
            <h3>Produto</h3>
            <h3>Quantidade</h3>
            <h3>Alocação</h3>
          </div>
          <div>
            <p>Comercial</p>
            <p>{comercialProducts.length}</p>
            <p>10/15 - 66,67%</p>
          </div>
          <div>
            <p>production</p>
            <p>{productionProducts.length}</p>
            <p>10/15 - 66,67%</p>
          </div>
          <div>
            <p>project</p>
            <p>{projectsProducts.length}</p>
            <p>10/15 - 66,67%</p>
          </div>
          <div>
            <p>Financeiro</p>
            <p>{financialProducts.length}</p>
            <p>10/15 - 66,67%</p>
          </div>
          <div>
            <p>Mercado WePlan</p>
            {marketProduct.weplanProduct !== undefined &&
            marketProduct.weplanProduct.name === 'Marketplace' ? (
              <>
                <p>1</p>
                <p>Elite!</p>
              </>
            ) : (
              <>
                <p>0</p>
                <p>-</p>
              </>
            )}
          </div>
        </Payments>
      </Container>
    </>
  );
};

export default WePlanProductsSection;
