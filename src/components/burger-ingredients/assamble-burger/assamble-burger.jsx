import React from "react"
import BurgerSection from "../burger-ingredients-section/burger-section"
import style from "./assamble-burger.module.css"
const AssambleBurger = () => {
	return (
		<section className={style.burger}>
			<BurgerSection
				className="mb-10"
				section_name={"Булки"}
				src={"https://code.s3.yandex.net/react/code/bun-02.png"}
				price={"20"}
				name={"Краторная булка N-200i"}
				alt={"Краторная булка N-200i"}
				src_second={
					"https://code.s3.yandex.net/react/code/bun-01.png"
				}
				price_second={"20"}
				name_second={"Флюоресцентная булка R2-D3"}
				alt_second={"Флюоресцентная булка R2-D3"}
			/>
			<BurgerSection
				className="mb-8"
				section_name={"Соусы"}
				src={"https://code.s3.yandex.net/react/code/sauce-02.png"}
				price={"30"}
				name={"Соус Spicy-X"}
				alt={"Соус Spicy-X"}
				src_second={
					"https://code.s3.yandex.net/react/code/sauce-04.png"
				}
				price_second={"30"}
				name_second={"Соус фирменный Space Sauce"}
				alt_second={"Соус фирменный Space Sauce"}
			/>
			<BurgerSection
				src={"https://code.s3.yandex.net/react/code/sauce-03.png"}
				price={"30"}
				name={"Соус с шипами Антарианского плоскоходца"}
				alt={"Краторная булка N-200i"}
				src_second={
					"https://code.s3.yandex.net/react/code/sauce-01.png"
				}
				price_second={"30"}
				name_second={"Соус традиционный галактический"}
				alt_second={"Соус традиционный галактический"}
			/>
		</section>
	)
}

export default AssambleBurger
