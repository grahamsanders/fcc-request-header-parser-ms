var express = require('express');
var agent = require('useragent');
var app = express();
app.enable('trust proxy');

app.get('/', function(req, res) {
  
  var ip = req.ip;
  var language = req.acceptsLanguages();
  var software = agent.parse(req.headers['user-agent']);
  res.status(200);
  res.send({
    "ipaddress": ip,
    "language": language[0],
    "software": software.os.family
  });
});

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening on ' + process.env.PORT + '...');
});
