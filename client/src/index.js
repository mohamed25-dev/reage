import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import messages from './translations';
import RTL from './components/RTL';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <IntlProvider locale='ar' messages={messages['ar']}>
      <React.StrictMode>
        <RTL>
          <App />
        </RTL>
      </React.StrictMode>
    </IntlProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
