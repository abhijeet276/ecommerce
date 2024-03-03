import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './contexts/themeContext.tsx';
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from './redux/store.ts';
import { Provider } from 'react-redux';
import { transitions, positions, Provider as AlertProvider, AlertProviderProps } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { PersistGate } from 'redux-persist/integration/react';
import "./index.scss";
const options: AlertProviderProps = {
  timeout: 5000,
  template: AlertTemplate,
  transition: transitions.SCALE,
  position: positions.TOP_RIGHT,
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AlertProvider {...options}>
            <App />
          </AlertProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
  // </React.StrictMode>,
)
