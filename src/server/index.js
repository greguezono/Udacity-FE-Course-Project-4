const dotenv = require('dotenv');
dotenv.config();
const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser');
const fetch = require("node-fetch")
// API documentation = https://www.meaningcloud.com/developer/sentiment-analysis/doc
const apiKey = process.env.API_KEY;

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

app.post('/reqApi', async function (req, res) {
    let data = req.body.data
    let path = getPath(apiKey, data)
    let apiRes = await fetch(path)
    try {
        let userData = await apiRes.json()
        res.send(JSON.stringify(userData))
    } catch (error) {
        console.log(error)
    }
})

function getPath(key, text) {
    return `http://api.meaningcloud.com/sentiment-2.1?key=${key}&lang=en&txt=${text}&model=general`
}