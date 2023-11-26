import React from "react"
import style from "./style.module.css"
import BurgerIgredientsTab from "../UI/Tab/burger-ingredient-tab"

import Section from "./burger-ingridients-position/burger-ingredients-position"
const BurgerIgredients = ({ ingredients }) => {
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
					{ingredients.map((ingredient) => (
						<Section {...ingredient} key={ingredient._id} />
					))}
				</section>
			</main>
		</div>
	)
}

export default BurgerIgredients
