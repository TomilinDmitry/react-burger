import { createAction } from '@reduxjs/toolkit';

export const connect = createAction<string, 'CONNECT'>('CONNECT');
export const connectProfile = createAction<string, 'CONNECTPROFILE'>('CONNECTPROFILE');
export const disconnect = createAction('DISCONNECT');
export const disconnectProfile = createAction('DISCONNECTPROFILE');
