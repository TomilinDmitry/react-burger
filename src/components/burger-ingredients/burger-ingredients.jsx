import React, { useEffect, useMemo, useRef} from "react"
import style from "./style.module.css"
import Modal from "../modal/modal"
import IngredientDetails from "../modal/modal-ingredient/ingridient-details"
import IngredientCard from "./burger-ingridients-position/burger-ingredients-position"
// import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { getIngredient, setActiveTab } from "../../services/burger-ingredients/reducer"
import { setSelectedIngredient } from "../../services/burger-ingredients/ingredient-details/reducer"
// import { setDraggedElement } from "../../services/burger-constructor/reducer"
// import { useDrag } from "react-dnd"



const BurgerIngredients = () => {
	
	const dispatch = useDispatch();

	const {selectedIngredient} = useSelector(store=>store.selected)
	const {data,loading,error,activeTab} = useSelector(store=>store.ingredients)
	

	// const handleDrag = (e, currentElement) => {
	// 	e.preventDefault();
	// 	dispatch(setDraggedElement(currentElement));
	//   }
	

	const currentTab = (tab) =>{
		dispatch(setActiveTab(tab))
	}
	
	useEffect(()=>{
		dispatch(getIngredient())
	},[dispatch])

	///Refs
	const tabsRef = useRef(null)
	const bunsRef = useRef(null)
	const saucesRef = useRef(null)
	const ingredientRef = useRef(null)

	

	///Scroll parametr
	const scroll = () =>{
		const tabsRect = tabsRef.current.getBoundingClientRect()
		const bunsRect = bunsRef.current.getBoundingClientRect()
		const saucesRect = saucesRef.current.getBoundingClientRect()
		const ingredientRect = ingredientRef.current.getBoundingClientRect()
		
		if (bunsRect.top >= tabsRect.top){
			currentTab('buns')
		
		}else if (saucesRect.top >= tabsRect.top){
			currentTab('sauces')
		}else if (ingredientRect.top >= tabsRect.top){
			currentTab('ingredients')
		}
	}

	const filteredIngredient = useMemo(()=>{
		return {
			buns: data.filter((ingredient) => ingredient.type === 'bun'),
 	 		sauces : data.filter((ingredient) => ingredient.type === 'sauce'),
   			mains : data.filter((ingredient) => ingredient.type === 'main'),
				}},[data])

	const open = (ingredient) => {
		dispatch(setSelectedIngredient(ingredient));
	}
	if (error) {
		return <p className={`${style.failedBlock} text text_type_main-large`}>Ошибка при загрузке данных{error}</p>;
	  }	
	return (
		<div className={style.container}>
			<main className={style.main}>
				<h1 
					className={`${style.title} text text_type_main-large pt-10 pb-5`}>
					Соберите бургер
				</h1>
				<div ref={tabsRef}className={`${style.tabs} mb-10`}>
					<Tab
				value="buns"
				active={activeTab === "buns"}
				onClick={()=>currentTab('buns',	bunsRef.current.scrollIntoView({ behavior: "smooth" }))}>
				Булки
					</Tab>
					<Tab
				value="sauces"
				active={activeTab === "sauces"}
				onClick={()=>currentTab('sauces',saucesRef.current.scrollIntoView({behavior:'smooth'}))}>
				Соусы
					</Tab>
					<Tab
				value="ingredients"
				active={activeTab === "ingredients"}
				onClick={()=>currentTab('ingredients',ingredientRef.current.scrollIntoView({behavior:'smooth'}))}>
				Начинки
					</Tab>
				</div>
				{loading ? (
     				 <p className={`${style.loadingBlock} text text_type_main-large`}>
      				  <span>
        				  Происходит загрузка данных, ожидайте....
      					  </span>
      				</p>
    				) : (
				<div className={style.ingredientContainer} onScroll={scroll}>
					<section ref={bunsRef} className={style.tabsBlock}>
						<h1  className={`${style.blockTitle} text text_type_main-medium`}>
							Булки
						</h1>
						<section className={style.sectionBlock}>
							{filteredIngredient.buns.map((bun) => (
								<div onClick={() => open(bun)} key={bun._id}>
									<IngredientCard  {...bun} />
								</div>
							))}
						</section>
					</section>
					<section ref={saucesRef}className={style.tabsBlock}>
					<h1 className={`${style.blockTitle} text text_type_main-medium`}>
							Соусы
						</h1>
						<section className={style.sectionBlock}>
							{filteredIngredient.sauces.map((sauce) => (
								<div onClick={() => open(sauce)} key={sauce._id}>
									<IngredientCard {...sauce} />
								</div>
							))}
						</section>
					</section>
					<section ref={ingredientRef} className={style.tabsBlock}>
						<h1 className={`${style.blockTitle} text text_type_main-medium`}>
							Начинки
						</h1>
						<section className={style.sectionBlock}>
							{filteredIngredient.mains.map((main) => (
								<div onClick={() => open(main)} key={main._id}>
									<IngredientCard {...main} />
								</div>
							))}
						</section>
					</section>
				</div>
					)}

				{selectedIngredient && (
					<>
					<Modal onClick={(e) => e.stopPropagation()}>
						<IngredientDetails title="Детали ингредиента"/>
					</Modal>
					</>
				)}
			</main>
		</div>
	)
}
// BurgerIngredients.propTypes = {
// 	dataInfo:PropTypes.arrayOf(
// 		PropTypes.shape({
// 		_id:PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       type: PropTypes.string.isRequired,
//       proteins: PropTypes.number.isRequired,
//       fat: PropTypes.number.isRequired,
//       carbohydrates: PropTypes.number.isRequired,
//       calories: PropTypes.number.isRequired,
//       price: PropTypes.number.isRequired,
//       image: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// 		}

export default BurgerIngredients