import React from "react"
import style from "./modal-overlay.module.css"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { setSelectedIngredient } from "../../../services/burger-ingredients/ingredient-details/action"
import { setIsOpen } from "../../../services/burger-constructor/action"


const ModalOverlay = () => {
	const dispatch = useDispatch()

	const handleClick = () => {
		dispatch(setSelectedIngredient(null))
		dispatch(setIsOpen(false))
	}
	return (
		<div onClick={handleClick} className={style.modalContainer}></div>
	)
}
ModalOverlay.propTypes = {
	onClose: PropTypes.func.isRequired,
}
export default ModalOverlay
