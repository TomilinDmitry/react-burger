import { useEffect } from 'react';
import {
  useSelector,
  useDispatch,
} from '../../utils/Types/hooks/typed-hooks';
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Home from '../../pages/home/home';
import IngredientDetails from '../modal/modal-ingredient/ingridient-details';
import Modal from '../modal/modal';
import { getIngredient } from '../../utils/Api/api-ingredients';
import Login from '../../pages/login/login';
import Registration from '../../pages/registration/registration';

import Profile from '../../pages/profile/profile';
import ResetPassword from '../../pages/reset-password/reset-password';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import {
  OnlyAuth,
  OnlyUnAuth,
} from '../protected-route/protected-route';
import { checkUserAuth } from '../../services/users/action';
import Feed from '../../pages/feed/feed';
import OrderDetailsModal from '../modal/modal-order-info/order-info';
import OrdersHistory from '../../pages/ordersHistory';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const handleModalClose = () => {
    navigate(-1);
  };
  const { loading } = useSelector((store) => store.ingredients);
  useEffect(() => {
    if (!loading) {
      dispatch(getIngredient());
      dispatch(checkUserAuth());
    }
  }, [dispatch]);

  return (
    <div
      className={`${style.app} ${background ? style.background : ''}`}
    >
      <AppHeader />
      <main>
        {loading ? (
          <p>Загрузка</p>
        ) : (
          <Routes location={background || location}>
            <Route path="/" element={<Home />} />
            <Route
              path="/ingredients/:ingredientId"
              element={<IngredientDetails />}
            />
            <Route
              path="/login"
              element={<OnlyUnAuth component={<Login />} />}
            />
            <Route
              path="/register"
              element={<OnlyUnAuth component={<Registration />} />}
            />
            <Route
              path="/forgot-password"
              element={<OnlyUnAuth component={<ForgotPassword />} />}
            />
            <Route
              path="/reset-password"
              element={<OnlyUnAuth component={<ResetPassword />} />}
            />
            <Route
              path="/profile/orders"
              element={<OnlyAuth component={<OrdersHistory />} />}
            />
            <Route
              path="/profile/order/:number"
              element={<OnlyAuth component={<OrderDetailsModal />} />}
            />
            <Route
              path="/profile"
              element={<OnlyAuth component={<Profile />} />}
            />
            <Route path="/feed" element={<Feed />} />
            <Route
              path="/feed/:number"
              element={<OrderDetailsModal />}
            />
          </Routes>
        )}
        {background && (
          <Routes>
            <Route
              path="/ingredients/:ingredientId"
              element={
                <Modal close={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path="/feed/:number"
              element={
                <Modal close={handleModalClose}>
                  <OrderDetailsModal />
                </Modal>
              }
            />
            <Route
              path="/profile/order/:number"
              element={
                <Modal close={handleModalClose}>
                  <OrderDetailsModal />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;
