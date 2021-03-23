import React, { useState } from 'react';
import AppRoutes from 'routes/AppRoutes';
import Header from 'containers/Header/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Component } from 'react';
// import AppContextProvider from 'context/AppContextProvider';
import {Provider} from 'react-redux';
import store from './store'

export class  App extends Component {
  render(){
    return (
      <>
        {/* <AppContextProvider> */}
          <Provider store={store}>
            <Router>
              <Header/>
              <AppRoutes />
            </Router>
          </Provider>
        {/* </AppContextProvider> */}
      </>
    );
  }
  
}

export default App;