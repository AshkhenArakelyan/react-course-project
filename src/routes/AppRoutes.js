import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from "components/Layout/Layout";
import Header from "containers/Header/Header";
import Homepage from "containers/Homepage/Homepage";
import Posts from "containers/Posts/Posts";
import Todos from "containers/Todos/Todos";
import PostItem from 'containers/PostItem/PostItem';
import Error404 from 'components/Error404/Error404';
import Auth from 'containers/Auth/Auth';


const AppRoutes = () => {
    return (
        <Router>
          <Header/>
            <Layout>
              <Switch>
                <Route path="/" exact component={Homepage} />
                <Route path="/posts" exact component={Posts} />
                <Route path="/posts/:postId" exact component={PostItem} />
                <Route path="/todos" exact component={Todos} />
                <Route path="/auth" exact component={Auth} />
                <Route path="*" exact component={Error404} />
              </Switch>
            </Layout>
         </Router>
    )
}

export default AppRoutes
