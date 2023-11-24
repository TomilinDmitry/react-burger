import React from "react"
import style from "./style.module.css"
import BurgerIgredientsTab from "../UI/Tab/burger-ingredient-tab"
import AssambleBurger from "./assamble-burger/assamble-burger"
import BurgerConstructor from "../burger-constructor/burger-constructor"

const BurgerIgredients = (props) => {
	return (
		<div className={style.container}>
			<main className={style.main}>
				<h1
					style={{ textAlign: "start" }}
					className="text text_type_main-large pt-10 pb-5">
					Соберите бургер
				</h1>
				<section className="mb-10">
					<BurgerIgredientsTab />
				</section>
				<AssambleBurger  />
			</main>
			<aside>
				<BurgerConstructor />
			</aside>
		</div>
	)
}

export default BurgerIgredients
