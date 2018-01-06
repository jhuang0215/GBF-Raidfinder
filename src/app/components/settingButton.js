const React = require('react');

// Create SettingButton component
class SettingButton extends React.Component {
    render() {
        return (
            <button className="setting-btn" onClick={this.props.onClick} >
            +
            </button>            
        );   
    }
}

module.exports = SettingButton;