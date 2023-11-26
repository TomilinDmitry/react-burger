import React, { useEffect, useState } from "react"
import style from "./modal.module.css"
import PortalReactDOM from "react-dom"
const Modal = ({ children }) => {
	const modalRoot = document.getElementById("modal")
	return PortalReactDOM.createPortal(
		<div className={style.container}>{children}</div>,
		modalRoot,
	)
}

export default Modal
