const React = require('react');

// Module requires
const RaidListItem = require('./raidListItem');

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

module.exports = RaidFilteredList;