import React from 'react';
import style from './style.module.css';
import ProfileNavigation from '../../components/UI/ProfileTabs';
import OrderCard from '../../components/UI/OrderCard';
import { Link } from 'react-router-dom';
import { useSelector } from '../../utils/Types/hooks/typed-hooks';

const OrdersHistory = () => {
const {orders} = useSelector(state=>state.getOrderList)
  return (
    <div className={style.container}>
      <div className={style.profileListBlock}>
        <ProfileNavigation />
      </div>
      <div className={style.orderCardBlock}>
      {/* {orderList.map(order => ( */}
          {/* // <Link key={order} to={`/profile/orders/${order._id}`} className={style.link}> */}
            {/* <OrderCard showStatus={true} status={order.status} order={order} /> */}
          {/* </Link> */}
        {/* // ))} */}
        {/* <Link
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
          <OrderCard showStatus={true} status="Готовится" /> */}
        {/* </Link> */}
      </div>
    </div>
  );
};

export default OrdersHistory;
