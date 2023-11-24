import React from "react"
import Bread from "../burger-ingridients-bread/burger-ingredients-bread"
import style from "../style.module.css"
import Section from "../burger-ingridients-bread/burger-ingredients-bread"

const BurgerSection = (props) => {
	return (
		<>
			<h1
				style={{ textAlign: "start" }}
				className="text text_type_main-medium mb-6">
				{props.section_name}
			</h1>
			<section className={style.breadContainer}>
				<Section
					src={props.src}
					price={props.price}
					name={props.name}
					alt={props.alt}
				/>
				<Section
					src={props.src_second}
					price={props.price_second}
					name={props.name_second}
					alt={props.alt_second}
				/>
			</section>
		</>
	)
}

export default BurgerSection
