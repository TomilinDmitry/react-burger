import React from "react"
import style from "./ingridient-details.module.css"
import PropTypes from "prop-types"

const IngredientDetails = ({selectedIngredient}) => {
	return (
		<div className={style.mainContainer}>
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
	selectedIngredient: PropTypes.shape({
	  _id: PropTypes.string.isRequired,
	  image: PropTypes.string.isRequired,
	  name: PropTypes.string.isRequired,
	  calories: PropTypes.number.isRequired,
	  proteins: PropTypes.number.isRequired,
	  fat: PropTypes.number.isRequired,
	  carbohydrates: PropTypes.number.isRequired,
	}),
  };

export default IngredientDetails
