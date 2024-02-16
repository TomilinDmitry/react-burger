import {ChangeEvent, FormEvent, useState } from 'react';
import style from './reset-password.module.css';
import {
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../utils/Types/hooks/typed-hooks';
import { resetPassword } from '../../services/users/action';
const ResetPassword = () => {
  const [passwordValueFirst, setPasswordValueFirst] = useState<string>('');
  const onChangePasswordFirst = (e:ChangeEvent<HTMLInputElement>) => {
    setPasswordValueFirst(e.target.value);
  };
  const [valueInputSecond, setValueInputSecond] = useState('');
  const onChangePasswordSecond = (e:ChangeEvent<HTMLInputElement>) => {
    setValueInputSecond(e.target.value);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClick = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await dispatch(
      // @ts-ignore
      resetPassword({
        password: passwordValueFirst,
        token: valueInputSecond,
      }),
    );
    // @ts-ignore
    if (res.payload && res.payload.success) {
      navigate('/login');
    }
  };
  return (
    <div className={style.container}>
      <p className={style.loginTitle}>Восстановление пароля</p>
      <form onSubmit={onClick} className={style.inputBlock}>
        <PasswordInput
          onChange={onChangePasswordFirst}
          value={passwordValueFirst}
          placeholder="Введите новый пароль"
        />
        <Input
          onChange={onChangePasswordSecond}
          value={valueInputSecond}
          placeholder="Введите код из письма"
        />

        <Button htmlType='submit'>Сохранить</Button>
      </form>
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
