'use strict';
import React from 'react';
import { Link } from 'react-router';

const NoMatch = (props) => (
  <section className='container'>
  <h1>Page Not Found</h1>
  <p>Sorry, but the page you were trying to view does not exist.</p>
  <p>Back to <Link to={'/'}><strong>Home</strong></Link></p>
  </section>
);

export default NoMatch;
