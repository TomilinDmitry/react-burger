import { useSelector } from '../../utils/Types/hooks/typed-hooks';
import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

type TProtectedProps = {
  onlyUnAuth?: boolean;
  component: ReactNode;
  isAuthChecked?: boolean;
};

const Protected = ({
  onlyUnAuth = false,
  component,
}: TProtectedProps) => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const isAuthChecked = useSelector(
    (store: { user: Pick<TProtectedProps, 'isAuthChecked'> }) =>
      store.user.isAuthChecked,
  );
  const user = useSelector((store) => store.user.user);
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

  return <>{component}</>;
};

export const OnlyAuth = ({ component }: TProtectedProps) => {
  return <Protected onlyUnAuth={false} component={component} />;
};

export const OnlyUnAuth = ({ component }: TProtectedProps) => {
  return <Protected onlyUnAuth={true} component={component} />;
};
