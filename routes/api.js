/// <reference path="../typings/express/express.d.ts" />
var express = require('express');
var router = express.Router();

router
.route('/')
.get(function(req, res){
    return res.send('hello world!');
})

module.exports = router;