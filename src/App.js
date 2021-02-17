import React from 'react';
import Layout from "components/Layout/Layout";
import Header from "containers/Header/Header";
import Homepage from "containers/Homepage/Homepage";
import Posts from "containers/Posts/Posts";
import Todos from "containers/Todos/Todos";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
        <Router>
          <Header/>
              <Switch>
                <Route path="/" exect component={Homepage} />
                <Route path="/posts" component={Posts} />
                <Route path="/todos" component={Todos} />
              </Switch>
         </Router>
    </div>
  );
}

export default App;