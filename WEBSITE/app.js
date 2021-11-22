const express = require("express");
const path = require("path");
var mongoose = require("mongoose");
const { mainModule } = require("process");
const { json } = require("body-parser");
mongoose.connect("mongodb://localhost/27017", { useNewUrlParser: true, useUnifiedTopology: true })
const app = express();
const port = 80;


app.use('/static', express.static('static'))
app.use(express.urlencoded({ extended: true }))


app.set('view engine', 'pug')
app.set('static', path.join(__dirname, 'static'))
// ENDPOINTS



const loginSchema = new mongoose.Schema({
    name: String,
    password: String,
    remember: Boolean
})

const registerSchema = new mongoose.Schema({
    username: String,
    email: String,
    contact: Number,
    password: String,
    confirmPassword: String,
    contact1: String, 
    contact1number: Number, 
    contact2: String, 
    contact2number: Number
})


var details = mongoose.model('details', registerSchema);


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../WEBSITE/static/index.html'));
});

app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname, '../WEBSITE/static/home.html'));
});



app.get('/signup', function (req, res) {
    res.sendFile(path.join(__dirname, '../WEBSITE/static/signup.html'));
});

app.get('/signin', function (req, res) {
    res.sendFile(path.join(__dirname, '../WEBSITE/static/login.html'));
});

var myUsername = '';

app.post('/needHelp', (req, res) => {
    //    console.log(req.body);

    var c = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/test";

    var done = 0;

    c.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var s = db.db("27017");
        s.collection("details").find().toArray(function (err, result) {
            if (err) throw err;
            for (i = 0; i < result.length; i++) {
                if (result[i].username === req.body.username) {
                    myUsername = req.body.username;
                    if (result[i].password === req.body.password) {
                        // res.send(` <h1>Welcome! ${req.body.username} login Succesfull</h1>`);
                        res.sendFile(path.join(__dirname, '../WEBSITE/static/needHelp.html'));
                        done = 1;
                        break;

                    }
                }
            }
            if (done == 0) {
                res.send("Cannot login! <br> Incorrect Credentials")
            }


        });
    });
})


app.post('/sendingHelp', (req, res) => {
    res.sendFile(path.join(__dirname, '../WEBSITE/static/sendingHelp.html'));
})



app.post('/signup', function (req, res) {
    // console.log(req.body);
    var myData = new details(req.body);

    var c = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/test";

    var alreadyThere = 0;

    c.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var s = db.db("27017");
        s.collection("details").find().toArray(function (err, result) {
            if (err) throw err;

            for (i = 0; i < result.length; i++) {
                if (result[i].username === req.body.username) {
                    alreadyThere = 1;
                    console.log(alreadyThere)
                    break;

                }
            }
            if (alreadyThere == 1) {
                res.send("Username not available , Please try another Username")
            }
            else {
                if (req.body.password === req.body.confirmPassword) {

                    myData.save().then(() => {
                        res.send(`This item has been saved to the database           <form action="/signin" id="signin" method="get">
                        <button class="btn btn-primary" type="submit">Sign In</button>
                    </form> `)
                    }).catch(() => {
                        res.status(400).send("item was not saved to the databse")

                    })
                }
                else {
                    res.send("password and confirm password didnt matched")
                }

            };

        })
    });
});



// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
