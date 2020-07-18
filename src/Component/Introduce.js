import React, { Component } from 'react';

class Introduce extends Component {
    render() {
        return (
            <div className = " container" style = {{textAlign:'center'}}>
                    <h1>{this.props.name}</h1>
                    <img src = {`http://cdn.dota2.com/apps/dota2/images/heroes/${this.props.heroname}_full.png`}></img>
                    <p>{this.props.roles}</p>
            </div>
        );
    }
}

export default Introduce;