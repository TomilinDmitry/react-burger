import React from "react"
import style from "./modal.module.css"
import PortalReactDOM from 'react-dom';

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
const Modal = ({ children,onClose }) => {
	const modalRoot = document.getElementById("modal")
	return PortalReactDOM.createPortal(
		<div className={style.container}>
			<section onClick={onClose} className={style.text}>
				<h1>Детали заказа</h1>
			</section>
			<section className={style.closeBtn}>
				<CloseIcon type="primary" />
			</section>
			{children}
		</div>,
		modalRoot,
	)
}

export default Modal
