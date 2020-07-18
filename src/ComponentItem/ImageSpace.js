import React, { Component } from 'react';

class ImageSpace extends Component {
    giftData = (data) => {
       for(let i = 0 ; i < this.props.allState.length ; i++) {
           if(this.props.allState[i]){this.props.getGiftData(data)
           break;
        }

       }
    }
    logicRender = () => {
        if(this.props.informationForRender.isEmpty) return <img src = "http://cdn.dota2.com/apps/dota2/images/quiz/item-slot-unknown.png" className = "mt-3" style = {{cursor: 'pointer',border : 'solid white 2px' ,borderRadius : '10px'}}></img>
        else if(!this.props.informationForRender.isEmpty) return <a data-toggle="tooltip" data-placement="bottom" title = {this.props.informationForRender.currentItem.name_item}><img onClick ={() => this.giftData(this.props.informationForRender)} src = {`https://api.opendota.com${this.props.informationForRender.currentItem.img_item}`} className = "mt-3" style = {{cursor: 'pointer',border : 'solid white 2px' ,borderRadius : '10px'}}></img></a>
    }
    render() {
        return (
            <div>
                {this.logicRender()}
            </div>
        );
    }
}

export default ImageSpace;