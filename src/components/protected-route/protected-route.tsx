import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { TUser } from '../../utils/Types/TUser';

type TProtectedProps = {
  onlyUnAuth:boolean,
  component:React.ReactNode
  isAuthChecked?:boolean
}

const Protected = ({ onlyUnAuth = false, component }:TProtectedProps) => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const isAuthChecked = useSelector(
    (store:{user:Pick<TProtectedProps,'isAuthChecked'>}) => store.user.isAuthChecked,
  );
  const user = useSelector((store:{user:{user:TUser}}) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }:TProtectedProps) => (
  <Protected onlyUnAuth={true} component={component} />
);
