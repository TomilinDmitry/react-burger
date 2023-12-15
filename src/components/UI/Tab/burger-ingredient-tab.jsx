import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../../../services/burger-ingredients/action';
const BurgerIgredientsTab = () => {
  // const [current, setCurrent] = useState("one")
  const { activeTab } = useSelector((store) => store.burger);
  const dispatch = useDispatch();
  const currentTab = (tab) => {
    dispatch(setActiveTab(tab));
  };

  return (
    <div style={{ display: 'flex' }}>
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
