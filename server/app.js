// npm install q express --location=global
const express = require("express");
const books = require('./api/books')

const app = express();
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));	    // Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.json());							    // Parse JSON bodies (as sent by API clients)
app.use('/client', express.static("./client"));         // Register static resources
// app.use('/simulator', express.static("./simulator"));   // Register static resources

//  API logging
app.use("/api", (req, res, next) => {
    console.log("Request received at: ", new Date());
    console.log("...with request url: ", req.originalUrl);
    console.log("...with request body: ", req.body);
    next();
});

// Extractor API handler
app.use("/api/books", books)

// API response generator
app.use("/api", (req, res, next) => {
    //  If rval not set in request, it is assumed that the upstream routes have generated the response already
    if(req.rval)
        res.status(req.rval.statusCode).send(req.rval.body)
    console.log("Response sent at: ", new Date());
});

// API exception handler
app.use("/api", (err, req, res, next) => {
    console.log("Unhandled excpetion, sending 500!")
    console.error(err.stack)
    res.status(500).send({ error: err });
});

//  Main listen loop
app.listen(8080, () => {
    console.log(`Validator listening at http://localhost:8080`);
});