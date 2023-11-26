import {
	ConstructorElement,
	DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components"
import React from "react"
import style from "./free-positions.module.css"
const ConstructorPositions = ({
	ingredients,
	index,
	dataInfo,
	isOpen,
}) => {
	return (
		<ul className={style.container}>
			{ingredients.map((ingredient, index) => (
				<li
					onClick={()=>isOpen}
					className={`${style.list} mb-4`}
					key={index}>
					<DragIcon type="primary" />
					<ConstructorElement
						isLocked={false}
						text={ingredient.name}
						price={ingredient.price}
						thumbnail={ingredient.image}
					/>
				</li>
			))}
		</ul>
	)
}

export default ConstructorPositions
