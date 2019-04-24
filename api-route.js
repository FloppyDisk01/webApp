var dataLayer = require('./dataLayer');
var bcrypt = require('bcrypt');
var saltRounds = 10;

var appRoute = function(app){
  app.get('/', function(req, res) {
      res.sendFile('./public/index.html');
  });

  //creation de l'utilisateur
  app.post('/createUser/', function(req, res){
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      var user = {
        userName : req.body.userName,
        password : hash,
      }
      dataLayer.getUser(req.body.userName, function(err, user){
        if(err) res.send(err);
        if(user){
          console.log("user deja existant");
        } else {
          dataLayer.createUser(user, function(err){
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
          if(check) res.send(true)
        });
      }
    });
  });

  //recupération de liste
  app.get('/api/getListSet', function(req, res) {
    dataLayer.getListSet(function(list){
      res.send(list);
      console.log("on a choppé la liste !");
    });
  });

  //création de list
  app.post('/api/createList', function(req, res) {
    data = {
      nomListe = req.body.name
      createur = req.body.auth
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

    }
    dataLayer.modifyList(req.body._id, data, function(err){
      if(err) res.send(err);
      dataLayer.getListSet(function(list){
        res.send(list);
      });
    });
  });

  //recupération de liste
  app.get('/api/getList', function(req, res) {
    dataLayer.getTaskSet(function(list){
      res.send(list);
      console.log("on a choppé la liste !");
    });
  });

  //création de tâche
  app.post('/api/createTask', function(req, res) {
    data = {
      text : req.body.text,
      author : req.body.auth,
      date : new Date(),
      done : false
    }
    dataLayer.addTask(data, function(err){
      if(err) res.send(err);
      dataLayer.getTaskSet(function(list){
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
    dataLayer.modifyTask(req.body._id, data, function(err){
      if(err) res.send(err);
      dataLayer.getTaskSet(function(list){
        res.send(list);
      });
    });
  });

  //suppression de tâche
  app.delete('/api/deleteTask/:liste_id', function(req, res) {
    dataLayer.deleteTask(req.params.liste_id, function(err){
      if(err) res.send(err);
      dataLayer.getTaskSet(function(list){
        res.send(list);
      });
    });
  });
};

module.exports = appRoute;
