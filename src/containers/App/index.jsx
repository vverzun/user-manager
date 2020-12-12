import React from 'react';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import Header from '../Header';
// import Manager from '../Manager';
import Modal from '../Modal';
import store from '../../store';
import './style.module.scss';
// import EventList from '../../components/EventList/EventList';
import UserProfile from '../../components/UserProfile/UserProfile';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Sono',
    fontSize: 16
  }
});

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      {/* <Header /> */}
      <UserProfile />
      <Modal />
    </ThemeProvider>
  </Provider>
);

export default App;
