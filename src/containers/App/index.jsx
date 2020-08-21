import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import RootLayout from '../../layout';
import Header from '../Header';
import Home from '../Home';
import './style.module.scss';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Publica',
    fontSize: 16
  }
});

const App = () => (
  <ThemeProvider theme={theme}>
    <RootLayout
      header={
        <Header />
      }
      content={
        <Home />
      }
    />
  </ThemeProvider>
);

export default App;
