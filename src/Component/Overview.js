import React, { Component } from 'react';
import SkillDetail from './SkillDetail';

class Overview extends Component {
    renderSkill = () => {
        return this.props.data.map(element => {
            return <SkillDetail name_skill = {element.nameskill} img_skill = {element.imgskill} describle_skill = {element.describle}/>
        })
    }
    render() {
        return (
            <div className = "container" style = {{textAlign : 'center'}}>
                <h1 style ={{color:'#9c3627'}}>OVERVIEW</h1>
               <div className = "row p-3" style = {{border : '#9c3627 solid 2px',color : 'white'}}>
                   <div className = "col-4">
                           <div className = "row">
                           <img src = {`http://cdn.dota2.com/apps/dota2/images/heroes/${this.props.data[0].name}_full.png`} style = {{height : '300px'}} className = "col-12"></img>
                               
                               <div className = "col-6">
                                   <div className = "row mt-2 ">
                                   <img src = "http://cdn.dota2.com/apps/dota2/images/heropedia/overviewicon_int.png" className = "col-5" >
                                   </img>
        <div className = "col-7" style = {{fontSize:'15px',paddingTop:'1px',paddingBottom:'1px',lineHeight:'30px'}}>{`${this.props.data[0].base_int}+${this.props.data[0].int_gain}`}</div>
                                   </div>
                                   <div className = "row mt-2">
                                   <img src = "http://cdn.dota2.com/apps/dota2/images/heropedia/overviewicon_agi.png" className = "col-5" >
                                   </img>
        <div className = "col-7" style = {{fontSize:'15px',paddingTop:'1px',paddingBottom:'1px',lineHeight:'30px'}}>{`${this.props.data[0].base_agi}+${this.props.data[0].agi_gain}`}</div>
                                   </div>
                                   <div className = "row mt-2">
                                   <img src = "http://cdn.dota2.com/apps/dota2/images/heropedia/overviewicon_str.png" className = "col-5" >
                                   </img>
        <div className = "col-7" style = {{fontSize:'15px',paddingTop:'1px',paddingBottom:'1px',lineHeight:'30px'}}>{`${this.props.data[0].base_str}+${this.props.data[0].str_gain}`}</div>
                                   </div>
                               </div>
                               <div className = "col-6">
                               <div className = "row mt-2 ">
                                   <img src = "http://cdn.dota2.com/apps/dota2/images/heropedia/overviewicon_attack.png" className = "col-5" style = {{paddingTop:'5px',paddingBottom:'5px'}} >
                                   </img>
                                   <div className = "col-7" style = {{fontSize:'15px',paddingTop:'1px',paddingBottom:'1px',lineHeight:'30px',color: 'white'}}>{`${this.props.data[0].base_attack_min}-${this.props.data[0].base_attack_max}`}</div>
                                   </div>
                                   <div className = "row mt-2">
                                   <img src = "http://cdn.dota2.com/apps/dota2/images/heropedia/overviewicon_speed.png" className = "col-5" style = {{paddingTop:'5px',paddingBottom:'5px'}} >
                                   </img>
                                   <div className = "col-7" style = {{fontSize:'15px',paddingTop:'1px',paddingBottom:'1px',lineHeight:'30px',color: 'white'}}>{this.props.data[0].move_speed}</div>
                                   </div>
                                   <div className = "row mt-2">
                                   <img src = "http://cdn.dota2.com/apps/dota2/images/heropedia/overviewicon_defense.png" className = "col-5" style = {{paddingTop:'5px',paddingBottom:'5px'}} >
                                   </img>
                                   <div className = "col-7" style = {{fontSize:'15px',paddingTop:'8px',paddingBottom:'8px',lineHeight:'30px',color: 'white'}}>{this.props.data[0].base_armor}</div>
                                   </div>
                               </div>
                               </div>
                            
                           
                   </div>
                   <div className = "col-8">
                       {this.renderSkill()}
                    </div>
                   </div>
               </div>
            
        );
    }
}

export default Overview;