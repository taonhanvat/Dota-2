import React, { Component } from 'react';
import axios from 'axios';
import Introduce from './Introduce';
import Overview from './Overview';
import SkillDetail from './SkillDetail';
import Header from './Header';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getdata :[]
        }
    }
    
    componentWillMount () {
        axios.get(`http://localhost:3002/heroes/${this.props.match.params.heroname}`).then(response => {
            this.setState({
                getdata : response
            })
        }) 
    }
    
    render(){
    let datahero = [];
    datahero = this.state.getdata
    if(datahero.length === 0) return null
        else{
        return (
            <div>
                <Header/>
            <div  className = "container" style = {{backgroundColor : 'darkorchid', border : "1px solid black"}}>
                <Introduce heroname = {datahero.data[0].name} name = {datahero.data[0].localized_name} roles = {datahero.data[0].roles.join('-')}/>
                <hr style = {{backgroundColor : 'black'}}/>
                <Overview  data = {datahero.data}/>
            </div>
            </div>
        );
    }
}
}

export default Test;