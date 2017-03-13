///inclue the main react dependency
var React = require("react");
var axios = require('axios');

//include the child compoents
var Form = require("./children/form");
var Results = require("./children/results");
var Saved = require("./children/savedarticles");


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
        };
    },
    componentDidMount: function () {
        axios.get("/api/saved").then(function (response) {
            if (response !== this.state.history) {
                this.setState({ history: response.data });
            }
        }.bind(this));
    },

//once the form is submitted this function is rang, queries NYT api
    componentDidUpdate: function () {
    if (this.state.topicSearched != "") {
        var queryString = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        var apiKey = '?api-key=46ba128fd7fe4d9bb083047938f7d947'
        var topic = '&q=' + this.state.topicSearched;
        var startYear=  '&begin_date=' + this.state.startYear.split('-').join('');
        var endYear = '&end_date=' + this.state.endYear.split('-').join('');

            var query = queryString + apiKey + topic + startYear + endYear;

            axios.get(query)
                .then(function (response) {
                        
                    this.setState({
                        topicSearched: "",
                        startYear: "",
                        endYear: ""
                    });

                    var queryResults = [];
                    for (var i = 0; i < 5; i++) {
                        var date = response.data.response.docs[i].pub_date.split('T');
                        date = date[0];
                        var articleObj = {
                            abstract: response.data.response.docs[i].abstract,
                            pub_date: date,
                            web_url: response.data.response.docs[i].web_url
                        }
                        queryResults.push(articleObj);
                    }

                    this.setState({ results: queryResults });
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
        } else { }
    },

    // Passed into form.js to be able to set the forms states.
    setTerm: function (topic, start, end) {
        this.setState({
            topicSearched: topic,
            startYear: start,
            endYear: end
        });
    },

    // Passed into results.js so the save article button clicked can be saved then
    // the results and history states are set again.
    setSave: function (index) {
        var currentResults = this.state.results;

        axios.post('/api/saved', this.state.results[index])
            .then(function (response) {
                var newResults = currentResults;
                var newResultsDel = newResults.splice(index, 1);
                this.setState({
                    results: newResults
                });

                axios.get("/api/saved").then(function (response) {
                    if (response !== this.state.history) {
                        this.setState({ history: response.data });
                    }
                }.bind(this));
            }.bind(this))
    },

    // Passed into saved_articles.js so the delete article button clicked can be deleted
    // then the history state is set.
    setDelete: function (id) {
        axios.delete('/api/saved/' + id)
            .then(function (response) {
                axios.get("/api/saved").then(function (response) {
                    if (response !== this.state.history) {
                        this.setState({ history: response.data });
                    }
                }.bind(this));
            }.bind(this))
    },

    // Here we render the function
    render: function () {
        return (
            <div>
                <Form setTerm={this.setTerm} />
                <Results articles={this.state.results} setSave={this.setSave} />
                <Saved savedArticles={this.state.history} setDelete={this.setDelete} />
            </div>
        );
    }
});

// Export the component back for use in other files
module.exports = Main;
