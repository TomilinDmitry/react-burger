import React from "react"
import style from "./ingridient-details.module.css"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types"
import { useDispatch, useSelector} from "react-redux"
import { setSelectedIngredient } from "../../../services/burger-ingredients/ingredient-details/action"

const IngredientDetails = ({ title }) => {
	const dispatch = useDispatch()
	const {selectedIngredient} = useSelector(store=>store.selected)
	const closeModal = () =>{
		dispatch(setSelectedIngredient(null))
	}

	return (
		<div className={style.mainContainer}>
			<section className={style.overlayHeader}>
				<section>
					<h1>{title}</h1>
				</section>
				<section  className={style.closeBtn}>
					<CloseIcon onClick = {closeModal}type="primary" />
				</section>
			</section>
			{selectedIngredient &&(
				<div key={selectedIngredient._id} className={style.modalContainerInfo}>
					<section className="mb-4">
						<img src={selectedIngredient.image} alt={selectedIngredient.data} />
					</section>
					<p
						className={`${style.nameProduct} text text_type_main-medium mb-8`}>
						<span>{selectedIngredient.name}</span>
					</p>

					<div
						className={`${style.textBlock} text text_type_main-medium mb-15`}>
						<p className={style.block}>
							<span>Калории,ккал</span>
							<span>{selectedIngredient.calories}</span>
						</p>
						<p className={style.block}>
							<span>Белки,г</span>
							<span>{selectedIngredient.proteins}</span>
						</p>
						<p className={style.block}>
							<span>Жиры,г</span>
							<span>{selectedIngredient.fat}</span>
						</p>
						<p className={style.block}>
							<span>Углеводы,г</span>
							<span>{selectedIngredient.carbohydrates}</span>
						</p>
					</div>
				</div>
			)}
		</div>
	)
}
IngredientDetails.propTypes = {
	closeModal:PropTypes.func.isRequired,
	title:PropTypes.string,
	dataInfo:PropTypes.object
}

export default IngredientDetails
