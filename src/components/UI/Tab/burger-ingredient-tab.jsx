import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import React, { useState } from "react"
const BurgerIgredientsTab = () => {
	const [current, setCurrent] = useState("one")
	return (
		<div style={{ display: "flex" }}>
			<Tab
				value="one"
				active={current === "one"}
				onClick={setCurrent}>
				Булки
			</Tab>
			<Tab
				value="two"
				active={current === "two"}
				onClick={setCurrent}>
				Соусы
			</Tab>
			<Tab
				value="three"
				active={current === "three"}
				onClick={setCurrent}>
				Начинки
			</Tab>
		</div>
	)
}

export default BurgerIgredientsTab
