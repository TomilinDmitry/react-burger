import React, { useEffect, useMemo, useRef, useState } from 'react';
import style from './style.module.css';
// import Modal from '../modal/modal';
// import IngredientDetails from '../modal/modal-ingredient/ingridient-details';
import IngredientCard from './burger-ingridients-position/burger-ingredients-position';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { setActiveTab } from '../../services/burger-ingredients/reducer';
// import { getIngredient } from '../../utils/Api/api-ingredients';
// import {  useLocation, useNavigate } from 'react-router-dom';

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const { data, loading, error, activeTab } = useSelector(
    (store) => store.ingredients,
  );
  const [openModal, setOpenModal] = useState(false);

  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const setCurrentTab = (tab) => {
    dispatch(setActiveTab(tab));
  };


  ///Refs
  const tabsRef = useRef(null);
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const ingredientRef = useRef(null);

  ///Scroll parametr
  const scroll = () => {
    const tabsRect = tabsRef.current.getBoundingClientRect();
    const bunsRect = bunsRef.current.getBoundingClientRect();
    const saucesRect = saucesRef.current.getBoundingClientRect();
    const ingredientRect =
      ingredientRef.current.getBoundingClientRect();

    if (bunsRect.top >= tabsRect.top) {
      setCurrentTab('buns');
    } else if (saucesRect.top >= tabsRect.top) {
      setCurrentTab('sauces');
    } else if (ingredientRect.top >= tabsRect.top) {
      setCurrentTab('ingredients');
    }
  };

  const filteredIngredient = useMemo(() => {
    return {
      buns: data.filter((ingredient) => ingredient.type === 'bun'),
      sauces: data.filter(
        (ingredient) => ingredient.type === 'sauce',
      ),
      mains: data.filter((ingredient) => ingredient.type === 'main'),
    };
  }, [data]);

  const open = (ingredient) => {
    setOpenModal(true);
    setSelectedIngredient(ingredient);
  };
  const onClose = () => {
    setOpenModal(false);
  };
  if (error) {
    return (
      <p className={`${style.failedBlock} text text_type_main-large`}>
        Ошибка при загрузке данных{error}
      </p>
    );
  }
  return (
    <div className={style.container}>
      <main className={style.main}>
        <h1
          className={`${style.title} text text_type_main-large pt-10 pb-5`}
        >
          Соберите бургер
        </h1>
        <div ref={tabsRef} className={`${style.tabs} mb-10`}>
          <Tab
            value="buns"
            active={activeTab === 'buns'}
            onClick={() =>
              setCurrentTab(
                'buns',
                bunsRef.current.scrollIntoView({
                  behavior: 'smooth',
                }),
              )
            }
          >
            Булки
          </Tab>
          <Tab
            value="sauces"
            active={activeTab === 'sauces'}
            onClick={() =>
              setCurrentTab(
                'sauces',
                saucesRef.current.scrollIntoView({
                  behavior: 'smooth',
                }),
              )
            }
          >
            Соусы
          </Tab>
          <Tab
            value="ingredients"
            active={activeTab === 'ingredients'}
            onClick={() =>
              setCurrentTab(
                'ingredients',
                ingredientRef.current.scrollIntoView({
                  behavior: 'smooth',
                }),
              )
            }
          >
            Начинки
          </Tab>
        </div>
        {/* {loading ? (
          <p
            className={`${style.loadingBlock} text text_type_main-large`}
          >
            <span>Происходит загрузка данных, ожидайте....</span>
          </p>
        ) : ( */}
          <div
            className={style.ingredientContainer}
            onScroll={scroll}
          >
            <section ref={bunsRef} className={style.tabsBlock}>
              <h1
                className={`${style.blockTitle} text text_type_main-medium`}
              >
                Булки
              </h1>
              <section className={style.sectionBlock}>
                {filteredIngredient.buns.map((bun) => (
                  <div onClick={() => open(bun)} key={bun._id}>
                    <IngredientCard {...bun} />
                  </div>
                ))}
              </section>
            </section>
            <section ref={saucesRef} className={style.tabsBlock}>
              <h1
                className={`${style.blockTitle} text text_type_main-medium`}
              >
                Соусы
              </h1>
              <section className={style.sectionBlock}>
                {filteredIngredient.sauces.map((sauce) => (
                  <div onClick={() => open(sauce)} key={sauce._id}>
                    <IngredientCard {...sauce} />
                  </div>
                ))}
              </section>
            </section>
            <section ref={ingredientRef} className={style.tabsBlock}>
              <h1
                className={`${style.blockTitle} text text_type_main-medium`}
              >
                Начинки
              </h1>
              <section className={style.sectionBlock}>
                {filteredIngredient.mains.map((main) => (
                  <div onClick={() => open(main)} key={main._id}>
                    <IngredientCard {...main} />
                  </div>
                ))}
              </section>
            </section>
          </div>
        {/* )} */}

        {/* {selectedIngredient && openModal && background && (
          <>
            <Routes>
              <Route
                path="/ingredients/:ingredientId"
                element={
                  <Modal
                    close={onClose}
                    onClick={(e) => e.stopPropagation()}
                    title="Детали ингредиента"
                  >
                    <IngredientDetails
                      selectedIngredient={selectedIngredient}
                    />
                  </Modal>
                }
              />
            </Routes>
          </>
        )} */}
      </main>
    </div>
  );
};
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ),
  loading: PropTypes.bool,
  error: PropTypes.string,
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
  setSelectedIngredient: PropTypes.func,
  isOpenIngDetails: PropTypes.bool,
  setIsOpenIngDetails: PropTypes.func,
};

export default BurgerIngredients;
