import React, { useEffect, useState } from "react"
import style from "./style.module.css"
import BurgerIgredientsTab from "../UI/Tab/burger-ingredient-tab"

import Section from "./burger-ingridients-position/burger-ingredients-position"
import Modal from "../modal/modal"
import IngredientDetails from "../modal/modal-ingredient/ingridient-details"
import ModalOverlay from "../modal/modal-overlay/modal-overlay"
import PropTypes from "prop-types"
const BurgerIgredients = ({
	buns,
	mains,
	sauces,
}) => {
	const [isOpenIngDetails, setIsOpenIngDetails] = useState(false)
	const [selectedIngredient, setSelectedIngredient] = useState(null);
	const open = (ingredient) => {
		setIsOpenIngDetails(true)
		setSelectedIngredient(ingredient);
	}
	const closeIngDetails = () => {
		setIsOpenIngDetails(false)
	}
	const KeyDown = (e) => {
		if (e.key === "Escape") {
			closeIngDetails()
		}
	}
	useEffect(() => {
		document.addEventListener("keydown", KeyDown)
		return () => {
			document.removeEventListener("keydown", KeyDown)
		}
	})
	return (
		<div className={style.container}>
			<main className={style.main}>
				<h1
					className={`${style.title} text text_type_main-large pt-10 pb-5`}>
					Соберите бургер
				</h1>
				<section className="mb-10">
					<BurgerIgredientsTab />
				</section>
				<section className={style.ingredientContainer}>
					<section className={style.tabsBlock}>
						<p className={style.blockTitle}>
							<span className="text text_type_main-medium">
								Булки
							</span>
						</p>
						<section className={style.sectionBlock}>
							{buns.map((bun) => (
								<div onClick={() => open(bun)} key={bun._id}>
									<Section {...bun} />
								</div>
							))}
						</section>
					</section>
					<section className={style.tabsBlock}>
						<p className={style.blockTitle}>
							<span className="text text_type_main-medium">
								Соусы
							</span>
						</p>
						<section className={style.sectionBlock}>
							{sauces.map((sauce) => (
								<div onClick={() => open(sauce)} key={sauce._id}>
									<Section {...sauce} />
								</div>
							))}
						</section>
					</section>
					<section className={style.tabsBlock}>
						<p className={style.blockTitle}>
							<span className="text text_type_main-medium">
								Начинки
							</span>
						</p>
						<section className={style.sectionBlock}>
							{mains.map((main) => (
								<div onClick={() => open(main)} key={main._id}>
									<Section {...main} />
								</div>
							))}
						</section>
					</section>
				</section>
				{isOpenIngDetails && selectedIngredient && (
					<Modal onClick={(e) => e.stopPropagation()}>
						<IngredientDetails
							dataInfo={selectedIngredient}
							title="Детали ингредиента"
							closeModal={closeIngDetails}
						/>
						<ModalOverlay onClose={closeIngDetails} />
					</Modal>
				)}
			</main>
		</div>
	)
}
BurgerIgredients.propTypes = {
	buns:PropTypes.array,
	sauces:PropTypes.array,
	mains:PropTypes.array,
}
export default BurgerIgredients
