import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.css';
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../../services/users/action';

function AppHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const onClick = () => {
    navigate('/profile');
  };
 
  return (
    <header>
      <section className={style.container}>
        <section>
          <NavLink to="/" className={({ isActive }) =>
            `pl-5 pr-5 pb-4 pt-4 mb-4 mt-4 ${
              isActive ? style.active : style.link
            }`
          }>
            <BurgerIcon type="primary" />
            <p
              className={`text text_type_main-default ml-2`}
            >
              Конструктор
            </p>
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) =>
            `pl-5 pr-5 pb-4 pt-4 mb-4 mt-4 ${
              isActive ? style.active : style.link
            }`
          }>
            <ListIcon type="secondary" />
            <p
              className={`text text_type_main-default ml-2`}
            >
              Лента заказов
            </p>
          </NavLink>
        </section>
        <section className="logo">
          <Logo />
        </section>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `pl-5 pr-5 pb-4 pt-4 mb-4 mt-4 ${
              isActive ? style.active : style.link
            }`
          }
        >
          <ProfileIcon type="secondary" />
          <p
            className={`text text_type_main-default ml-2`}
          >
            Личный кабинет
          </p>
        </NavLink>
      </section>
      <section className={style.mediaContainer}>
        <section>
          <Logo />
        </section>
        <nav className={style.navigation}>
          <a href="/#" className="pl-5 pr-5 pb-4 pt-4 mb-4 mt-4 ">
            <BurgerIcon type="primary" />
            <p
              onClick={onClick}
              className={`${style.activeElement} text text_type_main-default ml-2`}
            >
              Конструктор
            </p>
          </a>
          <a href="/#" className="pl-5 pr-5 pb-4 pt-4 mb-4 mt-4">
            <ListIcon type="secondary" />
            <p
              className={`${style.navElement} text text_type_main-default ml-2`}
            >
              Лента заказов
            </p>
          </a>
          <a href="/#" className="pl-5 pr-5 pb-4 pt-4 mb-4 mt-4">
            <ProfileIcon type="secondary" />
            <p
              className={`${style.navElement} text text_type_main-default ml-2`}
            >
              Личный кабинет
            </p>
          </a>
        </nav>
      </section>
    </header>
  );
}

export default AppHeader;
