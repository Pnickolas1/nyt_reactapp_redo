//include the main react dependencies
var React = require('react');
var ReactDom = require('react-dom');

//include the main component
var Main = require('./components/Main');

//this code here allows us to render our main component
ReactDom.render(<Main />, document.getElementById("app"));