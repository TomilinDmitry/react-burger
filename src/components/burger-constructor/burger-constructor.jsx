import React, { useState } from "react"
import style from "./constructor.module.css"
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components"
import ConstructorPositions from "./burger-free-positions/free-positions-constuctor"
import Modal from "../modal/modal"
import PropTypes from "prop-types"
import OrderDetails from "../modal/order-modal/order-modal"
import ModalOverlay from "../modal/modal-overlay/modal-overlay"

function BurgerConstructor({ props }) {
	const [isOpen, setIsOpen] = useState(false)
	const open = () => {
		setIsOpen(true)
	}
	const close = () => {
		setIsOpen(false)
	}
	return (
		<aside className={style.container}>
			<section className="mb-4 ml-8">
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
			<section
				// onClick={() => setIngridientModal(true)}
				className={style.freePositionBlock}>
				<ConstructorPositions />
			</section>
			<section className="pl-8">
				<ConstructorElement
					type="bottom"
					isLocked={true}
					text="Краторная булка N-200i (верх)"
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
				<Modal onClose={close}>
					<OrderDetails />
					<ModalOverlay />
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
