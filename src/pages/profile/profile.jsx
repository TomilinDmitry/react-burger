import { React, useState } from 'react';
import style from './profile.module.css';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setNewInfoUser } from '../../services/users/action';
import { Link } from 'react-router-dom';

const Profile = () => {
  const {user} = useSelector(state=>state.user)
  const [emailValue, setEmailValue] = useState(user.email);
  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };
  const [passwordValue, setPasswordValue] = useState('qqwerty123');
  const onChangePassword = (e) => {
    setPasswordValue(e.target.value);
  };
  const [inputValue, setInputValue] = useState(user.name);

  const [activeTab, setActiveTab] = useState('Профиль');
  const dispatch = useDispatch()
  const logoutProfile = () =>{
    dispatch(logout())
  }
  const returnBack = () =>{
    return (
      setInputValue(user.name),
      setEmailValue(user.email)
      )
  }
    const saveNewInfo = async() =>{
      await dispatch(setNewInfoUser({email:emailValue,name:inputValue}))
    } 
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
            <Link to='/profile/orders' >
            История заказов
            </Link>
          </li>
            <Link to='/'>
           <button className={style.buttonExit} onClick={logoutProfile}>Выход</button>
            </Link>
          
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
        {(inputValue !== user.name || emailValue !== user.email) && (
        <div className={style.buttons}>
          <button className={style.back} onClick={returnBack}>Отмена</button>
          <Button htmlType='button' onClick={saveNewInfo}>Сохранить</Button>
        </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
