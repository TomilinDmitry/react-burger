import { ChangeEvent, FormEvent, useState } from 'react';
import style from './profile.module.css';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  useSelector,
  useDispatch,
} from '../../utils/Types/hooks/typed-hooks';
import { setNewInfoUser } from '../../services/users/action';
import ProfileNavigation from '../../components/UI/ProfileTabs';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [emailValue, setEmailValue] = useState(user!.email);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };
  const [passwordValue, setPasswordValue] = useState('12345qq');
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  const [inputValue, setInputValue] = useState(user!.name);

  const dispatch = useDispatch();
  const returnBack = () => {
    // eslint-disable-next-line no-sequences
    return setInputValue(user!.name), setEmailValue(user!.email);
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
        <ProfileNavigation />
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
        {(inputValue !== user!.name ||
          emailValue !== user!.email ||
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
