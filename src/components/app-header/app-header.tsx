import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components"
import style from "./style.module.css"
import React from "react"

function AppHeader() {
	return (
			<header>
				<section className={style.container}>
					<section>
						<a href="/#" className="pl-5 pr-5 pb-4 pt-4 mb-4 mt-4 ">
							<BurgerIcon type="primary" />
							<p
								className={`${style.activeElement} text text_type_main-default ml-2`}>
								Конструктор
							</p>
						</a>
						<a href="/#" className="pl-5 pr-5 pb-4 pt-4 mb-4 mt-4">
							<ListIcon type="secondary" />
							<p
								className={`${style.navElement} text text_type_main-default ml-2`}>
								Лента заказов
							</p>
						</a>
					</section>
					<section className="logo">
						<Logo />
					</section>
					<a href="/#" className="pl-5 pr-5 pb-4 pt-4 mb-4 mt-4">
						<ProfileIcon type="secondary" />
						<p
							className={`${style.navElement} text text_type_main-default ml-2`}>
							Личный кабинет
						</p>
					</a>
				</section>
				<section className={style.mediaContainer}>
					<section>
						<Logo />
					</section>
					<nav className={style.navigation}>
						<a href="/#" className="pl-5 pr-5 pb-4 pt-4 mb-4 mt-4 ">
							<BurgerIcon type="primary" />
							<p
								className={`${style.activeElement} text text_type_main-default ml-2`}>
								Конструктор
							</p>
						</a>
						<a href="/#" className="pl-5 pr-5 pb-4 pt-4 mb-4 mt-4">
							<ListIcon type="secondary" />
							<p
								className={`${style.navElement} text text_type_main-default ml-2`}>
								Лента заказов
							</p>
						</a>
						<a href="/#" className="pl-5 pr-5 pb-4 pt-4 mb-4 mt-4">
							<ProfileIcon type="secondary" />
							<p
								className={`${style.navElement} text text_type_main-default ml-2`}>
								Личный кабинет
							</p>
						</a>
					</nav>
				</section>
			</header>
	)
}

export default AppHeader
