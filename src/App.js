import React, { useState } from 'react';
import AppRoutes from 'routes/AppRoutes';
import Header from 'containers/Header/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Component } from 'react';
import AppContextProvider from 'context/AppContextProvider';

export class  App extends Component {
  render(){
    return (
      <>
        <AppContextProvider>
          <Router>
            <Header/>
            <AppRoutes />
          </Router>
        </AppContextProvider>
      </>
    );
  }
  
}

export default App;