import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../../../services/burger-ingredients/reducer';
import style from './tabs.module.css';
import { IBurgerIngredient } from '../../burger-ingredients/burger-ingredients';
type TBurgerTab = Pick<IBurgerIngredient['ingredients'], 'activeTab'>;
const BurgerIgredientsTab = () => {
  const { activeTab } = useSelector(
    (store: { burger: TBurgerTab }) => store.burger,
  );
  const dispatch = useDispatch();
  const currentTab = (tab: string) => {
    dispatch(setActiveTab(tab));
  };

  return (
    <div className={style.container}>
      <Tab
        value="buns"
        active={activeTab === 'buns'}
        onClick={() => currentTab('buns')}
      >
        Булки
      </Tab>
      <Tab
        value="sauces"
        active={activeTab === 'sauces'}
        onClick={() => currentTab('sauces')}
      >
        Соусы
      </Tab>
      <Tab
        value="ingredients"
        active={activeTab === 'ingedients'}
        onClick={() => currentTab('ingedients')}
      >
        Начинки
      </Tab>
    </div>
  );
};

export default BurgerIgredientsTab;
