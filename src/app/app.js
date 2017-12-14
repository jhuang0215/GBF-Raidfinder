const React = require('react');
const ReactDOM = require('react-DOM');

require('./assets/css/app.css');
const raidConfig = require('./../../raids.json');

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
            <div className="container">            
               {this.state.openMenu ? <RaidMenu onDelete={this.menuToggle.bind(this)} /> : null}
               <ul>{raidCards}</ul>               
               <SettingButton onClick={this.menuToggle.bind(this)} />               
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
}

class RaidFilteredList extends React.Component {
    render() {
        return (
            <ul className="menu-list">
                {this.props.items.map(function(item, index){                
                    return <li className="list-group-item" key={index}>{item.english}</li>
                })}
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
                        <RaidFilteredList items={this.state.items} />
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