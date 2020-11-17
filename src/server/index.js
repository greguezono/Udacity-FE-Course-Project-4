const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
// API documentation = https://www.meaningcloud.com/developer/sentiment-analysis/doc
var apiKey = process.env.API_KEY;

const app = express()

app.use(express.static('dist'))

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
