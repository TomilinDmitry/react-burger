import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from '@reduxjs/toolkit';
import { refreshToken } from '../../../utils/Api/api-ingredients';

import { Middleware } from 'redux';
import { RootState } from '../../..';

export type TWsActionTypes<Message, Send> = {
  wsMessage?: ActionCreatorWithPayload<Message>;
  wsConnectionError?: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsSendMessage?: ActionCreatorWithPayload<Send>;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<Message>;
  wsConnect: ActionCreatorWithPayload<string>;
  onOpen?: ActionCreatorWithoutPayload;
  onClose?: ActionCreatorWithoutPayload;
  onDisconect?: ActionCreatorWithoutPayload;
};

export const socketMiddleware = <Message, Send>(
  wsActions: TWsActionTypes<Message, Send>,
  withRefreshToken = false,
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      // wsConnectionError,
      // wsMessage,
      wsDisconnect,
      onError,
      onMessage,
      wsConnect,
      onOpen,
      onClose,
      wsSendMessage,
    } = wsActions;
    const { dispatch } = store;
    let url = '';
    return (next) => (action) => {
      if (wsConnect.match(action)) {
        socket = new WebSocket(action.payload);
        socket.onopen = () => {
          onOpen && dispatch(onOpen());
        };
        socket.onerror = () => {
          dispatch(onError('Error'));
        };
        socket.onclose = () => {
          onClose && dispatch(onClose());
        };
        socket.onmessage = (evt: MessageEvent) => {
          const { data } = evt;
          try {
            const parsedData = JSON.parse(data) as Message;
            if (
              withRefreshToken &&
              parsedData === 'Invalid or missing token'
            ) {
              refreshToken()
                .then((refreshData) => {
                  const wssUrl = new URL(url);
                  wssUrl.searchParams.set(
                    'token',
                    refreshData.accessToken.replace('Bearer', ''),
                  );
                  wsConnect && dispatch(wsConnect(wssUrl.toString()));
                })
                .catch((error) => {
                  dispatch(onError(error.message));
                });
              dispatch(wsDisconnect());
              return;
            }
            dispatch(onMessage(parsedData));
          } catch (error) {
            dispatch(onError((error as SyntaxError).message));
          }
        };
      }
      if (socket && wsSendMessage && wsSendMessage.match(action)) {
        try {
          const message = JSON.stringify(action.payload);
          socket.send(message);
        } catch (error) {
          dispatch(onError((error as TypeError).message));
        }
      }
      if (socket && wsDisconnect.match(action)) {
        socket.close();
        socket = null;
      }
      next(action);
    };
  };
};

// export const socketMiddleWare = (wssUrl: string): Middleware => {
//   return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
//     let socket: WebSocket | null = null;
//     return (next) => (action: AppActions) => {
//       const { dispatch, getState } = store;
//       const { type, payload } = action;

//       if (type === 'WS_CONNECTION_START') {
//         const socket = new WebSocket(wssUrl);
//       }
//       if (socket) {
//         socket.onopen = (event) => {
//           dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
//         };

//         // функция, которая вызывается при ошибке соединения
//         socket.onerror = (event) => {
//           dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
//         };

//         // функция, которая вызывается при получения события от сервера
//         socket.onmessage = (event) => {
//           const { data } = event;
//           dispatch({ type: 'WS_GET_MESSAGE', payload: data });
//         };
//         // функция, которая вызывается при закрытии соединения
//         socket.onclose = (event) => {
//           dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
//         };
//         if (type === 'WS_SEND_MESSAGE') {
//           const message = payload;
//           // функция для отправки сообщения на сервер
//           socket.send(JSON.stringify(message));
//         }
//       }
//       next(action);
//     };
//   }) as Middleware;
// };
