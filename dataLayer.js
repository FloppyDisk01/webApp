const MongoClient = require('mongodb').MongoClient;
var mongodb= require('mongodb');
ObjectId = require('mongodb').ObjectID;
const uri = "mongodb+srv://floppy_disk:Dust1144@tododb-x07am.gcp.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var db;
var dbName = "AppListe";
var taskCol = "tache";
var userCol = "utilisateur";

var dataLayer = {
    init : function(cb) { // on passe une fonction -> callback
        client.connect(function(err) {
            if(err) throw err;
            console.log("Connected to DB");
            db = client.db(dbName);
            cb();
        });
    },

    createUser: function(user,cb){
      console.log('est ce que ce truc sert a qqch ?');
      db.collection(userCol).insertOne(user, function(err){
        if(err) throw err;
        cb();
      });
    },

    getUser: function(userName,cb){
      console.log('on cherche si '+userName+' existe');
      db.collection(userCol).findOne({userName},function(err, res){
        if(err) throw err;
        cb(err, res);
      });
    },

    getTaskSet : function(cb){
      //on recupère tous les elements de la collection
      db.collection(taskCol).find({}).toArray(function(err, list){
        if(err) throw err;
        cb(list);
      });
    },

    addTask : function(task, cb){
      //on ajoute une tache
      db.collection(taskCol).insertOne(task, function(err){
        if(err) throw err;
        cb();
      });
    },

    deleteTask : function(id, cb){
      //on supprime une tache
      var thisId = {
        _id : new ObjectId(id)
      }
      db.collection(taskCol).deleteOne(thisId, function(err){
        if(err) throw err;
        cb();
      });
    },

    modifyTask : function(id, data, cb){
      var thisId = {
        _id : new ObjectId(id)
      }
      db.collection(taskCol).updateOne(thisId, {$set : data}, function(err){
        if(err) throw err;
        cb();
      });
    }

}

module.exports = dataLayer;
