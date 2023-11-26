import React from "react"
import ModalOverlay from "../modal-overlay/modal-overlay"
import style from "./ingridient-details.module.css"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
const IngredientDetails = ({ closeModal, title, name, dataInfo }) => {
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
			{dataInfo.data.map((item, index) => (
				<div key={index} className={style.modalContainerInfo}>
					<section className="mb-4">
						<img src={item.image} alt={item.data.name} />
					</section>
					<p
						className={`${style.nameProduct} text text_type_main-medium mb-8`}>
						<span>{item.name}</span>
					</p>

					<p
						className={`${style.textBlock} text text_type_main-medium mb-15`}>
						<p className={style.block}>
							<span>Калории,ккал</span>
							<span>{item.calories}</span>
						</p>
						<p className={style.block}>
							<span>Белки,г</span>
							<span>{item.proteins}</span>
						</p>
						<p className={style.block}>
							<span>Жиры,г</span>
							<span>{item.fat}</span>
						</p>
						<p className={style.block}>
							<span>Углеводы,г</span>
							<span>{item.carbohydrates}</span>
						</p>
					</p>
				</div>
			))}
		</div>
	)
}

export default IngredientDetails
