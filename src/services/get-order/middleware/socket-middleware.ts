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