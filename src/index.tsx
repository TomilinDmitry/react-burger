import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { rootReducer } from './services/rootReducers';
import { BrowserRouter } from 'react-router-dom';
import { store } from './services/store';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>                                                                          
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
