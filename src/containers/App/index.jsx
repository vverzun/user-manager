import React from 'react';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Event from '../../components/Event';
import store from '../../store';
import './style.module.scss';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Sono',
    fontSize: 16
  }
});

const description = `
The party will take plave in the flat. Bring your flip
flops with u because the floor is dirty, have a nice party. WooooHoooo!!
`;

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Event
        id="1"
        title="Party"
        date={new Date().toDateString()}
        description={description}
        participants={['Vanya', 'Natalie', 'Vera', 'Igor']}
        location="Lybidska st."
      />
    </ThemeProvider>
  </Provider>
);

export default App;
