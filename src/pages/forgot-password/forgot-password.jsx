import { React, useState } from 'react';
import style from './fortgot-password.module.css';
import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../services/users/action';

const ForgotPassword = () => {
  const [emailValue, setEmailValue] = useState('');
  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };
const dispatch = useDispatch()
const navigate =useNavigate()
  const onClick =async ()=>{
    const res = await dispatch(forgotPassword({ email: emailValue }));
    if (res.payload && res.payload.success) {
      navigate('/reset-password');
    }
  }
  return (
    <div className={style.container}>
      <p className={style.forgotPasswordTitle}>
        Восстановление пароля
      </p>
      <div className={style.inputBlock}>
        <EmailInput
          placeholder="Укажите ваш e-mail"
          onChange={onChangeEmail}
          value={emailValue}
        />
        {}
        {/* <Link to="/reset-password"> */}
          <Button htmlType="button" onClick={onClick}>Восстановить</Button>
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

export default ForgotPassword;
