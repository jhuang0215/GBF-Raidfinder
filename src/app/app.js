const React = require('react');
const ReactDOM = require('react-DOM');

// Creat component 
class RaidFinderComponenet extends React.Component {
    render() {
        return (
            <h1>Helloooooooo</h1>
        );
    }
}

// Put component into html page
ReactDOM.render(<RaidFinderComponenet />, document.getElementById('raidfinder-wrapper'));