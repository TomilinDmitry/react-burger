import { ChangeEvent, FormEvent, useState } from 'react';
import style from './login.module.css';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { login } from '../../services/users/action';
import { useDispatch } from '../../utils/Types/hooks/typed-hooks';
const Login = () => {
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = useState<string>('');
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };
  const [passwordValue, setPasswordValue] = useState<string>('');
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  const onClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email: emailValue, password: passwordValue }));
  };

  return (
    <div className={style.container}>
      <p className={style.loginTitle}>Вход</p>
      <form onSubmit={onClick} className={style.inputBlock} data-testid='login'>
        <EmailInput onChange={onChangeEmail} value={emailValue} />
        <PasswordInput
          value={passwordValue}
          onChange={onChangePassword}
        />
        <Button htmlType="submit">Войти</Button>
      </form>
      <div className={style.newUserAndForgotPassword}>
        <p className={style.newUser}>
          Вы — новый пользователь?
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
