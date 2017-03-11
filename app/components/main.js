///inclue the main react dependency
var React = require("react");
var axios = require('axios');

//include the child compoents
var Form = require("./children/form");
var Results = require("./children/Results");
var Saved = require("./children/savedarticle");


//creating the main component
var Main = React.createClass({
    //sets the initial state of the component
    getInitialState: function() {
        return {
            topicSearched: "",
            startYear: "",
            endYear:"",
            results: [],
            history: []
        }:
    },

    componentDidMount: function() {
        axios.get('/api/saved').then(function (response ){
            if (response !== this.state.history) {
                this.setState({ history: response.data});
            }
        }.bind(this));
    },

//once the form is submitted this function is rang, queries NYT api
componentDidUpdate: function () {
    if (this.state.topicSearched != "") {
        var queryString = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        var apiKey = '?api-key=46ba128fd7fe4d9bb083047938f7d947';
        var topic = '&q=' + this.state.topicSearched;
        var startYear=  '&begin_date=' + this.state.startYear.split('-').join('');
        var endYear = '&end_date=' + this.state.endYear.split('-').join('');

        var query = queryString + apiKey + topic + startYear + endYear;
    }
}





})