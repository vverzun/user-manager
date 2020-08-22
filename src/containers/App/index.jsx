import React from 'react';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Header from '../Header';
import Manager from '../Manager';
import Modal from '../Modal';
import store from '../../store';
import './style.module.scss';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Publica',
    fontSize: 16
  }
});

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Header />
      <Manager />
      <Modal />
    </ThemeProvider>
  </Provider>
);

export default App;
