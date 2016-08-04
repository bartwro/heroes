var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');//,
  //Article = mongoose.model('Article');

var heroSchema = mongoose.Schema({
    id: Number,
    name: String
});
var heroModel = mongoose.model('Hero', heroSchema);

module.exports = function (app) {
  app.use('/', router);
};


router
.get('/', function (req, res, next) {
    res.render('index', {
      title: 'Generator-Express MVC'
    });
});

router
.get('/api', function(req, res){//test this method..
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
