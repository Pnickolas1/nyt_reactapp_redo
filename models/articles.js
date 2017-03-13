var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema for an article.
var articlesSchema = new Schema({
    title: String,
    date: String,
    url: String,
});

var articles = mongoose.model('Articles', articlesSchema);

module.exports = articles;