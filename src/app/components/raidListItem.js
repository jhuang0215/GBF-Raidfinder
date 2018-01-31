const React = require('react');

class RaidListItem extends React.Component {
    render() {
        return (
            <li className="list-group-item" onClick={()=>{this.props.onAdd(this.props.raidData)}}>
                <div className="image">
                    <img src={this.props.raidData.image} />
                </div>
                <div className="content">
                    {this.props.raidData.english}
                </div>                
            </li>
        );
    }//render
}

module.exports = RaidListItem;