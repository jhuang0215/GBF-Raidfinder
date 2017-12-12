const React = require('react');
const ReactDOM = require('react-DOM');

require('./css/app.css');
const raidConfig = require('./../../raids.json');

// Creat component 
class RaidFinderComponenet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openSetting: false,
            raidLists: ['hello', 'world']
        };
    }

    render() {
        let raidLists = this.state.raidLists;
        raidLists = raidLists.map(function(item, index){
            return (
                <li key={index}>{item}</li>
            );
        });// to be continued check out nest componenet

        return (
            <div className="container">            
               {this.state.openSetting ? <RaidFilter /> : null}
               <ul>{raidLists}</ul>               
               <SettingButton onClick={this.btnClicked.bind(this)} />
               <RaidFilteredList />
            </div>
        );
    }//render

    // Custom functions
    btnClicked() {
        alert("clicked");
        console.log("clicked");
        this.setState({
            openSetting: true
        });
    }
}

class RaidList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.items.map(function(item, index){                
                    return <li className="list-group-item" key={index}>{item.english}</li>
                })}
            </ul>
        );
    }//render
}

class RaidFilteredList extends React.Component {
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
            <div className="setting-container">
                <div className="filter-list">
                    <input type="text" placeholder="Search" onChange={this.filterList.bind(this)} />
                    <RaidList items={this.state.items} />
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