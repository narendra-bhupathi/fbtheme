const express = require('express');
const bodyparser = require('body-parser');
var cors = require('cors')
const app = express();
const mongoClient = require('mongodb');
const url ='mongodb://localhost:27017';
app.use(cors());
app.use(bodyparser.json());

const bcrypt = require('bcrypt');
const saltRounds = 10;



app.get('/',function(req,res){

mongoClient.connect(url,function(err,client){

    if(err) throw err;
    var db=client.db('fb');
    var userdata=db.collection('users').find().toArray();
    
    userdata.then(function(data){
        client.close();
        res.json(data);
    })
    .catch(function(err){
        client.close();
        res.status(500).json({
            message:'Error'
        });
    });

   
})

});


app.post('/users', function (req, res) {
    console.log(req.body);
    mongoClient.connect(url, (err, client) => {
        if (err) return console.log(err);
        var db = client.db("fb");

        const myPlaintextPassword = 's0/\/\P4$$w0rD';
        const someOtherPlaintextPassword = 'not_bacon';
        
         var newdata={
            email:req.body.email,
        }
        
        bcrypt.genSalt(saltRounds, function(err, salt) {

            if(err) throw err;
            bcrypt.hash(req.body.name,salt,function(err,hash){
                if(err) throw err;
                newdata.password=hash;

                db.collection('users').insertOne(newdata, (err, data) => {
                    if (err) throw err;
                    client.close();
                    res.json({
        
                        message:'data saved'
                    })
                })

            })
                
           
        });


        
    })
})


app.get('/register', function (req, res) {
    console.log(req.body);
    mongoClient.connect(url, (err, client) => {
        if (err) return console.log(err);
        var db = client.db("fb");
        db.collection('users').insertOne( req.body, (err, data) => {
            if (err) throw err;
            client.close();
            res.json({
                message:'data saved'
            })
        })
    })
})


app.post('/login', function (req, res) {
    

    mongoClient.connect(url,function(err,client){

        if(err) throw err;

        var db=client.db('fb');
        db.collection('users').findOne({email:req.body.email},function(err,d){

            if(err) throw err;
            bcrypt.compare(req.body.password,d.password,function(err,result){
                console.log(result);
            })
            
        })


    })


})



app.listen(3030, function(){console.log("Listening to PORT 3030")});