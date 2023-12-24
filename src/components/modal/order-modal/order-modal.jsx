import React from "react"
import doneImg from "../../../images/done.svg"
import style from "./modal.module.css"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { orderClose } from "../../../services/burger-constructor/order-details/action"
import { setBun, setDraggedElements } from "../../../services/burger-constructor/reducer"

const OrderDetails = ({ title }, props) => {
	const dispatch = useDispatch()
	const {orderNumber,orderName} = useSelector(state=> state.order)

	const close = () => {
		dispatch(orderClose())
		dispatch(setDraggedElements([]));
      	dispatch(setBun())
	}
	return (
		<div className={style.mainContainer}>
			<section className={style.overlayHeader}>
				<section>
					<h1>{title}</h1>
				</section>

				<section onClick={close}className={style.closeBtn}>
					<CloseIcon type="primary" />
				</section>
			</section>
			<h1 className={style.orderTitle}>{props.title}</h1>
			<p className={`${style.order} text text_type_digits-large`}>
				{orderNumber}
			</p>
			<p className="text text_type_main-default mb-15">
				Идентификатор заказа
			</p>
			<section className="mb-15">
				<img src={doneImg} alt="Выполнено!" />
			</section>
			<section className={style.footerTextBlock}>
				<p className="text text_type_main-default mb-2">
					Ваш заказ начали готовить
				</p>
				<p
					className={`${style.footerText} text text_type_main-default`}>
					Дождитесь готовности на орбинатльной станции
				</p>
			</section>
		</div>
	)
}
OrderDetails.propTypes = {
	title: PropTypes.string,
	props: PropTypes.string,
}
export default OrderDetails
