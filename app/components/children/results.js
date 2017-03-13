var React = require("react");

var Results = React.createClass({

    // Function is ran when a button is clicked in this component. Calls the setSave function
    // and passes in the index of what we want to manipulate.
    onClickSave: function (i) {
        this.props.setSave(i);
    },

    render: function () {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="panel panel-success">
                        <div className="panel-heading">Results</div>
                        <div id="results" className="panel-body">
                            {this.props.articles.map((search, i) => {
                                return (
                                    <div className="panel panel-default" key={i}>
                                        <div className="panel-heading">{search.web_url}<button className="pull-right btn btn-info" onClick={() => this.onClickSave(i)} id={i}>Save</button>
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