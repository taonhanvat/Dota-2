import React, { Component } from 'react';

class RenderImagesHero extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HeroDetail: {
                name : this.props.heroname ,
                roles : this.props.roles ,
            }
        }
    }
    
    render() {

        return (
            <div className="col-3 mt-2">
                <div className= "row">
                <a href = {`heroes/${this.props.heroname}`}>
                <img  src={`http://cdn.dota2.com/apps/dota2/images/heroes/${this.props.heroname}_full.png`} className='col rounded-circle' style ={{opacity: this.props.opacity }} onMouseOver = {(name,roles)=> this.props.getInforOfHeroOnClick(this.props.name,this.props.roles)}  />
                </a>
                </div>
            </div>
        );
    }
}

export default RenderImagesHero;