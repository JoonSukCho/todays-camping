import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';

import 'assets/scss/material-kit-react.scss?v=1.10.0';

// pages for this product
import LoginPage from 'views/LoginPage/LoginPage';
import MainPage from 'views/MainPage/MainPage';
import OAuth2RedirectHandler from 'views/OAuth/OAuth2RedirectHandler';
import RecoilCounter from 'views/TestPage/RecoilCounter';
import NotFound from 'views/Error/NotFound';

const hist = createBrowserHistory();

const App = () => {
  return (
    <Router history={hist}>
      <Switch>
        <Route exact path="/" component={MainPage} />

        <Route path="/login-page" component={LoginPage} />
        <Route path="/test-page" component={RecoilCounter} />
        <Route path="/oauth/kakao/callback" component={OAuth2RedirectHandler} />

        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
