import React, { Component } from "react";
import axios from "axios";
import HeroName from "./HeroName";
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataFilterRole: [],
      dataFilterAttackType: [],
      dataFilterByName: [],
      dataFilter: [],
      restDataFilter : []
    };
  }

  

  componentWillMount() {
    const a = axios.get("https://api.opendota.com/api/heroes").then((a) =>
      this.setState({
        data: a.data,
        dataFilterAttackType: a.data,
        dataFilterByName: a.data,
        dataFilterRole: a.data,
        dataFilter: a.data,
      })
    );
  }
  
  filter = () => {
    let newdata = [];
    let restdata = [];
    this.state.dataFilterAttackType.forEach((element) => {
      let dem = 0;
      this.state.dataFilterByName.forEach((a) => {
        if (element.id == a.id) dem = dem + 1;
      });
      this.state.dataFilterRole.forEach((b) => {
        if (element.id == b.id) dem = dem + 1;
      });
      if (dem == 2) {
        newdata.push(element);
      }
    });
    this.state.data.forEach((element) => {
      let dem = 0;
      newdata.forEach(a => {
        if(element.id != a.id) dem++
      })
      if(dem == newdata.length) restdata.push(element)
    })
    this.setState({
      restDataFilter : restdata
    })
    this.setState({
      dataFilter: newdata,
    }, () => this.filterData(this.state.dataFilter,this.state.restDataFilter));
  }
  
  filterData = (dataFilter,restdata) => {
    this.props.filterData(dataFilter,restdata);
  };

  renderAllHeroName = () => {
    return this.state.data.map((element) => {
      return <HeroName name={element.localized_name} />;
    });
  };

  filterRole = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    let newdata = [];
    if(value === "ALL") {newdata = this.state.data}
    else {
    this.state.data.forEach((element) => {
      element.roles.forEach((a) => {
        if (a.toUpperCase() == value) {
          newdata.push(element);
        }
      });
    })};
    this.setState({
      dataFilterRole: newdata,
    }, () => this.filter());
    
  };

  filterAttackType = (event) => {
    let value = event.target.value;
    let newdata = [];
    if(value === "BY ATTACK TYPE") {newdata = this.state.data}
    else{
    this.state.data.forEach((element) => {
      if (element.attack_type.toUpperCase() === value) {
        newdata.push(element);
      }
    })};
    this.setState({
      dataFilterAttackType: newdata,
    },  () => this.filter());
    
  };
  filterHeroByName = (event) => {
    let value = event.target.value;
    let newdata = [];
    if(value === "HERO NAME") {newdata = this.state.data}
    else{
    this.state.data.forEach((element) => {
      if (element.localized_name === value) {
        newdata.push(element);
      }
    })};
    this.setState({
      dataFilterByName: newdata,
    },  () => this.filter());
    this.filter();
  };

  render() {
    return (
      <ul className="nav nav-pills">
        <span style={{ marginLeft: "22%" }}>FILTER</span>
        <form className="ml-3">
          <div className="form-row align-items-center">
            <div className="col-auto my-1">
              <select
                onChange={(event) => this.filterRole(event)}
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
              >
                <option selected>ALL</option>
                <option value={"CARRY"}>CARRY</option>
                <option value={"DISABLER"}>DISABLER</option>
                <option value={"INITIATOR"}>INITIATOR</option>
                <option value={"JUNGLER"}>JUNGLER</option>
                <option value={"SUPPORT"}>SUPPORT</option>
                <option value={"DURABLE"}>DURABLE</option>
                <option value={"NUKER"}>NUKER</option>
                <option value={"PUSHER"}>PUSHER</option>
                <option value={"ESCAPE"}>ESCAPE</option>
              </select>
            </div>
          </div>
        </form>
        <form className="ml-3">
          <div className="form-row align-items-center">
            <div className="col-auto my-1">
              <select
                onChange={(event) => this.filterAttackType(event)}
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
              >
                <option selected>BY ATTACK TYPE</option>
                
                <option value={"MELEE"}>MELEE</option>
                <option value={"RANGED"}>RANGED</option>
              </select>
            </div>
          </div>
        </form>
        <form className="ml-3">
          <div className="form-row align-items-center">
            <div className="col-auto my-1">
              <select
                onChange={(event) => this.filterHeroByName(event)}
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
              >
                <option value ={"HERO NAME"} selected>HERO NAME</option>
                {this.renderAllHeroName()}
              </select>
            </div>
          </div>
        </form>
      </ul>
    );
  }
}

export default Filter;
