import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import messages from './translations';
import RTL from './components/RTL';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <RTL>
      <IntlProvider locale='ar' messages={messages['ar']}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </IntlProvider>
    </RTL>
  </ThemeProvider>,
  document.getElementById('root')
);

reportWebVitals();
