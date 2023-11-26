import React, { useEffect, useState } from "react"
import style from "./constructor.module.css"
import {
	Button,
	CloseIcon,
	ConstructorElement,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components"
import ConstructorPositions from "./burger-free-positions/free-positions-constuctor"
import Modal from "../modal/modal"
import PropTypes from "prop-types"
import OrderDetails from "../modal/order-modal/order-modal"
import ModalOverlay from "../modal/modal-overlay/modal-overlay"
import IngredientDetails from "../modal/modal-ingredient/ingridient-details"

function BurgerConstructor({ ingredients, dataInfo }) {
	const [isOpen, setIsOpen] = useState(false)
	const [isOpenIngDetails, setIsOpenIngDetails] = useState(false)
	const open = () => {
		setIsOpen(true)
	}
	const openIngDetails = () => {
		setIsOpenIngDetails(true)
	}
	const close = () => {
		setIsOpen(false)
	}
	const closeIngDetails = () => {
		setIsOpenIngDetails(false)
	}
	const KeyDown = (e) => {
		if (e.key === "Escape") {
			close()
		}
	}
	useEffect(() => {
		document.addEventListener("keydown", KeyDown)
		return () => {
			document.removeEventListener("keydown", KeyDown)
		}
	})
	return (
		<aside className={style.container}>
			<section  className="mb-4 ml-8">
				<ConstructorElement
					type="top"
					isLocked={true}
					text="Краторная булка N-200i (верх)"
					price={200}
					thumbnail={
						"https://code.s3.yandex.net/react/code/bun-02.png"
					}
				/>
			</section>
			<section className={style.freePositionBlock}>
				<ConstructorPositions isOpen={openIngDetails} ingredients={ingredients} />
			</section>
			<section className="pl-8">
				<ConstructorElement
					type="bottom"
					isLocked={true}
					text="Краторная булка N-200i (низ)"
					price={200}
					thumbnail={
						"https://code.s3.yandex.net/react/code/bun-02.png"
					}
				/>
			</section>
			<section className={style.bottomContainer}>
				<p className="text text_type_digits-medium mr-10">
					610 <CurrencyIcon type="primary" />
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
					<OrderDetails title="Детали заказа" closeModal={close} />
					<ModalOverlay onClose={close} />
				</Modal>
			)}
			{isOpenIngDetails && (
				<Modal onClick={(e) => e.stopPropagation()}>
					<IngredientDetails
						dataInfo={dataInfo}
						title="Детали ингредиента"
						closeModal={closeIngDetails}
						name="БиоКотлета"
					/>
					<ModalOverlay onClose={closeIngDetails} />
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
}

export default BurgerConstructor
