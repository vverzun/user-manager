import React from 'react';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Router from '../../router';
import store from '../../store';
import './style.module.scss';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Sono',
    fontSize: 16
  }
});

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </Provider>
);

export default App;
