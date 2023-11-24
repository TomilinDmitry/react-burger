import React, { useEffect } from "react"

import "./App.css"
import AppHeader from "./components/app-header/app-header"
import BurgerIgredients from "./components/burger-ingredients/burger-ingredients"
function App() {
	const url = "https://norma.nomoreparties.space/api/ingredients"

	const resp = useEffect(() => {
		fetch(`${url}`)
			.then((response) => response.json())
			.then((resp) =>console.log( resp.data))
	})



	return (
		<div className="App">
			<AppHeader />
			<BurgerIgredients />
		</div>
	)
}

export default App
