import React, { useState } from "react"
import { createPortal } from "react-dom"
import ModalOverlay from "../modal-overlay/modal-overlay"
import style from "./modal.module.css"
import doneImg from "../../../images/done.svg"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"

const Modal = () => {
	return (
		<div>
			<ModalOverlay>
				<section  className={style.closeBtn}>
					<CloseIcon type="primary" />
				</section>
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
						{" "}
						Ваш заказ начали готовить
					</p>
					<p
						className={`${style.footerText} text text_type_main-default`}>
						Дождитесь готовности на орбинатльной станции
					</p>
				</div>
			</ModalOverlay>
			,
		</div>
	)
}

export default Modal
