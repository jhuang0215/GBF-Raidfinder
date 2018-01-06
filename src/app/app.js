const React = require('react');
const ReactDOM = require('react-DOM');

const raidConfig = require('./../../raids.json');
require('./assets/css/app.css');

import io from 'socket.io-client';
const socket = io('http://localhost:3000');

// Module requires
const SettingButton = require('./components/settingButton');
const RaidMenu = require('./components/raidMenu');
const RaidCard = require('./components/raidCard');

// Creat component 
class RaidFinderComponenet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openMenu: false,
            // raidCards : [{raid: raidData, raidTweets: []}]
            raidCards: []            
        };
    }

    componentDidMount() {                
        socket.on('tweet', function(raidInfo) {            
            let raids = this.state.raidCards;
            
            for(let i = 0; i < raids.length; i++){
                if(raids[i].raid.room === raidInfo.room){                    
                    let count = raids[i].raidTweets.unshift(raidInfo);
                    
                    if(count > 10){
                        raids[i].raidTweets.pop();
                    }
                    
                    this.setState({
                        raidCards: raids
                    });
                }
            }
        }.bind(this));
    }

    render() {
        return (
            <div className="main-container">
                <SettingButton onClick={this.menuToggle.bind(this)} />
                {this.state.openMenu ? <RaidMenu onDelete={this.menuToggle.bind(this)} onAdd={this.addRaidCard.bind(this)} /> : null}

                <div className="gbfrf-columns">
                    {this.state.raidCards.map((item, index)=>{
                        //return <div className="gbfrf-column" key={index}>{item.english}  </div>
                        return <RaidCard key={item.raid.room} 
                            raid={item.raid} 
                            raidTweets={item.raidTweets} 
                            socket={socket} 
                            handleDelete={this.deleteRaidCard.bind(this)} />
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
        let raids = this.state.raidCards;

        for(let i = 0; i < raids.length; i++) {
            if(raidData === raids[i].raid){
                return null;
            }
        }
        let newCard = {raid: raidData, raidTweets: []};
        // append new card
        raids.push(newCard);
        this.setState({
            raidCards: raids
        });
    }

    deleteRaidCard(raidData){
        let cards = this.state.raidCards;

        for(let i = 0; i < cards.length; i++){
            if(raidData === cards[i].raid){                
                cards.splice(i, 1);
                break;
            }
        }

        this.setState({
            raidCards: cards
        });
    }
}


// Put component into html page
ReactDOM.render(<RaidFinderComponenet />, document.getElementById('raidfinder-wrapper'));