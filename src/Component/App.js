
import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import RoleHeroes from './RoleHeroes';
import Filter from './Filter';
import Hero from './Hero';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:'',
      name :'CHOSE A HERO',
      roles : ['-','-'],
      dataFilter : [],
      restDataFilter : [],
      test :[],
      test1:[]
    }
  }
  
  componentWillMount() {
    const a = axios.get('https://api.opendota.com/api/heroes').then(a=> this.setState({
      data : a.data, 
      dataFilter : a.data
    }));
    const b = axios.get('https://api.opendota.com/api/constants/items').then(b =>
    this.setState({
      test : b.data
    })
    )
    
    }
  filterData = (dataFilter,restdata) => {
    this.setState({
      dataFilter : dataFilter,
      restDataFilter : restdata
    })
  }

  speak = (message)=> {
    var msg = new SpeechSynthesisUtterance(message)
    var voices = window.speechSynthesis.getVoices()
    msg.voice = voices[0]
    window.speechSynthesis.speak(msg)
  }

  getInforOfHeroOnClick = (name,roles) => {
     this.setState({
       name : name ,
       roles : roles
     })
     this.speak(name)
  }  
  render() {
    return (
      <div>
        <Header/>
      <div className="container bg-secondary text-white mt-10 ">
        <RoleHeroes name = {this.state.name} roles = {this.state.roles} />
        <div className="container">
          <Filter filterData ={(dataFilter,restdata) => this.filterData(dataFilter,restdata)}/>
          <Hero restDataFilter = {this.state.restDataFilter} dataFilter = {this.state.dataFilter} getInforOfHeroOnClick = {(name,roles) => this.getInforOfHeroOnClick(name,roles)} />
        </div>
      </div>
    </div>
    );
  }
}


export default App;
