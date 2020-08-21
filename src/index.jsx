import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';

import './styles/reset.scss';

const target = document.getElementById('root');
render(<App />, target);
