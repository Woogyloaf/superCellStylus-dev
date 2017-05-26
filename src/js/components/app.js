import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Header from './common/Header';
import StyleGuide from './pages/StyleGuide';
import NoMatch from './pages/NoMatch';

const App = () => (
  <div className='app-wrapper'>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/style-guide" component={StyleGuide} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default App;