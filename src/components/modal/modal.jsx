import React, { useEffect } from "react"
import style from "./modal.module.css"
import PortalReactDOM from "react-dom"
import PropTypes from "prop-types"
import ModalOverlay from "./modal-overlay/modal-overlay"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedIngredient } from "../../services/burger-ingredients/ingredient-details/action"
import { setIsOpen } from "../../services/burger-constructor/action"

const Modal = ({ children}) => {
	const dispatch = useDispatch()
	const KeyDown = (e) => {
		if (e.key === "Escape") {
			dispatch(setSelectedIngredient(null))
			dispatch(setIsOpen(false))
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
		<div className={style.container}>{children}
		
		<ModalOverlay />
		</div>,
		modalRoot,
		)
	}
Modal.propTypes ={
	onClose: PropTypes.func.isRequired,
	children:PropTypes.any
}
export default Modal
