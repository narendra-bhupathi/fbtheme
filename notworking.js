
app.get('/register',function(req,res){

    mongoClient.connect(url,function(err,client){

        if(err) throw err;
        var db=client.db("fb");
        db.collection('users').insertOne(req.body, (err, data) => {
            if(err) throw err;
            res.json({
                message:'user successfully created'
            });
        });

    });

});