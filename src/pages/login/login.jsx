import { React, useState } from 'react';
import style from './login.module.css';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { login } from '../../services/users/action';
import { useDispatch } from 'react-redux';
const Login = () => {
  const dispatch = useDispatch()
  const [emailValue, setEmailValue] = useState('');
  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };
  const [passwordValue, setPasswordValue] = useState('');
  const onChangePassword = (e) => {
    setPasswordValue(e.target.value);
  };
  const onClick = () =>{
    dispatch(login({email:emailValue,password:passwordValue}))
  }

  return (
    <div className={style.container}>
      <p className={style.loginTitle}>Вход</p>
      <div className={style.inputBlock}>
        <EmailInput onChange={onChangeEmail} value={emailValue} />
        <PasswordInput
          value={passwordValue}
          onChange={onChangePassword}
        />
        <Button htmlType="button" onClick={onClick}>Войти</Button>
      </div>
      <div className={style.newUserAndForgotPassword}>
        <p className={style.newUser}>
          Вы — новый пользователь?{' '}
          <span>
            <Link to="/register">Зарегистрироваться</Link>
          </span>
        </p>
        <p className={style.forgotPassword}>
          Забыли пароль?
          <span>
            <Link to="/forgot-password">Восстановить пароль</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
