import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app';

const Resolved = App.run({});

ReactDOM.render(<Resolved />, document.querySelector('#root'));
