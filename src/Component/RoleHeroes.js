import React, { Component } from 'react';

class RoleHeroes extends Component {
    render() {
        return (
            <div className="container mt-3 bg-dark text-light mt-10 ml-10 mr-100">
          <h1 style={{textAlign: 'center'}}>{this.props.name}</h1>
          <hr className="my-2" style={{backgroundColor: 'white'}} /> 
          <p style={{textAlign: 'center'}}>{this.props.roles.join("-")}</p>
        </div>
        );
    }
}

export default RoleHeroes;