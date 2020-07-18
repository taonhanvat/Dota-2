import React, { Component } from 'react';

class ImageItem extends Component {
    // sendDataItemTier1 = (item) => {
    //    this.props.getDataItemTier1(item);
    // }
    render() {
        return (
            <a data-toggle="tooltip" data-placement="bottom" title={this.props.data.name_item}>
            <img src = {`https://api.opendota.com${this.props.data.img_item}`} style = {{cursor: 'pointer',border : 'solid white 2px' , borderRadius : '10px'}}></img>
            </a>
        );
    }
}

export default ImageItem;