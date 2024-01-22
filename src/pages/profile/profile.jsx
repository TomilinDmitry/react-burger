import { React, useState } from 'react';
import style from './profile.module.css';
import {
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
const Profile = () => {
  const [emailValue, setEmailValue] = useState('Bezzy69@yandex.ru');
  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };
  const [passwordValue, setPasswordValue] = useState('qqwerty123');
  const onChangePassword = (e) => {
    setPasswordValue(e.target.value);
  };
  const [inputValue, setInputValue] = useState('Дмитрий');

  const [activeTab, setActiveTab] = useState('Профиль');
  return (
    <div className={style.container}>
      <div className={style.profileListBlock}>
        <ul className={style.profileList}>
          <li
            className={`${style.element} ${
              activeTab === 'Профиль' ? style.active : ''
            }`}
            onClick={() => setActiveTab('Профиль')}
          >
            Профиль
          </li>
          <li
            className={`${style.element} ${
              activeTab === 'История заказов' ? style.active : ''
            }`}
            onClick={() => setActiveTab('История заказов')}
          >
            История заказов
          </li>
          <button className={style.buttonExit}>Выход</button>
        </ul>
      </div>
      <div className={style.inputBlock}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          icon="EditIcon"
        />
        <EmailInput
          onChange={onChangeEmail}
          value={emailValue}
          icon="EditIcon"
          placeholder="Логин"
        />
        <div className={style.passwordInput}>
          <PasswordInput
            icon="EditIcon"
            value={passwordValue}
            onChange={onChangePassword}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
