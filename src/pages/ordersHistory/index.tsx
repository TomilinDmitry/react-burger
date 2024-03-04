import React, { useEffect } from 'react';
import style from './style.module.css';
import ProfileNavigation from '../../components/UI/ProfileTabs';
import OrderCard from '../../components/UI/OrderCard';
import { Link, useLocation } from 'react-router-dom';
import {
  useDispatch,
  useSelector,
} from '../../utils/Types/hooks/typed-hooks';
import { connect, disconnect } from '../../services/socket/action';
const OrdersHistory = () => {
  const { orders } = useSelector((state) => state.getOrderList);
  const location = useLocation();
  const dispatch = useDispatch();
  const PROFILE_ORDER_URL = 'wss://norma.nomoreparties.space/orders';
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    dispatch(
      connect(
        `${PROFILE_ORDER_URL}/?token=${accessToken!.replace(
          'Bearer',
          '',
        )}`,
      ),
    );
    return () => {
      dispatch(disconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.container}>
      <div className={style.profileListBlock}>
        <ProfileNavigation />
      </div>
      <div className={style.orderCardBlock}>
        {/* {orders.map((order) => (
          <Link
            key={order.number}
            to={`/profile/order/${order.number}`}
            state={{ background: location }}
            className={style.link}
          >
            <OrderCard order={order} key={order._id} />
          </Link>
        ))} */}
      </div>
    </div>
  );
};

export default OrdersHistory;
