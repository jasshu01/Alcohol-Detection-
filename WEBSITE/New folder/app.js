const express = require("express");
const path = require("path");
var mongoose = require("mongoose");
const { mainModule } = require("process");
const { json } = require("body-parser");
mongoose.connect("mongodb://localhost/27017", { useNewUrlParser: true, useUnifiedTopology: true })
const app = express();
const port = 80;

var htmlHead = `<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">

    <style>
        
        .body {
            width: 80%;
            margin:4vh 14vw;
        }
        .card{
            margin: 5px;
        }
    </style>

    <title>Rent Kro</title>
</head>

<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
<div class="container-fluid">
    <a class="navbar-brand" href="/home">RentKro</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <a class="nav-link active" href="/home" aria-current="page">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="/showProperties" aria-current="page">Available Properties</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="/postMyProperty" aria-current="page">Post Property</a>
            </li>

            
            <li class="nav-item">
                        <a class="nav-link active" href="/myAccount" aria-current="page">My Account</a>
                    </li>

       
    </div>
</div>
</nav>



            
            
              
    <section>
        `;
var htmlFooter = `  
</section>




<!-- Optional JavaScript; choose one of the two! -->

<!-- Option 1: Bootstrap Bundle with Popper -->
<!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
    crossorigin="anonymous"></script> -->

<!-- <script src="index.js"></script> -->
<!-- Option 2: Separate Popper and Bootstrap JS -->
<!--
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js" integrity="sha384-SR1sx49pcuLnqZUnnPwx6FCym0wLsk5JZuNx2bPPENzswTNFaQU1RDvt3wT4gWFG" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.min.js" integrity="sha384-j0CNLUeiqtyaRmlzUHCPZ+Gy5fQu0dQ6eZ/xAww941Ai1SxSY+0EQqNXNE6DZiVc" crossorigin="anonymous"></script>
-->
</body>

</html>`;

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
    confirmpPssword: String
})

const PropertySchema = new mongoose.Schema({
    name: String,
    contact: Number,
    typeOfProperty: String,
    location: String,
    pincode: String,
    state: String,
    locationLink: String
})

var details = mongoose.model('details', registerSchema);
var Property = mongoose.model('Property', PropertySchema);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../New Folder/static/index.html'));
});

app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname, '../New Folder/static/home.html'));
});



app.get('/signup', function (req, res) {
    res.sendFile(path.join(__dirname, '../New Folder/static/signup.html'));
});

app.get('/signin', function (req, res) {
    res.sendFile(path.join(__dirname, '../New Folder/static/login.html'));
});

var myUsername;

app.post('/giveOnRent', (req, res) => {
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
                        res.sendFile(path.join(__dirname, '../New Folder/static/giveOnRent.html'));
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
                        res.send("This item has been saved to the database")
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



app.get('/postMyProperty', function (req, res) {
    res.sendFile(path.join(__dirname, '../New Folder/static/giveOnRent.html'));
});





app.post("/postMyProperty", function (req, res) {
    // console.log("adding")
    // res.send("Property Added POST");
    console.log(req.body);

    var myData = new Property(req.body);

    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("item was not saved to the databse")
    })


})




app.get('/showProperties', function (req, res) {

    var c = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/test";

    var done = 0;

    c.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var html = htmlHead;
        html += `<div class="body row">`;
        var s = db.db("27017");
        s.collection("properties").find().toArray(function (err, result) {
            if (err) throw err;
            for (i = 0; i < result.length; i++) {
                html += `<div class="card" style="width: 18rem;">
               <!-- <img class="card-img-top" src="..." alt="Card image cap"> -->
                <div class="card-body">
                    <h5 class="card-title">${result[i].typeOfProperty}</h5>
                    <p class="card-text">${result[i].location}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Owner: ${result[i].name}</li>
                    <li class="list-group-item">Mobile: ${result[i].contact}</li>
                    <li class="list-group-item">Pincode: ${result[i].pincode}</li>
                    <li class="list-group-item">State: ${result[i].state}</li>
                </ul>
                <div class="card-body">
                    <a href="${result[i].locationLink}" target="_blank" class="card-link">Location Link</a>
                   
                </div>
            </div>`;
            }
            html += `</div>`;
            html += htmlFooter;
            res.send(html);


        });
    });

    // res.sendFile(path.join(__dirname, '../New Folder/static/showProperties.html'));
});


myUsername = '19BCT0082';


app.get('/myAccount', function (req, res) {
    // res.send(myUsername);
    var html = ``;
    var c = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/test";
    c.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var s = db.db("27017");
        s.collection("properties").find().toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);
            html += htmlHead;
            html += ` <div id="body" style="width:80%;margin:auto" class="row" >   
            <div id="left" style="width:25%;margin:4vh 6vw" >
            <div class="card" style="width: 22rem;">
        
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Name: ${myUsername}</li>
                        <li class="list-group-item">Mobile: </li>
                        <li class="list-group-item">Pincode: </li>
                        </ul>
                        
                        </div>

                        <form action="/myAccount" style="margin-top:24px" method="POST">
                        <h3>Want To Remove Any of Your Property from Rental list?</h3>
                        <label for="locationLinkToDelete">Enter the Location Link to remove that Property from list</label> <br>
                        <input type="text" name="locationLinkToDelete" id="locationLinkToDelete">
                        <button class="btn btn-primary" style="margin:4px"  type="submit">Delete this Property</button>
                        </form>
                        </div>
    
                `
            html += `<div id="right" class="row" style="width:60%">`

            for (i = 0; i < result.length; i++) {
                // console.log(myUsername, result[i].name)
                if (myUsername === result[i].name) {
                    html += `
                    
                    <div class="card" style="width: 50%;margin:15px">
                <!--    <img class="card-img-top" src="..." alt="Card image cap"> -->
                    <div class="card-body">
                        <h5 class="card-title">${result[i].typeOfProperty}</h5>
                        <p class="card-text">${result[i].location}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Owner: ${result[i].name}</li>
                        <li class="list-group-item">Mobile: ${result[i].contact}</li>
                        <li class="list-group-item">Pincode: ${result[i].pincode}</li>
                        <li class="list-group-item">State: ${result[i].state}</li>
                        </ul>
                        <div class="card-body">
                        
                        <a href="${result[i].locationLink}" target="_blank" class="card-link">Location Link</a>
                    </div>
                </div>`;
                }


            }
            html += `</div></div>`;
            html += htmlFooter;
            res.send(html);

            // res.sendFile(path.join(__dirname, '../New Folder/static/giveOnRent.html'));
        });
    });
});


app.post("/myAccount", function (req, res) {
    // res.send("deleted")
    var c = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/test";

    c.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var s = db.db("27017");
        console.log(req.body.locationLinkToDelete)
        var myquery = { locationLink: req.body.locationLinkToDelete};
        s.collection("properties").deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            
            console.log("1 document deleted");
        });
    });
    res.status(204).send();


})


// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
