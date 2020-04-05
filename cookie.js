var cookieParser = require('cookie-parser')
app.use(cookieParser())

app.get('/login', function(req, res, next) {
  var user = {name:'test'}; //!! find the user and check user from db then

    var token = jwt.sign(user, 'secret', {
            expiresInMinutes: 1440
          });

    res.cookie('auth',token);
    
    res.send('ok');

});

app.use(function(req, res, next) {

  var token = req.cookies.auth;

  // decode token
  if (token) {

    jwt.verify(token, 'secret', function(err, token_data) {
      if (err) {
         return res.status(403).send('Error');
      } else {
        req.user_data = token_data;
        next();
      }
    });

  } else {
    return res.status(403).send('No token');
  }
});