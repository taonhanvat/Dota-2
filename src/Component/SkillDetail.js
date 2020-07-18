import React, { Component } from 'react';

class SkillDetail extends Component {
    render() {
        return (
            <div className  = "row mb-3">   
                           <img src= {`https://api.opendota.com${this.props.img_skill}`} style ={{height : '100px'}} className = "col-3"></img>
                           <div className = "col-9" style = {{textAlign : 'left'}}>
                           <h4>{this.props.name_skill}</h4>
                           <div>{this.props.describle_skill}</div>
                           </div>
            </div>
        );
    }
}

export default SkillDetail;