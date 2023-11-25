import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './contexts/themeContext.tsx'
import { BrowserRouter } from "react-router-dom"
import { store } from './redux/store.ts'
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
