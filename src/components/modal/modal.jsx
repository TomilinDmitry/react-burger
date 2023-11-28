import React, { useEffect } from "react"
import style from "./modal.module.css"
import PortalReactDOM from "react-dom"
import PropTypes from "prop-types"

const Modal = ({ children,onClose }) => {
	const KeyDown = (e) => {
		if (e.key === "Escape") {
			onClose()
		}
	}
	useEffect(() => {
		document.addEventListener("keydown", KeyDown)
		return () => {
			document.removeEventListener("keydown", KeyDown)
		}
	})
	const modalRoot = document.getElementById("modal")
	return PortalReactDOM.createPortal(
		<div className={style.container}>{children}</div>,
		modalRoot,
	)
}
Modal.propTypes ={
	onClose: PropTypes.func.isRequired,
	children:PropTypes.any
}
export default Modal
