import React, { useEffect, useState } from "react"
import style from "./constructor.module.css"
import {
	Button,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components"
import Modal from "../modal/modal"
import PropTypes from "prop-types"
import OrderDetails from "../modal/order-modal/order-modal"
import TopStubs from "../UI/Stubs/top/top-stubs"
import CenterStubs from "../UI/Stubs/center/center-stubs"
import BottomStubs from "../UI/Stubs/bottom/bottom-stubs"
import { useDispatch, useSelector } from "react-redux"
import { asyncOrder } from "../../services/async-action/async-action-ingredient"

function BurgerConstructor() {
	const dispatch = useDispatch()
	const onSubmitOrder = () =>{
		dispatch(asyncOrder([ "643d69a5c3f7b9001cfa093c","643d69a5c3f7b9001cfa093f", "643d69a5c3f7b9001cfa093c"]))
	}
	const {loading,orderName,failed} = useSelector(state=> state.order)
	if (loading) {
		return <p className={`${style.loadingBlock} text text_type_main-large`}>
			<span>
			Ожидайте,ваш заказ формируется....
			</span>
			</p>; 
	  }

	if (failed) {
		return <p className={`${style.failedBlock} text text_type_main-large`}>Ошибка при формировании заказа:{failed}</p>;
	  }	
	return (
		<aside className={style.container}>
			<section  className="mb-4 ml-8">
				{/* <ConstructorElement
					type="top"
					isLocked={true}
					text="Краторная булка N-200i (верх)"
					price={200}
					thumbnail={
						"https://code.s3.yandex.net/react/code/bun-02.png"
					}
				/> */}
				<TopStubs/>
			</section>
			<section className={`${style.freePositionBlock} mb-4 ml-8`}>
				{/* <ConstructorPositions ingredients={ingredients} /> */}
				<CenterStubs/>
			</section>
			<section className="pl-8">
				{/* <ConstructorElement
					type="bottom"
					isLocked={true}
					text="Краторная булка N-200i (низ)"
					price={200}
					thumbnail={
						"https://code.s3.yandex.net/react/code/bun-02.png"
					}
				/> */}
				<BottomStubs/>
			</section>
			<section className={style.bottomContainer}>
				<p className="text text_type_digits-medium mr-10">
					0 <CurrencyIcon type="primary" />
				</p>
				<Button
					onClick={onSubmitOrder}
					htmlType="button"
					type="primary"
					size="medium">
					Оформить заказ
				</Button>
			</section>
			{orderName && (
				<Modal onClick={(e) => e.stopPropagation()}>
					<OrderDetails title="Детали заказа"  />
				</Modal>
			)}
		</aside>
	)
}

BurgerConstructor.propTypes = {
	type: PropTypes.string,
	isLocked: PropTypes.bool,
	text: PropTypes.string,
	price: PropTypes.number,
	thumbnail: PropTypes.string,
	htmlType: PropTypes.string,
	size: PropTypes.string,
	title: PropTypes.string,
	ingredients:PropTypes.array
}

export default BurgerConstructor
