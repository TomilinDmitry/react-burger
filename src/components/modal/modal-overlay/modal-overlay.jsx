import React from "react"
import style from "./modal-overlay.module.css"
import PropTypes from "prop-types"


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
