import React, { useEffect, useMemo, useState } from "react"
import style from "./style.module.css"
import BurgerIgredientsTab from "../UI/Tab/burger-ingredient-tab"
import Modal from "../modal/modal"
import IngredientDetails from "../modal/modal-ingredient/ingridient-details"
import ModalOverlay from "../modal/modal-overlay/modal-overlay"
import IngredientCard from "./burger-ingridients-position/burger-ingredients-position"
import PropTypes from "prop-types"



const BurgerIngredients = ({dataInfo}) => {
	const filteredIngredient = useMemo(()=>{
	return {
	buns: dataInfo.filter((ingredient) => ingredient.type === 'bun'),
 	 sauces : dataInfo.filter((ingredient) => ingredient.type === 'sauce'),
   	mains : dataInfo.filter((ingredient) => ingredient.type === 'main'),
}},[dataInfo])

	const [isOpenIngDetails, setIsOpenIngDetails] = useState(false)
	const [selectedIngredient, setSelectedIngredient] = useState(null);
	const open = (ingredient) => {
		setIsOpenIngDetails(true)
		setSelectedIngredient(ingredient);
	}
	const closeIngDetails = () => {
		setIsOpenIngDetails(false)
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
				{isOpenIngDetails && selectedIngredient && (
					<>
					<Modal onClose ={closeIngDetails} onClick={(e) => e.stopPropagation()}>
						<IngredientDetails
							dataInfo={selectedIngredient}
							title="Детали ингредиента"
							closeModal={closeIngDetails}
						/>
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
