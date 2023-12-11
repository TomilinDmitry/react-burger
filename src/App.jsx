import React, { useEffect, useState } from "react"

import "./App.css"
import AppHeader from "./components/app-header/app-header"
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients"
import BurgerConstructor from "./components/burger-constructor/burger-constructor"
import ApiUrl from './utils/Api/api-ingrediens'



function App() {
	const [data, setData] = useState([])	
	useEffect(() => {
		fetch(ApiUrl)
			.then((response) => {
				if (response.ok){
				return response.json()
				}else{
					console.error('Ошибка при обработке запроса');
				}})
				.then((data) => {
					if (data.success === true) {
						setData(data.data);
						
					} else {
						console.error('Ошибка при обработке запроса');
			}})
		.catch((error) => console.error('Ошибка:',error));
	}, [])

	return (
		<div className="App">
			<AppHeader />
			<main className="main-block">
				<BurgerIngredients/>
				<BurgerConstructor
					ingredients={data}
				/>
			</main>
		</div>
	)
}


export default App
