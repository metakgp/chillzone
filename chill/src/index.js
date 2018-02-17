import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import schedule from './schedule.json';

ReactDOM.render(<App schedule={schedule} />, document.getElementById('root'));
registerServiceWorker();
