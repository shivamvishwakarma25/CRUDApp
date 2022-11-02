var express = require('express');
var app = express();
var User = require('./models/indexx')
var mongoose = require('mongoose');
var bodyParser = require('body-parser') 
const HTTP = require('http')
const PORT = process.env.PORT ||3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Connecting to database
mongoose.connect(
  "mongodb://localhost:27017/",
  {
    dbName: "Shivam",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) =>
    err ? console.log(err) : console.log(
      "Connected to your database")
);


app.set('view engine','ejs');

app.post('/update/:id',function(req,res){
  User.findByIdAndUpdate(req.params.id,req.body);
 res.redirect('/show');
})

app.get('/edit/:id',function(req,res){
  User.findById(req.params.id,function(err,result){
    res.render('edit.ejs',{users: result});
  })
})

app.get('/delete/:id',function(req,res){
  User.findByIdAndDelete(req.params.id)
  res.redirect('/show')
 })

app.get('/show',function(req,res){
  User.find({},function(err,result){
    res.render('show.ejs',{users:result});

  })
})

app.get('/',function(req,res){
res.render('insert.ejs');
})

app.post('/insert',function(req,res){
var user = new User({
firstname:req.body.firstname,
lastname:req.body.lastname,
email:req.body.email,
city:req.body.city,
state:req.body.state
})



 user.save(()=>{
  res.redirect('/show');
 })

});

var server= app.listen(PORT,function(){
    console.log(`Go to Port number ${PORT}`);
});
