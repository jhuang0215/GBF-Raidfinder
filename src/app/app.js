const React = require('react');
const ReactDOM = require('react-DOM');

require('./css/app.css');

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
                <li>{item}</li>
            );
        });// to be continued check out nest componenet

        return (
            <div className="container">            
               {this.state.openSetting ? <RaidFilter /> : null}
               <ul>{raidLists}</ul>               
               <SettingButton onClick={this.bthClicked.bind(this)} />
            </div>
        );
    }//render

    // Custom functions
    bthClicked() {
        alert("clicked");
        console.log("clicked");
        this.setState({
            openSetting: true
        });
    }
}

class RaidFilter extends React.Component {
    render() {
        return (
            <div>

            </div>
        );
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