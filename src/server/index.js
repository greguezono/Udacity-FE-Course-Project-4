const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser');
// API documentation = https://www.meaningcloud.com/developer/sentiment-analysis/doc
var apiKey = process.env.API_KEY;

const app = express()

app.use(express.static('dist'))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8082, function () {
    console.log('Example app listening on port 8082!. API key is ' + apiKey)
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

var userData = {}

app.post('/reqApi', async function (req, res) {
    var data = req.body.data
    var https = require('follow-redirects').https;
    var fs = require('fs');

    var options = {
    'method': 'POST',
    'hostname': 'api.meaningcloud.com',
    'path': getPath(apiKey, data),
    'headers': {
    },
    'maxRedirects': 20
    };

    var req = https.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
        chunks.push(chunk);
        });

        res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        userData = body.toString()
        console.log(userData)
        return body;
        });

        res.on("error", function (error) {
        console.error(error);
        });
    });

    req.end();
})

function getPath(key, text) {
    return `/sentiment-2.1?key=${key}&lang=en&txt=${text}&model=general`
}

app.get('/getUserData', function(req, res) {
    res.send(userData)
})