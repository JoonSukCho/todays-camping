import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';

import 'assets/scss/material-kit-react.scss?v=1.10.0';

// pages for this product
import Components from 'views/Components/Components.js';
import DetailPage from 'views/DetailPage/DetailPage';
import LoginPage from 'views/LoginPage/LoginPage.js';
import MainPage from 'views/MainPage/MainPage';
import OAuth2RedirectHandler from 'views/OAuth/OAuth2RedirectHandler';
import RecoilCounter from 'views/TestPage/RecoilCounter';

const hist = createBrowserHistory();

const App = () => {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/test-page" component={RecoilCounter} />
        <Route path="/oauth/kakao/callback" component={OAuth2RedirectHandler} />
        <Route path="/detail-page/:id" component={DetailPage} />
        <Route path="/login-page" component={LoginPage} />
        <Route path="/" component={MainPage} />
      </Switch>
    </Router>
  );
};

export default App;
