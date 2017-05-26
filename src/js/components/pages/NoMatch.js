import React from "react";

export default ({ location }) => (
  <section className="container">
    <p>Oops! Nothing found here.</p>
    <p>Sorry, there was no match for <code>'{location.pathname}'</code></p>
  </section>
);
