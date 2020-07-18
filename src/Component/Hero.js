import React, { Component } from "react";
import axios from "axios";
import RenderImagesHero from "./RenderImagesHero";
class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      detailHero : [],
      test : [],
      test1 : []
    };
  }

  componentWillMount() {
    const a = axios.get("https://api.opendota.com/api/heroes").then((a) =>
      this.setState({
        data: a.data,
      })
    );
    const b = axios.get('https://api.opendota.com/api/constants/abilities').then((b) => {
      
      this.setState({
        detailHero : b.data
      })
    })
    const c = axios.get('https://api.opendota.com/api/constants/ability_keys').then((c) => {
      let q = [];
      Object.keys(c.data).forEach(element => {
        if(element.indexOf("special") == -1 )   q.push(element)
      })
      this.setState({
        test : q 
      })
    })
    const d = axios.get('https://api.opendota.com/api/heroStats').then(d => {
      this.setState({
        test1 : d.data
      })
    })
  }
  
  renderHero = (primary, typeattack) => {
    return this.state.data.map((element) => {
      if (
        element.primary_attr === primary &&
        element.attack_type === typeattack
      ) {
        
        return (
          <RenderImagesHero
            getInforOfHeroOnClick={(name, roles) =>
              this.props.getInforOfHeroOnClick(name, roles)
            }
            roles={element.roles}
            heroname={element.name.slice(14)}
            name={element.localized_name}
            opacity={this.getOpacaticyForHero(element.localized_name)}
          />
        );
      }
    });
  };

  getOpacaticyForHero(heroname) {
    let a;
    this.props.dataFilter.forEach(element => {
      if(element.localized_name == heroname ) {
        a = 1;
      }
   })
  this.props.restDataFilter.forEach(b => {
      if(b.localized_name == heroname) {
        a = 2
      }
  })
    if(a == 1) return 1
    if(a == 2) return 0.2
  }

  render() {
    return (
      <div className="row mt-10">
        <div
          className="col-4"
          style={{ textAlign: "center", borderRight: "1px solid white" }}
        >
          <h5>STRENGTH</h5>
          <div className="row">{this.renderHero("str", "Melee")}</div>
          
          <div className="row">{this.renderHero("str", "Ranged")}</div>
        </div>
        <div
          className="col-4"
          style={{ textAlign: "center", borderRight: "1px solid white" }}
        >
          <h5>AGILITY</h5>
          <div className="row">{this.renderHero("agi", "Melee")}</div>
          
          <div className="row">{this.renderHero("agi", "Ranged")}</div>
        </div>
        <div className="col-4" style={{ textAlign: "center" }}>
          <h5>INTELLIGENCE</h5>
          <div className="row">{this.renderHero("int", "Melee")}</div>
          
          <div className="row">{this.renderHero("int", "Ranged")}</div>
        </div>
      </div>
    );
  }
}

export default Hero;
