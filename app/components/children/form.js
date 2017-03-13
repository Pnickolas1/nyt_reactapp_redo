var React = require('react');

//creating the form component of the app
var Form = React.createClass({
    getInitialState: function() {
        return{
            topicSearched: "",
            startYear: "",
            endYear: ""
        };
    },

    //the function below is called when the inut in the topic field is changed or updated
    // the topic state is set
    handleTopicChange: function(event){
        this.setState({
            topicSearched: event.target.value
        });
    },

    //this function is called when the input in start year field is changed
    handleStartChange: function (event) {
        this.setState({
            startYear: event.target.value
        });
    },


    //function to handle the change year in form
    handleEndChange: function(event) {
        this.setState({
            endYear: event.target.value
        });
    },

    //this functoin is called when the submit button is clicked, sets the state of topic
    // end and start year in main.js
    handleSubmit: function(event) {
        //prevent the HTML from trying to submit a form isf the new user hits enter
        event.preventDefault();
        //set the parent to have the terms
        this.props.setTerm(this.state.topicSearched, this.state.startYear, this.state.endYear);
        this.setState({
            topicSearched : "",
            startYear: "",
            endYear: ""
        });
     },
     render: function () {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="panel panel-info">
                        <div className="panel-heading">Search</div>
                        <div className="panel-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="topic">Topic:</label>
                                    <input value={this.state.topicSearched} onChange={this.handleTopicChange} required type="text" className="form-control" id="topic" placeholder="Keyword" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="start-year">Start Year:</label>
                                    <input value={this.state.startYear} onChange={this.handleStartChange} required type="date" data-date-format="YYYY-MM-DD" className="form-control" id="start-year" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="end-year">End Year:</label>
                                    <input value={this.state.endYear} onChange={this.handleEndChange} required type="date" data-date-format="YYYY-MM-DD" className="form-control" id="end-year" />
                                </div>
                                <button id="submit" type="submit" className="btn btn-default">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>)
    }
});


// make this module accessible to other folders 
module.exports = Form;