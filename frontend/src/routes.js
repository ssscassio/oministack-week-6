import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './pages/Main';
import Box from './pages/Box';

/**
 * BrowserRoutes is a Router that uses the HTML5 history API to keep UI in sync with
 * the URL.
 */
const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/box/:id" component={Box} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
