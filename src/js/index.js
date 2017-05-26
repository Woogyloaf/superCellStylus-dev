import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import '../scss/style.scss';
import { HashRouter as Router } from 'react-router-dom';

const render = (Component) => {
  ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('app'),
  );
};

render(App);
