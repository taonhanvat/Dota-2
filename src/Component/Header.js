import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div className=" bg-dark text-light">
        <div className="container">
          <ul className="nav nav-pills">
            <img src="http://cdn.dota2.com/apps/dota2/images/nav/logo.png" />
            <li className="nav-item ml-4">
              <a className="nav-link active" href="/graft-item">ITEM</a>
            </li>
          </ul>
        </div>
      </div>
        );
    }
}

export default Header;