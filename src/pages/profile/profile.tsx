import { ChangeEvent, FormEvent, useState } from 'react';
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
import { TUser } from '../../utils/Types/TUser';

const Profile = () => {
  const { user } = useSelector(
    (state: { user: { user: TUser } }) => state.user,
  );
  const [emailValue, setEmailValue] = useState(user.email);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };
  const [passwordValue, setPasswordValue] = useState('12345qq');
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  const [inputValue, setInputValue] = useState(user.name);

  const [activeTab, setActiveTab] = useState('Профиль');
  const dispatch = useDispatch();
  const logoutProfile = () => {
    // @ts-ignore
    dispatch(logout());
  };
  const returnBack = () => {
    return setInputValue(user.name), setEmailValue(user.email);
  };
  const saveNewInfo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(
      // @ts-ignore
      setNewInfoUser({
        email: emailValue,
        name: inputValue,
        password: passwordValue,
      }),
    );
  };
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
            <Link to="/profile/orders">История заказов</Link>
          </li>
          <Link to="/">
            <button
              className={style.buttonExit}
              onClick={logoutProfile}
            >
              Выход
            </button>
          </Link>
        </ul>
      </div>
      <form onSubmit={saveNewInfo} className={style.inputBlock}>
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
          placeholder="Логин"
        />
        <div className={style.passwordInput}>
          <PasswordInput
            icon="EditIcon"
            value={passwordValue}
            onChange={onChangePassword}
          />
        </div>
        {(inputValue !== user.name ||
          emailValue !== user.email ||
          passwordValue !== '12345qq') && (
          <div className={style.buttons}>
            <button className={style.back} onClick={returnBack}>
              Отмена
            </button>
            <Button htmlType="submit">Сохранить</Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;