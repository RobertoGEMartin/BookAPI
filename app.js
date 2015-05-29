/**
 * Created by Rober on 28/05/15.
 */
var express = require('express'),
    mongoose = require('mongoose');

var dbConnection = mongoose.connection;
var db = mongoose.connect('mongodb://localhost/bookAPI');
dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', function (callback) {
    // yay!
    console.log('connected to : mongodb://localhost/bookAPI');
});

var Book = require('./models/bookModel')
insertData();
var app = express();
var port = process.env.PORT || 3000;

var bookRouter = express.Router();
bookRouter.route('/Books')
    .get(function(req,res){

        var query = {};

        if(req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, function(err,books){
            if(err)
                res.status(500).send(err);
            else
                res.json(books);
        });
    });

bookRouter.route('/Books/:bookId')
    .get(function(req,res){


        Book.findById(req.params.bookId, function(err,book){
            if(err)
                res.status(500).send(err);
            else
                res.json(book);
        });
    });

app.use('/api',bookRouter);

app.get('/',function(req,res){
    res.send('Welcome Bob to my RESTful API¡¡');

});

app.listen(port,function(){
    console.log('Gulp is running my app on PORT: ' + port);
});


//DB
function insertData(){
    var book1 = new Book({title: "La conjura de los necios",
        author: "Jonh Kenndy Toole",
        genre: "Novela Contemporanea"
    })
    book1.save(function (err) {
        if (err) {
            return err;
        }
        else {
            console.log("Book saved");
        }
    });
};