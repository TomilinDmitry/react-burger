import React, { children, useEffect, useState } from "react"
import style from "./modal-overlay.module.css"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { createPortal } from "react-dom"
const modalRoot = document.getElementById("modal")
const ModalOverlay = ({ children }) => {
	return (
		<>
			(
			<div className={style.modalContainer}>
				{children}
			</div>
			)
		</>
	)
}
export default ModalOverlay
