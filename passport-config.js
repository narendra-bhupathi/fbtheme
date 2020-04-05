const ls=require('passport-local').Strategy;



function initialize(passport){

    const authenticateUser=(email,passport,done)=>{

        const user=getUsernameByEmail(email)

        if(user==null){
            retunr done(null,false,{message:'no user with that name'})
        }

        try{

            if(await bcrypt.compare(passport,user.password)){

            }
            else{

                return done(null,false,{message:'password not valid'};)
            }
        }
        catch(e){
            return done(e)
        }
        
    }

    passport.use(new ls({username:'email'}),authenticateUser)

    passport.serializeUser((user,done)=>{ })
    passport.deserializeUser((id,done)=>{ })

}


module.exports=initialize;