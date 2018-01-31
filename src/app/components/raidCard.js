const React = require('react');

import {CopyToClipboard} from 'react-copy-to-clipboard';

class RaidCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            openSetting: false
        }
    }

    componentDidMount() {
        console.log(this.props.raid);
        this.props.socket.emit('subscribe', this.props.raid);
    }

    componentWillUnmount() {
        console.log(this.props.raid);
        this.props.socket.emit('unsubscribe', this.props.raid);
    }

    render() {
        return (
            <div>
                {this.state.openSetting ? 
                    <NotificationMenu raid={this.props.raid} 
                        settings={this.props.notificationSetting} 
                        onClose={this.menuToggle.bind(this)} /> 
                    : null}
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
                            <button className="notification-setting" onClick={this.menuToggle.bind(this)}>
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
                    <div className="raid-table-container">  
                        <table className="raid-table">
                            <thead>
                                <tr>
                                    <th>Raid ID</th>
                                    <th>Raid Message</th>
                                    <th>Time Tweeted</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.raidTweets.map((raidTweet, index)=>{
                                    return(
                                        <CopyToClipboard key={index}
                                        text={raidTweet.raidID}
                                        onCopy={this.handleRaidClick}> 
                                            <tr>
                                            <td>{raidTweet.raidID}</td>
                                            <td>{raidTweet.message}</td>
                                            <td>{raidTweet.room}</td>
                                            </tr>
                                        </CopyToClipboard>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>            
                </div>
            </div>            

        );
    }//render

    // custon functions
    handleRaidClick() {
        console.log('hue');
    }

    deleteRaidCard() {        
        this.props.handleDelete(this.props.raid);
        //this.props.socket.emit('unsubscribe', {this.props.raidCard.raid});
    }

    menuToggle() {        
        console.log("clicked");
        this.setState({
            openSetting: !this.state.openSetting
        });
    }
}

class NotificationMenu extends React.Component {
    render() {
        return(
            <div className="overlay">
                <div id="setting-container">
                    <div id="setting-modal-header" className="header">{this.props.raid.english}</div>
                </div>
            </div>
        );
    } //render
}

module.exports = RaidCard;