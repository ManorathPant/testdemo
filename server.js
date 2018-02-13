const express=require('express');
const http=require('http');
const path=require('path');
const mongoose   = require("mongoose");
const bodyParser=require('body-parser');
var jwt= require("jsonwebtoken");

const app=express();

var dbUrl='mongodb://<manorathpant>:<Sanjeev@7>@ds235418.mlab.com:35418/dbtournpackages';

mongoose.connect(dbUrl, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
  });

var Schema=mongoose.Schema;
 
var UserSchema = new Schema({
    email: String,
    password: String,
    token: String
});
module.exports = mongoose.model('User', UserSchema);

var _m=new User();
_m.email="manorath";
_m.password="asdadad";
_m.token="asdasd";
_m.save(function(err){
    if(err){
        console.log({info:'error during user create'});
    }
    console.log({info:'user is created successfully'});
});
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
//     next();
// });

// //Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'dist')));

app.post('/user',function(req,res){
    var newUser=new User(req.body);
    newUser.save(function(err){
        if(err){
            res.json({info:'error during user create'});
        }
        
        res.json({info:'user is created successfully'});
    });
});

// app.post('/authenticate', function(req, res) {
//     User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
//         if (err) {
//             res.json({
//                 type: false,
//                 data: "Error occured: " + err
//             });
//         } else {
//             if (user) {
//                res.json({
//                     type: true,
//                     data: user,
//                     token: user.token
//                 }); 
//             } else {
//                 res.json({
//                     type: false,
//                     data: "Incorrect email/password"
//                 });    
//             }
//         }
//     });
// });


app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/index.html'));
});

const port=process.env.PORT || '8080';

app.set('port',port);

const server= http.createServer(app);
server.listen(port,()=>console.log('Running on :-'+port));


