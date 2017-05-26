import React from 'react';
import { NavLink } from 'react-router-dom';

// if using hash history and <NavLink> you should use "replace"
// https://reacttraining.com/react-router/web/api/Link/replace-bool

export default () => (
  <nav id="main-nav">
    <ul>
      <li><NavLink to="/" exact activeClassName="active" replace>Home</NavLink></li>
      <li><NavLink to="/style-guide" activeClassName="active" replace>Style Guide</NavLink></li>
      <li><NavLink to="/dfsdf" activeClassName="active" replace>No Match</NavLink></li>
    </ul>
  </nav>
);
