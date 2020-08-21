import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Header from '../Header';
import Content from '../Content';
import Modal from '../Modal';
import './style.module.scss';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Publica',
    fontSize: 16
  }
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Header />
    <Content />
    <Modal />
  </ThemeProvider>
);

export default App;
