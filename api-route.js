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
          if(check){
            res.send(true);
          }
        });
      }
    });
  });

  //recupération de liste
  app.get('/api/getList/:userName', function(req, res) {
    userId = req.params.userName;
    dataLayer.getListSet(userId, function(list){
      res.send(list);
    });
  });

  //création de liste
  app.post('/api/createList/:userName', function(req, res) {
    data = {
      nomListe : req.body.name,
      user : req.params.userName
    }
    dataLayer.addList(data, function(err){
      if(err) res.send(err);
      dataLayer.getListSet(data.user, function(list){
        res.send(list);
      });
    });
  });

  //modification de Liste
  app.put('/api/modifyList', function(req, res) {
    data = {
      nomListe : req.body.nomListe,
    }
    userName = req.body.user;
    dataLayer.modifyList(req.body._id, data, function(err){
      if(err) res.send(err);
      dataLayer.getListSet(userName, function(list){
        res.send(list);
      });
    });
  });

  //suppression de liste
  app.delete('/api/deleteList/:user/:list_id', function(req, res) {
    userName = req.params.user;
    dataLayer.deleteList(req.params.list_id, function(err){
      dataLayer.deleteTaskList(req.params.list_id, function(err){
        if(err) res.send(err);
          dataLayer.getListSet(userName, function(list){
            res.send(list);
          });
        });
      });
  });

  //recupération de taches
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
