import React from "react"
import doneImg from "../../../images/done.svg"
import style from "./modal.module.css"
const OrderDetails = () => {
	return (
		<div className={style.mainContainer}>
			<p className={`${style.order} text text_type_digits-large`}>
				12890
			</p>
			<p className="text text_type_main-default mb-15">
				Идентификатор заказа
			</p>
			<section className="mb-15">
				<img src={doneImg} alt="123" />
			</section>
			<p className="text text_type_main-default mb-2">
				Ваш заказ начали готовить
			</p>
			<p
				className={`${style.footerText} text text_type_main-default`}>
				Дождитесь готовности на орбинатльной станции
			</p>
		</div>
	)
}

export default OrderDetails
