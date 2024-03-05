import React, { useState } from 'react';
import style from './style.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from '../../../utils/Types/hooks/typed-hooks';
import { logout } from '../../../services/users/action';
const ProfileNavigation = () => {
  const [activeTab, setActiveTab] = useState('Профиль');
  const dispatch = useDispatch();
  const logoutProfile = () => {
    dispatch(logout());
  };
  return (
    <ul className={style.profileList}>
      <li
        className={`${style.element} ${
          activeTab === 'Профиль' ? style.active : ''
        }`}
        onClick={() => setActiveTab('Профиль')}
      >
        <Link to="/profile">Профиль</Link>
      </li>
      <li
        className={`${style.element} ${
          activeTab === 'История заказов' ? style.active : ''
        }`}
        onClick={() => setActiveTab('История заказов')}
      >
        <Link to="/profile/orders">История заказов</Link>
      </li>
      <Link to="/">
        <button className={style.buttonExit} onClick={logoutProfile}>
          Выход
        </button>
      </Link>
    </ul>
  );
};

export default ProfileNavigation;
