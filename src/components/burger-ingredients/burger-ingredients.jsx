import React, { useEffect, useMemo, useRef} from "react"
import style from "./style.module.css"
import BurgerIgredientsTab from "../UI/Tab/burger-ingredient-tab"
import Modal from "../modal/modal"
import IngredientDetails from "../modal/modal-ingredient/ingridient-details"
import IngredientCard from "./burger-ingridients-position/burger-ingredients-position"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { asyncIngredient } from "../../services/async-action/async-action"
import { setSelectedIngredient } from "../../services/burger-ingredients/ingredient-details/action"



const BurgerIngredients = () => {
	const dispatch = useDispatch();
	const {data,loading,failed} = useSelector(store=>store.burger)

	useEffect(()=>{
		dispatch(asyncIngredient())
	},[dispatch])

	const {selectedIngredient} = useSelector(store=>store.selected)

	const filteredIngredient = useMemo(()=>{
		return {
			buns: data.filter((ingredient) => ingredient.type === 'bun'),
 	 		sauces : data.filter((ingredient) => ingredient.type === 'sauce'),
   			mains : data.filter((ingredient) => ingredient.type === 'main'),
				}},[data])

	const open = (ingredient) => {
		dispatch(setSelectedIngredient(ingredient));
	}

	if (loading) {
		return <p>Происходит загрузка данных,ожидайте....</p>; 
	  }

	if (failed) {
		return <p>Ошибка при загрузке данных:{failed}</p>;
	  }	
	return (
		<div className={style.container}>
			<main className={style.main}>
				<h1
					className={`${style.title} text text_type_main-large pt-10 pb-5`}>
					Соберите бургер
				</h1>
				<div className="mb-10">
					<BurgerIgredientsTab />
				</div>
				<div className={style.ingredientContainer}>
					<section className={style.tabsBlock}>
						<h1 className={`${style.blockTitle} text text_type_main-medium`}>
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
					<section className={style.tabsBlock}>
					<h1 className={`${style.blockTitle} text text_type_main-medium`}>
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
					<div className={style.tabsBlock}>
						<h1 className={`${style.blockTitle} text text_type_main-medium`}>
							Начинки
						</h1>
						<section className={style.sectionBlock}>
							{filteredIngredient.mains.map((main) => (
								<div onClick={() => open(main)} key={main._id}>
									<IngredientCard {...main} />
								</div>
							))}
						</section>
					</div>
				</div>

				{selectedIngredient && (
					<>
					<Modal onClick={(e) => e.stopPropagation()}>
						<IngredientDetails title="Детали ингредиента"/>
					</Modal>
					</>
				)}
			</main>
		</div>
	)
}
BurgerIngredients.propTypes = {
	dataInfo:PropTypes.arrayOf(
		PropTypes.shape({
		_id:PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
		}

export default BurgerIngredients
