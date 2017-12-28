const React = require('react');
const ReactDOM = require('react-DOM');

const raidConfig = require('./../../raids.json');
require('./assets/css/app.css');

// for RaidTable component
import {subscribeToRaid} from './api'; 
import {unsubscribeToRaid} from './api'

// Creat component 
class RaidFinderComponenet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openMenu: false,
            raidCards: []
        };
    }

    render() {
        let raidCards = this.state.raidCards;
        raidCards = raidCards.map(function(item, index){
            return (
                <li key={index}>{item}</li>
            );
        });// to be continued check out nest componenet

        return (
            <div className="main-container">
                <SettingButton onClick={this.menuToggle.bind(this)} />
                {this.state.openMenu ? <RaidMenu onDelete={this.menuToggle.bind(this)} onAdd={this.addRaidCard.bind(this)} /> : null}

                <div className="gbfrf-columns">
                    {this.state.raidCards.map((item, index)=>{
                        //return <div className="gbfrf-column" key={index}>{item.english}  </div>
                        return <RaidCard key={item.room} raid={item} handleDelete={this.deleteRaidCard.bind(this)} />
                    })}
                </div>             
            </div>
        );
    }//render

    // Custom functions
    menuToggle() {        
        console.log("clicked");
        this.setState({
            openMenu: !this.state.openMenu
        });
    }

    addRaidCard(raidData) {
        let cards = this.state.raidCards;

        for(let i = 0; i < cards.length; i++) {
            if(raidData === cards[i]){
                return null;
            }
        }
        // append new card
        cards.push(raidData);
        this.setState({
            raidCards: cards
        });
    }

    deleteRaidCard(raidData){
        let cards = this.state.raidCards;
        let index = cards.indexOf(raidData);

        if(index > -1) {
            cards.splice(index, 1);
        }

        this.setState({
            raidCards: cards
        });
    }
}

class RaidTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            raidTweets: []
        };
        console.log(this.props.raid);
        subscribeToRaid(this.props.raid, (err, raidInfo)=>{
            if(this.props.raid.room === raidInfo.room) {
                let tweets = this.state.raidTweets;
                tweets.push(raidInfo);
                this.setState({
                    raidTweets: tweets
                });
            }
        });
    }

    render() {
        return(
            <table>
                <thead>
                    <tr>
                        <th>Raid ID</th>
                        <th>Raid Message</th>
                        <th>Time Tweeted</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.raidTweets.map((raidTweet, index)=>{
                        return(
                            <tr key={index}>
                                <td>{raidTweet.raidID}</td>
                                <td>{raidTweet.message}</td>
                                <td>{raidTweet.room}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

class RaidCard extends React.Component {
    render() {
        return (
            <div className="gbfrf-column">
                <div className="raid-image">
                    <img src={this.props.raid.image}/>
                </div>
                <div className="raid-content">
                    <div className="en-title">{this.props.raid.english}</div>
                    <div className="jp-title">{this.props.raid.japanese}</div>
                </div>
                <div className="raid-buttons">
                    <div className="gbfrf-notification">
                        <button className="notification-setting">
                            <img src='/app/assets/svg/two-cogwheels-configuration-interface-symbol.svg' className="svg-cog"/>
                        </button>
                        <button className="notification button left">                    
                            Notification
                        </button>
                    </div>                    
                    <div className="gbfrf-remove">
                        <button className="btn-remove button" onClick={this.deleteRaidCard.bind(this)}>
                            Remove Raid
                        </button>                        
                    </div>
                </div>
                <div className="raid-table">  
                    <RaidTable raid={this.props.raid} />
                </div>            
            </div>
        );
    }//render

    // custon functions
    deleteRaidCard() {
        //unsubscribeToRaid(this.props.raid);
        this.props.handleDelete(this.props.raid);
    }
}

class RaidListItem extends React.Component {
    render() {
        return (
            <li className="list-group-item" onClick={()=>{this.props.onAdd(this.props.raidData)}}>
                {this.props.raidData.english}  
            </li>
        );
    }//render

    // custom function

}

class RaidFilteredList extends React.Component {
    render() {
        return (
            <ul className="menu-list">
                {this.props.items.map(function(item, index){                
                    //return <li className="list-group-item" key={index}>{item.english}  </li>
                    return <RaidListItem key={index} raidData={item} onAdd={this.props.onAdd} />
                }, this)}
                {this.props.items.length === 0 ? <li><strong>No Result</strong><br/>Your search returned no results</li> : null}
            </ul>            
        );
    }//render
    
    
}

class RaidMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            raids: raidConfig,
            items: []
        };
    }
    componentWillMount() {
        this.setState({items: this.state.raids})
    }
    render() {
        return (
            <div className="overlay">
                <div id="menu-container">
                    <a href="javascript:void(0)" className="closeBtn" onClick={this.props.onDelete}>&times;</a>
                    <div className="filter-list">
                        <input type="text" placeholder="Search" onChange={this.filterList.bind(this)} />
                        <RaidFilteredList items={this.state.items} onAdd={this.props.onAdd} />
                    </div>            
                </div>
            </div>

        );
    }//render

    // Custom functions
    filterList(event) {
        let updatedList = this.state.raids;
        updatedList = updatedList.filter(
            (item) => {
                return item.english.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1;
            }
        );
        this.setState({items: updatedList});
    }
    
}

class SettingButton extends React.Component {
    render() {
        return (
            <button className="setting-btn" onClick={this.props.onClick} >
            +
            </button>            
        );   
    }
}

// Put component into html page
ReactDOM.render(<RaidFinderComponenet />, document.getElementById('raidfinder-wrapper'));