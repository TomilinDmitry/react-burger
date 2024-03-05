import React, { useEffect} from 'react';
import style from './style.module.css';
import ProfileNavigation from '../../components/UI/ProfileTabs';
import OrderCard from '../../components/UI/OrderCard';
import { Link, useLocation } from 'react-router-dom';
import {
  useDispatch,
  useSelector,
} from '../../utils/Types/hooks/typed-hooks';
import {
  connectProfile,
  disconnectProfile,
} from '../../services/socket/action';
const OrdersHistory = () => {
  const { orders } = useSelector(
    (state) => state.getOrderProfileList,
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const token = localStorage.getItem('accessToken');
  const accessToken = token!.replace('Bearer', '').trim();
  const PROFILE_ORDER_URL = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;
  useEffect(() => {
    dispatch(connectProfile(PROFILE_ORDER_URL));
    return () => {
      dispatch(disconnectProfile());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={style.container}>
      <div className={style.profileListBlock}>
        <ProfileNavigation />
      </div>
      <div className={style.orderCardBlock}>
        {orders
          .slice()
          .reverse()
          .map((order) => (
            <Link
              key={order.number}
              to={`/profile/order/${order.number}`}
              state={{ background: location }}
              className={style.link}
            >
              <OrderCard
                order={order}
                showStatus={order.status}
                key={order._id}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default OrdersHistory;
