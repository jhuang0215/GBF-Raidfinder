const React = require('react');

const raidConfig = require('./../../../raids.json');

// Module requires
const RaidFilteredList = require('./raidFilteredList');

// Create RaidMenu component
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

module.exports = RaidMenu;