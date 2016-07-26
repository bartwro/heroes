/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/mongoose/mongoose.d.ts" />

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var heroSchema = mongoose.Schema({
    id: Number,
    name: String
});
var heroModel = mongoose.model('Hero', heroSchema);

router
.route('/')
.get(function(req, res){
    return res.send('welcome to api!');
});

router.route('/heroes')
.get(function(req, res){
    heroModel.find(function(err, hero){
        if(err){
            return res.send(500, err);
        }
        return res.send(hero);
    });
})
.post(function(req, res){
    var hero = new heroModel();
    hero.name = req.body.name;
    
    hero.save(function(err, hero){
        if(err){
            return res.send(500, err);
        }
        return res.json(hero);
    });
});

router.route('/heroes/:id')
.put(function(req, res){
    heroModel.findById(req.params.id, function(err, hero){
        if(err)
            res.send(err);
        hero.name = req.body.name;

        hero.save(function(err, hero){
            if(err)
                res.send(err);
            res.json(hero);
        });
    });
})
.get(function(req, res){
    heroModel.findById(req.params.id, function(err, hero){
        if(err)
            res.send(err);
        else
            res.json(hero);
    });
})
.delete(function(req, res){
    heroModel.remove({
        _id: req.params.id
    }, function(err){
        if(err)
            res.send(err);
        res.json("deleted: " + req.params.id);
    });
});

module.exports = router;