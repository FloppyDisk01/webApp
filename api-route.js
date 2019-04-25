var dataLayer = require('./dataLayer');
var bcrypt = require('bcrypt');
var saltRounds = 10;

ObjectId = require('mongodb').ObjectID;

var appRoute = function(app){
  app.get('/', function(req, res) {
      res.sendFile('./public/index.html');
  });

  //creation de l'utilisateur
  app.post('/createUser/', function(req, res){
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      var userToCreate = {
        userName : req.body.userName,
        password : hash,
      }
      dataLayer.getUser(req.body.userName, function(err, user){
        if(err) res.send(err);
        if(user){
          console.log("user deja existant");
        } else {
          dataLayer.createUser(userToCreate, function(err){
            if(err) res.send(err);
          });
        }
      });
    });
  });

  //connexion de l'utilisateur
  app.post('/login/', function(req, res){
    dataLayer.getUser(req.body.userName, function(err, user){
      if(err) res.send(err);
      if(user){
        bcrypt.compare(req.body.password, user.password, function(err, check) {
          console.log(check);
          if(check){
            res.send(true);
            console.log('good id bro');
          }
        });
      }
    });
  });

  //recupération de liste
  app.get('/api/getList', function(req, res) {
    dataLayer.getListSet(function(list){
      res.send(list);
    });
  });

  //création de liste
  app.post('/api/createList', function(req, res) {
    data = {
      nomListe : req.body.name,
      createur : req.body.auth
    }
    dataLayer.addList(data, function(err){
      if(err) res.send(err);
      dataLayer.getListSet(function(list){
        res.send(list);
      });
    });
  });

  //modification de Liste
  app.put('/api/modifyList', function(req, res) {
    data = {
      nomListe : req.body.name,
      createur : req.body.auth
    }
    dataLayer.modifyList(req.body._id, data, function(err){
      if(err) res.send(err);
      dataLayer.getListSet(function(list){
        res.send(list);
      });
    });
  });

  //recupération de liste
  app.post('/api/getTask/:list_id', function(req, res) {
    parent = new ObjectId(req.params.list_id);
    dataLayer.getTaskSet(parent, function(list){
      res.send(list);
    });
  });

  //création de tâche
  app.post('/api/createTask/', function(req, res) {
    data = {
      text : req.body.text,
      author : req.body.auth,
      date : new Date(),
      done : false,
      parent : new ObjectId(req.body.parent)
    }
    dataLayer.addTask(data, function(err){
      if(err) res.send(err);
      dataLayer.getTaskSet(data.parent,function(list){
        res.send(list);
      });
    });
  });

  //modification de tâche
  app.put('/api/modifyTask', function(req, res) {
    data = {
      text : req.body.text,
      author : req.body.author,
      date : new Date(),
    }
    parent = new ObjectId(req.body.parent);
    dataLayer.modifyTask(req.body._id, data, function(err){
      if(err) res.send(err);
      dataLayer.getTaskSet(parent, function(list){
        res.send(list);
      });
    });
  });

  //suppression de tâche
  app.delete('/api/deleteTask/:list_id/:task_id', function(req, res) {
    parent = new ObjectId(req.params.list_id);
    dataLayer.deleteTask(req.params.task_id, function(err){
      if(err) res.send(err);
      dataLayer.getTaskSet(parent, function(list){
        res.send(list);
      });
    });
  });
};

module.exports = appRoute;
