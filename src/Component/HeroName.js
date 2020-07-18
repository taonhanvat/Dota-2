import React, { Component } from 'react';

class HeroName extends Component {
    render() {
        return (
            <option value={this.props.name}>{this.props.name}</option>
        );
    }
}

export default HeroName;