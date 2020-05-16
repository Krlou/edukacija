import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import NotFound from "./components/pages/notFound";
import RegisterPage from "./components/pages/registerPage";
import LoginPage from "./components/pages/loginPage";
import LibraryPage from "./components/pages/libraryPage";
import HomePage from "./components/pages/homePage";
import Logout from "./components/logout";
import BookPage from "./components/pages/bookPage";
import NewBookPage from "./components/pages/newBookPage";
import RequestsPage from "./components/pages/requestsPage";

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Switch>
          <Route path="/requests" component={RequestsPage} />
          <Route path="/new-book" component={NewBookPage} />
          <Route path="/book/:id" component={BookPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/library/:id" component={HomePage} />
          <Route path="/library" component={LibraryPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/login" />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
