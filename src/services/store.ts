import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducers';
import { socketMiddleware } from './get-order/middleware/socket-middleware';
import { connect, disconnect } from './socket/action';
import {
  wsConnectionError,
  wsMessage,
  // wsConnect,
  // wsDisconnect,
} from './get-order/slice';
const getOrderMiddleware = socketMiddleware({
  wsDisconnect: disconnect,
  wsConnect: connect,
  onError: wsConnectionError,
  onMessage: wsMessage,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(getOrderMiddleware);
  },
});
