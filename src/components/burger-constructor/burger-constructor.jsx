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
import { setIsOpen } from "../../services/burger-constructor/action"

function BurgerConstructor() {
	const dispatch = useDispatch()

	const {isOpen} = useSelector(state => state.modal)

	const open = () => {
		dispatch(setIsOpen(true))
	}
	
	// const close = () => {
	// 	dispatch(setIsOpen(false))
	// }
	
	// const KeyDown = (e) => {
	// 	if (e.key === "Escape") {
	// 		close()
	// 	}
	// }
	// useEffect(() => {
	// 	document.addEventListener("keydown", KeyDown)
	// 	return () => {
	// 		document.removeEventListener("keydown", KeyDown)
	// 	}
	// })
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
					onClick={open}
					htmlType="button"
					type="primary"
					size="medium">
					Оформить заказ
				</Button>
			</section>
			{isOpen && (
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
