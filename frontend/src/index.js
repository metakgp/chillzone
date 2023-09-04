import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import schedule from './schedule.json';
import empty_schedule from './empty_schedule.json';

document.getElementById('root').className = 'container-fluid';
ReactDOM.render(<App schedule={schedule} empty_schedule={empty_schedule} />, document.getElementById('root'));
registerServiceWorker();
