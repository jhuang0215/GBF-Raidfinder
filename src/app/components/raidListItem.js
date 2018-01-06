const React = require('react');

class RaidListItem extends React.Component {
    render() {
        return (
            <li className="list-group-item" onClick={()=>{this.props.onAdd(this.props.raidData)}}>
                {this.props.raidData.english}  
            </li>
        );
    }//render
}

module.exports = RaidListItem;