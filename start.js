require('dotenv').config();
const app = require('./app');

app.set('port', process.env.PORT || 3000);
app.set('address', process.env.BACKEND_URL);

var server = app.listen(app.get('port'), app.get('address'), function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('running at http://' + host + ':' + port);
});
