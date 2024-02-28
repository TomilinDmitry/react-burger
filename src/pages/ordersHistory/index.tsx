import React from 'react';
import style from './style.module.css';
import ProfileNavigation from '../../components/UI/ProfileTabs';
import OrderCard from '../../components/UI/OrderCard';
import { Link } from 'react-router-dom';
const OrdersHistory = () => {
  return (
    <div className={style.container}>
      <div className={style.profileListBlock}>
        <ProfileNavigation />
      </div>
      <div className={style.orderCardBlock}>
        <Link
          key={'id'}
          to={`/profile/orders/id`}
          className={style.link}
        >
          <OrderCard showStatus={true} status="Создан" />
        </Link>
        <Link
          key={'id'}
          to={`/profile/orders/id`}
          className={style.link}
        >
          <OrderCard showStatus={true} status="Готовится" />
        </Link>
        <Link
          key={'id'}
          to={`/profile/orders/id`}
          className={style.link}
        >
          <OrderCard showStatus={true} status="Выполнен" />
        </Link>
        <Link
          key={'id'}
          to={`/profile/orders/id`}
          className={style.link}
        >
          <OrderCard showStatus={true} status="Выполнен" />
        </Link>
        <Link
          key={'id'}
          to={`/profile/orders/id`}
          className={style.link}
        >
          <OrderCard showStatus={true} status="Готовится" />
        </Link>
      </div>
    </div>
  );
};

export default OrdersHistory;
