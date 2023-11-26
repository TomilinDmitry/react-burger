import React, { useEffect } from "react"
import style from "./modal-overlay.module.css"
import PropTypes from "prop-types"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"

const ModalOverlay = ({ onClose }) => {
	const handleClick = () => {
		onClose()
	}
	return (
		<div onClick={handleClick} className={style.modalContainer}></div>
	)
}
ModalOverlay.propTypes = {
	onClose: PropTypes.func.isRequired,
}
export default ModalOverlay
