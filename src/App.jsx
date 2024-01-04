import React from "react"

import "./App.css"
import AppHeader from "./components/app-header/app-header"
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients"
import BurgerConstructor from "./components/burger-constructor/burger-constructor"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"



function App() {
	return (
		<div className="App">
			<AppHeader />
			<main className="main-block">
				<DndProvider backend={HTML5Backend}>
				<BurgerIngredients/>
				<BurgerConstructor/>
				</DndProvider>
			</main>
		</div>
	)
}


export default App
