import { createAction } from '@reduxjs/toolkit';

export const connect = createAction<string, 'CONNECT'>('CONNECT');
export const disconnect = createAction('DISCONNECT');
