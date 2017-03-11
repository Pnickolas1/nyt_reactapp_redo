var express = require("express");
var router = express.Router();

var article = require('./../models/articles.js')

//get the route that will be getting all the articles from the database
router.get('/api/saved', function (req,res) {
    articles.find({} , function (err, articles) {
        if (err) {
            console.log(err);
        } else {
            res.json(articles);
        }
    });
});

// POST route that will post a new document to the database
router.post('/api/saved', function (req, res) {
    var newArticle = new articles({
        title: req.body.title,
        date: req.date.title,
        url: req.url.url
    });

    //then you have to tell your app to save it to the DB
    newArticle.save(function (err,article) {
        if (err) {
            console.log(err)
        } else {
            res.json('pass');
        }
    });
});

//DELETE route that will delete document ref'd by objectid
router.delete('/api/saved/:id', function(req, res) {
    articles.findByIdAndRemove(req.params.id, function (err, article){
        if(err) {
            console.log(err)
        } else {
            res.json('pass')
        }
    });
});

// GET route that is the default route if the routes before it are not hit
router.get('*', function (req, res) {
    var dir = __dirname;
    var dirSplit = dir.split('controller');
    dir = dirSplit[0];

    res.sendFile(dir + 'public/assets/index.html');
});


// make this modules accesible to other files 
module.exports = router;