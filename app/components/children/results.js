var React = require('react');

var Results = React.createClass({

    //function is ran when a button is click in the comp. 
    // calls the setSave function
    // passes in the index of what we want to manipulate

    onClickSave: function () {
        this.props.setSave(i);
    },

    render: function() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="panel panel-success">
                        <div className="panel-heading">Results</div>
                        <div id="results" className="panel-body">
                            {this.props.articles.map((search,  i) => {
                                return (
                                    <div className="panel panel-default" key={1}>
                                        <div className="panel panel-heading">{search.web.url}<button className="pull-right btn btn-info" onClick={() => this.onClickSave(i)} id={i}>Save</button> 
                                            <div className="clearfix"></div> 
                                        </div> 
                                        <div className="panel-body">
                                            <p>{search.abstract} <br />Date: {search.pub_date}</p>
                                            <hr />
                                        </div>
                                    </div>            
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = Results;