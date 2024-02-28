export const CONNECTING: 'CONNECTING' = 'CONNECTING';
export const OPEN: 'OPEN' = 'OPEN';
export const CLOSING: 'CLOSING' = 'CLOSING';
export const CLOSED: 'CLOSED' = 'CLOSED';
export const socketStates = {
  0: CONNECTING,
  1: OPEN,
  2: CLOSING,
  3: CLOSED,
};
export const wss = new WebSocket(
  'wss://norma.nomoreparties.space/orders/all',
);
wss.onopen = (event: Event) => {
  console.log('+++++');
};
wss.onerror = (event: Event) => {
  console.log(`Ошибка `);
};
wss.onmessage = (event: MessageEvent) => {
  if(event.data instanceof ArrayBuffer) {
      const view = new DataView(event.data);
      console.log(view.buffer);
  }
}; 