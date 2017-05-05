const express = require('express');
const app = express();

const users = {};
users[process.env.WEB_USER] = process.env.WEB_PASSWORD;

const basicAuth = require('express-basic-auth');
app.use(basicAuth({ users, challenge: true }));

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const port = process.env.PORT || 5000;
app.listen(port, () => { console.info(`listening on ${port}`) });
