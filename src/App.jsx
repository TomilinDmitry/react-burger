import React, { useEffect } from "react"

import "./App.css"
import AppHeader from "./components/app-header/app-header"
import BurgerIgredients from "./components/burger-ingredients/burger-ingredients"
import BurgerConstructor from "./components/burger-constructor/burger-constructor"
function App() {
const ingredient=useEffect(()=>{
	 fetch ('https://norma.nomoreparties.space/api/ingredients')
		.then(resp=>resp.json())
		.then(data=>console.log(data.data))		
},[])
	return (
		<div className="App">
			<AppHeader />
			<BurgerIgredients />
			<BurgerConstructor/>
		</div>
	)
}

export default App
