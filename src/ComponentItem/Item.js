import React, { Component } from "react";
import axios from "axios";
import ImageItem from "./ImageItem";
import ImageSpace from "./ImageSpace";
import ImageAllItemGraft from "./ImageAllItemGraft";
import Header from "../Component/Header";
import styles from './test.css';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataItem: [],
      anotherTypeDataItem :[],
      number: this.getRandomNumber(),
      itemOnClicked: {},
      stateOfImageTier2: [],
      AllPieceForGraft : [],
      point : 0,
      correct : ''
    };
  };

  componentWillMount() {
    this.fetchAllDataFromServer();
  };

  fetchAllDataFromServer() {
    return axios.get(`http://localhost:3002/graft-item`).then((res) => {
      this.setState({
        dataItem: res.data,
      }, this.prepareDataInState);
    });
  };                                                    

  prepareDataInState = () => {
    const { dataItem, number } = this.state;
    const currentCreatingItem = dataItem[0][number];
    let newStateOfImageTier2 = currentCreatingItem.component.map(() => ({
      isEmpty: true,
      currentItem: null,
    }));
    if (currentCreatingItem.recipe)
      newStateOfImageTier2.push({
        isEmpty: true,
        currentItem: null,
      });
    this.setState({
      stateOfImageTier2: newStateOfImageTier2,
    });
    let arr = this.getTrueComponentForGraft()
    let a = 10 - arr.length;
    for (let i = 0; i < a; i++) {
      let b = Math.floor(Math.random() * 243);
      arr.push(this.state.dataItem[1][b]);
    }
    arr.sort(function () {
      return 0.5 - Math.random();
    });
    let c = {
      id: 9999,
      img_item: "/apps/dota2/images/items/recipe_lg.png",
      name_item: "recipe",
    };
    arr.push(c);
    for(let i = 0 ; i < arr.length ; i++){
      arr[i] = {
        ...arr[i],
        stateOfAllPieceForGraft : true ,
        index : i
      }
    }
    this.setState({
        AllPieceForGraft : arr
    })
    this.repairDataForCheckResult();
  };

  getRandomNumber() {
    return Math.floor(Math.random() * Math.floor(99));
  };

  functionRenderTier1 = () => {
    return (
      <ImageItem indexItem={this.state.number} data={this.state.dataItem[0][this.state.number]} />
    );
  };

  functionRenderTier2 = () => {
    const { stateOfImageTier2 } = this.state;
    const allState = [];
    stateOfImageTier2.forEach(element => {
      allState.push(element.isEmpty)
    })
    // console.log(allState)
    return stateOfImageTier2.map((element) => <ImageSpace 
    allState = {allState}
    getGiftData = {(data) => this.getGiftData(data)}
    informationForRender = {element}/>)
  };

  getTrueComponentForGraft = () => {
    let newarr = [];
    this.state.dataItem[1].forEach((element) => {
      this.state.dataItem[0][this.state.number].component.forEach((e) => {
        if (element.name_item === e) newarr.push(element);
      });
    });
    console.log(newarr)
    return newarr;
  };

  functionRenderAllPieceForGraft = () => {
    return this.state.AllPieceForGraft.map((element) => {
      return (
        <ImageAllItemGraft
          stateOfImageTier2 = {this.state.stateOfImageTier2}
          comeback = {(data) => this.comeback(data)}
          getData={(data) => this.getData(data)}
          data={element}
        />
      );
    });
  };

  getData = (data) => {
      let {AllPieceForGraft} = this.state;
      let temparr = this.state.stateOfImageTier2;
      for(let i = 0 ; i < temparr.length ; i++){
          if(temparr[i].isEmpty) {
              temparr[i].isEmpty = !temparr[i].isEmpty
              temparr[i].currentItem = data;
              break;
          }
      }
      AllPieceForGraft.forEach(element => {
        if(element.index === data.index) element.stateOfAllPieceForGraft = !element.stateOfAllPieceForGraft
      })
      this.setState({
          stateOfImageTier2 : temparr
      },this.checkresult)

  };
  
  repairDataForCheckResult = () => {
      const {dataItem,number} = this.state;
      if(dataItem[0][number].recipe) dataItem[0][number].component.push('recipe')
      this.setState({
         anotherTypeDataItem : dataItem[0][number].component.sort()
      }) 
  };

  checkresult = () => {
      const {stateOfImageTier2,anotherTypeDataItem} = this.state;
      let AllIdOfImageTier2 = [];
      let dem = 0;
      stateOfImageTier2.forEach(element => {
         if(element.currentItem != null) AllIdOfImageTier2.push(element.currentItem.name_item)
         if(element.currentItem == null) AllIdOfImageTier2.push(null)
         if(!element.isEmpty) dem++
      })
      AllIdOfImageTier2 = AllIdOfImageTier2.sort();
      // console.log(AllIdOfImageTier2)
      // console.log(anotherTypeDataItem)
      if(dem === stateOfImageTier2.length){
        if(JSON.stringify(AllIdOfImageTier2) == JSON.stringify(anotherTypeDataItem)) 
        {
          setTimeout(() => this.reset(100,0),2000)
          this.displayCorrect()
        }
        else {
          setTimeout(() => this.reset(0,this.state.point),2000)
          this.displayWrong()
        }
      }
  };

  reset = (add,minus) => {
    this.fetchAllDataFromServer();
    this.setState({
      number: this.getRandomNumber(),
      correct : '',
      point : this.state.point + add - minus
    })
  };

  getGiftData = (data) => {

     const {AllPieceForGraft , stateOfImageTier2 } = this.state;
     stateOfImageTier2.forEach(element => {
       if(element.currentItem != null && element.currentItem.index === data.currentItem.index)element.isEmpty = !element.isEmpty
     })
     this.setState({
       stateOfImageTier2 : stateOfImageTier2
     })
     AllPieceForGraft.forEach(element => {
       if(element.index === data.currentItem.index) element.stateOfAllPieceForGraft = !element.stateOfAllPieceForGraft
     })
  };
 
  comeback = (data) => {
     console.log(data)
     const {AllPieceForGraft , stateOfImageTier2 } = this.state;
     stateOfImageTier2.forEach(element => {
      if(element.currentItem != null && element.currentItem.index === data.index ) element.isEmpty = !element.isEmpty
    })
    this.setState({
      stateOfImageTier2 : stateOfImageTier2
    })
    AllPieceForGraft.forEach(element => {
      if(element.index === data.index) element.stateOfAllPieceForGraft = !element.stateOfAllPieceForGraft
    })
  };
  
  displayCorrect = () =>{
    this.setState({
      correct : 'correct!'
    })
  }
  displayWrong = () => {
    this.setState({
      correct : 'wrong!'
    })
  }
  render() {
    if (this.state.dataItem.length === 0) return null
    else
      return (
        <div>
          <Header/>
        <div
          className="container"
          style={{
            display: "block",
            backgroundColor: "#CCC",
            marginTop: "15%",
            border: "solid red 2px",
            padding: "3%",
          }}
        >
          <div
            className="row"
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <div>
              {this.functionRenderTier1()}
              <div className=" row" style={{ justifyContent: "center" }}>
                {this.functionRenderTier2()}
              </div>
              <div className=" row" style={{ justifyContent: "center" }}>
                {this.functionRenderAllPieceForGraft()}
              </div>
              <h2 className = {styles.abc}>{`Point : ${this.state.point}`}</h2>
        <h2 >{this.state.correct}</h2>
            </div>
          </div>
        </div>
        </div>
      );
  };
};
export default Item;