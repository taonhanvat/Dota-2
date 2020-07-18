import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "../Component/App";
import Test from "../Component/Test";
import Item from "../ComponentItem/Item";
import Login from "../Login/Login";
class DieuHuong extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path ="/" component = {Login}/>
          <Route path="/app" component={App} />
          <Route path="/heroes/:heroname" component={Test} />
          <Route path="/graft-item" component ={Item} />
        </div> 
      </Router>
    );
  }
}

export default DieuHuong;
