import React, { Component } from 'react';

class ImageAllItemGraft extends Component {
    sendData = (data) => {
        for(let i = 0 ; i < this.props.stateOfImageTier2.length ; i++) {
            if(this.props.stateOfImageTier2[i].isEmpty) {
                this.props.getData(data);
                break;
            }
        }
    }
    getDataComeBack = (data) => {
        for(let i = 0 ; i < this.props.stateOfImageTier2.length ; i++) {
            if(this.props.stateOfImageTier2[i].isEmpty) {
                this.props.comeback(data);
                break;
            }
        }
    }
    logicRender = () => {
        const data = this.props.data
        if(data.stateOfAllPieceForGraft) return <a data-toggle="tooltip" data-placement="bottom" title = {this.props.data.name_item}><img onClick = {() => this.sendData(data)} src = {`https://api.opendota.com${data.img_item}`} style = {{width : '100%', border : 'solid white 2px' ,borderRadius : '10px', cursor: 'pointer'}} /></a>
        if(!data.stateOfAllPieceForGraft) return <img onClick = {() => this.getDataComeBack(data)} src = {`https://api.opendota.com${data.img_item}`} style = {{width : '100%', border : 'solid white 2px' ,borderRadius : '10px' , opacity : '0.2',cursor: 'pointer'}} />
    }
    render() {
        return (
            <div className = "mt-3" >
                {this.logicRender()}
            </div>  
        );
    }
}

export default ImageAllItemGraft;