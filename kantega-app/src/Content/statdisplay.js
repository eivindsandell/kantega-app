var React = require('react');

var Statdisplay = React.createClass({
  getInitialState: function () {
  return { kommune: ''} 
  },
  
  
  render: function () {
    return (
      <h1> Du har skrevet inm kommune: {this.props.kommune} med nummer: {this.props.nummer}</h1>
    );
  }
});

export default Statdisplay