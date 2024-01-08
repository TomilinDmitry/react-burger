import React from "react"
import style from "./modal-overlay.module.css"
import PropTypes from "prop-types"

const ModalOverlay = ({closeOrderDetails,closeIngDetails,isOpen}) => {
	const handleClick = () => {
		if (isOpen){
			closeOrderDetails()
		  }else{
			closeIngDetails()
		  }	}
	return (
		<div onClick={handleClick} className={style.modalContainer}></div>
	)
}
ModalOverlay.propTypes = {
	closeOrderDetails: PropTypes.func,
	closeIngDetails: PropTypes.func,
	isOpen: PropTypes.bool,
  };
export default ModalOverlay
