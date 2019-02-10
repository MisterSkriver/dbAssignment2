const express = require('express');
var mongoose = require('mongoose');
var post = require('./model/post')
var bodyParser= require('body-parser')

const app = express();
const port = 3000;
var db = mongoose.connection;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/TwitterDB',{ useNewUrlParser: true });

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Ane we are live!');
});

app.get('/', (req, res) => res.send('And here we... Go!'))

// This gives the amount of Twitter users in the Database
app.get('/usercount',function(req,res){
    post.distinct('user').exec(function(err,users){
      if(err){
        res.status(500).send("Error: " + err.name)
      } else {
        res.send("There are " + users.length +" unique users in the database (out of 1600000 documents)")
      }
    }
    )
})

// This gives the ten users that link the most to other users.
app.get('/mostlinks', function(req,res){
    post.aggregate([
    {'$match':{'text':{'$regex':/@\w+/}}},{'$addFields': {"mentions":1}},{'$group':{"_id":"$user", "mentions":{'$sum':1}}},{'$sort':{"mentions":-1}}]).
    limit(10).allowDiskUse(true).exec(function(err,result){
      if(err){
        res.status(500).send("Error: " + err.name)
      } else {
        res.status(200).send(result);
      }
    })
})
  
// This shows the five most mentioned Twitter users.
app.get('/mostmentioned', function(req,res){
    post.aggregate([
        {'$addFields': {'words':{'$split':['$text', ' ']}}},{'$unwind':"$words"}, {'$match':{'words':{'$regex':"@\w+",'$options':'m'}}}, {'$group':{'_id':"$words",'total':{'$sum':1}}},{'$sort':{'total':-1}} ]).
    limit(5).allowDiskUse(true).exec(function(err,result){
      if(err){
        res.status(500).send("Error: " + err.name)
      } else {
        res.status(200).send(result);
      }
    })
})

// This shows the ten most active Twitter users.
app.get('/mostactive', function(req,res){
    post.aggregate([
        {'$group':{_id:"$user",count:{$sum:1}}},{$sort:{count:-1}}
    ]).limit(10).allowDiskUse(true).exec(function(err,result){
      if(err){
        res.status(500).send("Error: " + err.name)
      } else {
        res.status(200).send(result);
      }
    })
})

// This shows the five most grumpy (negative tweets).
app.get('/mostnegative', function(req,res){
    post.aggregate([
        {'$group':{'_id':"$user", 'emotion': {'$avg': "$polarity"}, 'total_grumpy_tweets': {'$sum': 1}}},{'$sort':{ 'emotion': 1, 'total_grumpy_tweets':-1}}
    ]).limit(5).allowDiskUse(true).exec(function(err,result){
      if(err){
        res.status(500).send("Error: " + err.name)
      } else {
        res.status(200).send(result);
      }
    })
})
// And this shows the five most happy(positive).
app.get('/mostpositive', function(req,res){
    post.aggregate([
        {'$group':{'_id':"$user", 'emotion': {'$avg': "$polarity"}, 'total_happy_tweets': {'$sum': 1}}},{'$sort':{ 'emotion': -1, 'total_happy_tweets':-1}}
    ]).limit(5).allowDiskUse(true).exec(function(err,result){
      if(err){
        res.status(500).send("Error: " + err.name)
      } else {
        res.status(200).send(result);
      }
    })
})

app.listen(port, () => console.log(`Server is listening on port ${port}!`))