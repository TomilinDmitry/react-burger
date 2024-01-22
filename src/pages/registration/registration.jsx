import { React, useState } from 'react';
import style from './registration.module.css';
import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../services/users/user';
import { register } from '../../services/users/action';

const Registration = () => {
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = useState('');
  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };
  const [passwordValue, setPasswordValue] = useState('');
  const onChangePassword = (e) => {
    setPasswordValue(e.target.value);
  };
  const [inputValue, setInputValue] = useState('');
  

  const onClick = () =>{
    dispatch(register ({email: emailValue, password: passwordValue, name: inputValue }))
  }
  return (
    <div className={style.container}>
      <p className={style.regTitle}>Регистрация</p>
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
        />
        <EmailInput onChange={onChangeEmail} value={emailValue} />
        <PasswordInput
          value={passwordValue}
          onChange={onChangePassword}
        />
      <Button htmlType="button" onClick={onClick}>Зарегистрироваться</Button>
      </div>
      <div className={style.signInBlock}>
        <p className={style.signIn}>
          Уже зарегистрированы?{' '}
          <span>
            <Link to="/login">Войти</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Registration;
