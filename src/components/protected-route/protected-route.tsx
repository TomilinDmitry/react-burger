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

    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }


  return <>{component}</>;
};

export const OnlyAuth = ({ component }: TProtectedProps) => {
  return <Protected onlyUnAuth={false} component={component} />;
};

export const OnlyUnAuth = ({ component }: TProtectedProps) => {
  return <Protected onlyUnAuth={true} component={component} />;
};
