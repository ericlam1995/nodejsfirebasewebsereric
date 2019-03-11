const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const firebase = require('firebase');
const fs = require('fs');
const path = require('path');
const serviceAccount = require('./json/apitest-10c95-firebase-adminsdk-wj78o-a9a8664d78.json');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://apitest-10c95.firebaseio.com"
});

const db = admin.firestore();


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

var server = app.listen(3000, "127.0.0.1", function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/taxibookingrequest', function (req, res) {
    let taxicollectarray = [];
    let object = {};
    db.collection('taxibookingrequest').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            object = {id : doc.id, data: doc.data()}
            taxicollectarray.push(object);
        });
        res.json(taxicollectarray);
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
    
});

module.exports = app;