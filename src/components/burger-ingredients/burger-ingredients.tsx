import { useMemo, useRef, useState } from 'react';
import style from './style.module.css';
import IngredientCard from './burger-ingridients-position/burger-ingredients-position';
import {
  useSelector,
  useDispatch,
} from '../../utils/Types/hooks/typed-hooks';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { setActiveTab } from '../../services/burger-ingredients/reducer';
import { TElements } from '../../utils/Types/TElements';

export interface IBurgerIngredient {
  ingredients: {
    data: TElements[];
    error: string;
    activeTab: string;
  };
}
const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const { data, error, activeTab } = useSelector(
    (store) => store.ingredients,
  );
  const [, setOpenModal] = useState<boolean>(false);

  const setCurrentTab = (tab: string) => {
    dispatch(setActiveTab(tab));
  };

  ///Refs
  const tabsRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const ingredientRef = useRef<HTMLDivElement>(null);

  ///Scroll parametr
  const scroll = () => {
    const tabsRect = tabsRef.current?.getBoundingClientRect();
    const bunsRect = bunsRef.current?.getBoundingClientRect();
    const saucesRect = saucesRef.current?.getBoundingClientRect();
    const ingredientRect =
      ingredientRef.current?.getBoundingClientRect();

    if (tabsRect && bunsRect && saucesRect && ingredientRect) {
      if (bunsRect.top >= tabsRect.top) {
        setCurrentTab('buns');
      } else if (saucesRect.top >= tabsRect.top) {
        setCurrentTab('sauces');
      } else if (ingredientRect.top >= tabsRect.top) {
        setCurrentTab('ingredients');
      }
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
  console.log(filteredIngredient.buns.map((item) => item._id));
  const open = (ingredient: TElements) => {
    setOpenModal(true);
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
            onClick={() => {
              if (bunsRef.current) {
                bunsRef.current.scrollIntoView({
                  behavior: 'smooth',
                });
              }
              setCurrentTab('buns');
            }}
          >
            Булки
          </Tab>
          <Tab
            value="sauces"
            active={activeTab === 'sauces'}
            onClick={() => {
              if (saucesRef.current) {
                saucesRef.current.scrollIntoView({
                  behavior: 'smooth',
                });
              }
              setCurrentTab('sauces');
            }}
          >
            Соусы
          </Tab>
          <Tab
            value="ingredients"
            active={activeTab === 'ingredients'}
            onClick={() => {
              if (ingredientRef.current) {
                ingredientRef.current.scrollIntoView({
                  behavior: 'smooth',
                });
              }
              setCurrentTab('ingredients');
            }}
          >
            Начинки
          </Tab>
        </div>
        <div className={style.ingredientContainer} onScroll={scroll}>
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
      </main>
    </div>
  );
};
export default BurgerIngredients;
