import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducers';
import { socketMiddleware } from './get-order/middleware/socket-middleware';
import {
  connect,
  connectProfile,
  disconnect,
  disconnectProfile,
} from './socket/action';
import { wsConnectionError, wsMessage } from './get-order/slice';
import {
  wsConnectionProfileError,
  wsMessageProfile,
} from './get-order/sliceProfile';
const getOrderMiddleware = socketMiddleware({
  wsDisconnect: disconnect,
  wsConnect: connect,
  onError: wsConnectionError,
  onMessage: wsMessage,
});
const getProfileMiddleware = socketMiddleware({
  wsDisconnect: disconnectProfile,
  wsConnect: connectProfile,
  onError: wsConnectionProfileError,
  onMessage: wsMessageProfile,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(
      getOrderMiddleware,
      getProfileMiddleware,
    );
  },
});
