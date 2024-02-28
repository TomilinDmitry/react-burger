import React from 'react';
import style from './feed.module.css';
import OrderCard from '../../components/UI/OrderCard';
import { Link } from 'react-router-dom';

const Feed = () => {
  return (
    <div className={style.container}>
      <section className={style.title}>Лента заказов</section>
      <div className={style.mainContainer}>
        <div className={style.orderBlock}>
          <Link key={'id'} to={`/feed/id`} className={style.link}>
            <OrderCard />
          </Link>
          <Link key={'id'} to={`/feed/id`} className={style.link}>
            <OrderCard />
          </Link>
          <Link key={'id'} to={`/feed/id`} className={style.link}>
            <OrderCard />
          </Link>
          <Link key={'id'} to={`/feed/id`} className={style.link}>
            <OrderCard />
          </Link>
        </div>
        <div className={style.orderCounter}>
          <div className={style.readyAndAtWorkOrders}>
            <div className={style.readyOrder}>
              <span className={style.titleReadyOrder}>Готовы:</span>
              <p className={style.orderList}>
                <span className="text text_type_digits-default">
                  034533
                </span>
                <span className="text text_type_digits-default">
                  034533
                </span>
                <span className="text text_type_digits-default">
                  034533
                </span>
                <span className="text text_type_digits-default">
                  034533
                </span>
                <span className="text text_type_digits-default">
                  034533
                </span>
              </p>
            </div>
            <div className={style.atWork}>
              <span className={style.titleReadyOrder}>Готовы:</span>
              <p className={style.orderListAtWork}>
                <span className="text text_type_digits-default">
                  034533
                </span>
                <span className="text text_type_digits-default">
                  034533
                </span>
                <span className="text text_type_digits-default">
                  034533
                </span>
                <span className="text text_type_digits-default">
                  034533
                </span>
                <span className="text text_type_digits-default">
                  034533
                </span>
              </p>
            </div>
          </div>
          <p className={style.ordersForAllTimeBlock}>
            <span
              className={`text text_type_main-medium ${style.ordersForAllTimeTitle}`}
            >
              Выполнено за все время:
            </span>
            <span
              className={`text text_type_digits-large ${style.ordersForAllTimeCounter}`}
            >
              28 752
            </span>
          </p>
          <p className={style.ordersForAllTimeBlock}>
            <span
              className={`text text_type_main-medium ${style.ordersForAllTimeTitle}`}
            >
              Выполнено за сегодня:
            </span>
            <span
              className={`text text_type_digits-large ${style.ordersForAllTimeCounter}`}
            >
              138
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feed;