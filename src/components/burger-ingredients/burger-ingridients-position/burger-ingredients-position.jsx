import React, { useState } from "react"
import "./bread.module.css"
import style from "./bread.module.css"
import {
	Counter,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"

const IngredientCard = (props) => {
	const [count, setCount] = useState(0)
	const { draggedElement, draggedElements} = useSelector(
		(state) => state.container,
	  );
	
	
	
	return (
		<section className={style.container}>
			<Counter count={count} size="default" extraClass="m-1" />
			<img
				onClick={count}
				src={props.image}
				alt={props.name}
			/>

			<p className={`${style.paragraph} text text_type_digits-default m-1`}>
				{props.price}
				<CurrencyIcon type="primary" className="ml-4" />
			</p>
			<p className="text text_type_main-default">
				{props.name}
			</p>
		</section>
	)
}
IngredientCard.propTypes ={
	image:PropTypes.string,
	name:PropTypes.string,
	price:PropTypes.number
}

export default IngredientCard