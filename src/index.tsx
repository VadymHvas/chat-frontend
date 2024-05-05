import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import reportWebVitals from './app/reportWebVitals';
import { Provider } from "react-redux";
import { store } from "./app/providers/redux/store";
import { ThemeContextProvider } from "./app/providers/context/theme.context";
import { SocketContext } from "./app/providers/context/socket.context";
import { io } from "socket.io-client";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <SocketContext.Provider value={{socket: io("http://localhost:8000")}}>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </SocketContext.Provider>
  </Provider>
);

reportWebVitals();
 