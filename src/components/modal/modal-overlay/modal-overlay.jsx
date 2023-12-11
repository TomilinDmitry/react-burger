import React from "react"
import style from "./modal-overlay.module.css"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { setSelectedIngredient } from "../../../services/burger-ingredients/ingredient-details/action"
import { orderClose } from "../../../services/burger-constructor/order-details/action"

const ModalOverlay = () => {
	const dispatch = useDispatch()

	const handleClick = () => {
		dispatch(setSelectedIngredient(null))
		dispatch(orderClose())
	}
	return (
		<div onClick={handleClick} className={style.modalContainer}></div>
	)
}
ModalOverlay.propTypes = {
}
export default ModalOverlay
