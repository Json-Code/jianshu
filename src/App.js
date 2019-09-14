import React from 'react';

import Header from './common/header'
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './page/home'
import Detail from './page/detail/loadable'
import Login from './page/login'

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Header></Header>
            <Route path="/" exact component={Home}></Route>
            <Route path="/detail/:id" exact  component={Detail}></Route>
            <Route path="/login" component={Login}></Route>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
