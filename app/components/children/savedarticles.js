var React = require("react");

var Saved = React.createClass({

    // // Function is ran when a button is clicked in this component. Calls the setDelete function
    // and passes in the index of what we want to manipulate.
    onClickDelete: function (id) {
        this.props.setDelete(id);
    },

    render: function () {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="panel panel-warning">
                        <div className="panel-heading">Saved Articles</div>
                        <div id="saved-articles" className="panel-body">
                            {this.props.savedArticles.map((search, i) => {
                                return (
                                    <div className="panel panel-default" key={i}>
                                        <div className="panel-heading">{search.url}<button className="pull-right btn btn-info" onClick={() => this.onClickDelete(search._id)} id={search._id}>Delete</button>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="panel-body">
                                            <p>{search.title} <br />Date: {search.date}</p>
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
module.exports = Saved;