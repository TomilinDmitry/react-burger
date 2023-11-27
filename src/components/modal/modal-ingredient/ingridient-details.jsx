import React from "react"
import ModalOverlay from "../modal-overlay/modal-overlay"
import style from "./ingridient-details.module.css"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types"
const IngredientDetails = ({ closeModal, title, dataInfo }) => {
	return (
		<div className={style.mainContainer}>
			<section className={style.overlayHeader}>
				<section>
					<h1>{title}</h1>
				</section>
				<section onClick={closeModal} className={style.closeBtn}>
					<CloseIcon type="primary" />
				</section>
			</section>
			{dataInfo &&(
				<div key={dataInfo._id} className={style.modalContainerInfo}>
					<section className="mb-4">
						<img src={dataInfo.image} alt={dataInfo.data} />
					</section>
					<p
						className={`${style.nameProduct} text text_type_main-medium mb-8`}>
						<span>{dataInfo.name}</span>
					</p>

					<p
						className={`${style.textBlock} text text_type_main-medium mb-15`}>
						<p className={style.block}>
							<span>Калории,ккал</span>
							<span>{dataInfo.calories}</span>
						</p>
						<p className={style.block}>
							<span>Белки,г</span>
							<span>{dataInfo.proteins}</span>
						</p>
						<p className={style.block}>
							<span>Жиры,г</span>
							<span>{dataInfo.fat}</span>
						</p>
						<p className={style.block}>
							<span>Углеводы,г</span>
							<span>{dataInfo.carbohydrates}</span>
						</p>
					</p>
				</div>
			)}
		</div>
	)
}
IngredientDetails.propTypes ={
	closeModal:PropTypes.func.isRequired,
	title:PropTypes.string,
	dataInfo:PropTypes.object
}

export default IngredientDetails
