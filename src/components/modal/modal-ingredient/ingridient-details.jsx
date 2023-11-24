import React from "react"
import ModalOverlay from "../modal-overlay/modal-overlay"
import style from "./ingridient-details.module.css"
const IngredientDetails = (props) => {
	return (
		<ModalOverlay>
			<div className={style.mainContainer}>
				<p className={`${style.order} text text_type_digits-large`}>
					12890
				</p>
				<p className="text text_type_main-default mb-15">
					Идентификатор заказа
				</p>
				<section className="mb-15">
					<img src={props.img} alt="123" />
				</section>
				<p className="text text_type_main-default mb-2">
					{" "}
					Ваш заказ начали готовить
				</p>
				<p
					className={`${style.footerText} text text_type_main-default`}>
					{" "}
					Дождитесь готовности на орбинатльной станции
				</p>
			</div>
		</ModalOverlay>
	)
}

export default IngredientDetails
