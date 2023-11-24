import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import AppHeader from "./components/app-header/app-header"
import BurgerIgredients from "./components/burger-ingredients/burger-ingredients"
import BurgerConstructor from "./components/burger-constructor/burger-constructor"
import App from "./App"

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
)
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
