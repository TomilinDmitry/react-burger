import { React, useState } from 'react';
import style from './reset-password.module.css';
import {
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../services/users/action';
const ResetPassword = () => {

  const [passwordValueFirst, setPasswordValueFirst] = useState('');
  const onChangePasswordFirst = (e) => {
    setPasswordValueFirst(e.target.value);
  };
  const [valueInputSecond, setValueInputSecond] = useState('');
  const onChangePasswordSecond = (e) => {
    setValueInputSecond(e.target.value);
  };
  const dispatch = useDispatch()
  const navigate = useNavigate()
 const onClick = async() =>{
  const res = await dispatch(resetPassword({password:passwordValueFirst,token:valueInputSecond}))
  if (res.payload && res.payload.success) {
    navigate('/login');
  }
 }
   return (
    <div className={style.container}>
      <p className={style.loginTitle}>Восстановление пароля</p>
      <div className={style.inputBlock}>
        <PasswordInput
         onChange={onChangePasswordFirst}
         value={passwordValueFirst}
         placeholder='Введите новый пароль'
        />
        <Input
        onChange={onChangePasswordSecond}
        value={valueInputSecond}
        placeholder='Введите код из письма'
        />
        {/* <Link to="/login"> */}
          <Button htmlType="button" onClick={onClick}>Сохранить</Button>
          {/* </Link> */}
      </div>
      <div className={style.signInBlock}>
        <p className={style.signIn}>
          Вспомнили пароль?
          <span>
            <Link to="/login">Войти</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
