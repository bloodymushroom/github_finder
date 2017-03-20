var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')

const searchCache = {};
const commitCache = {};

const app = express();
const port = process.env.PORT || 3000;

// cors + bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use('/', express.static('dist'))

app.post('/search', (req, res) => {
  const user = req.body.username;
  let isFound = false;

  if (searchCache[user]) {
    isFound = true;
    searchCache[user]++;

  } else {
    searchCache[user] = 1;
  }

  setTimeout(() => {
    searchCache[user]--;
  }, 120000)

  console.log('searched')

  res.json({
    username: req.body.username,
    wasSearched: isFound,
    timesSearched: searchCache[user]
  })
})

app.get('/commits/:user', (req, res) => {
  var user = req.params.user;
  if (commitCache[user]) {
    res.json(commitCache[user])
  } else {
    res.status(400).json('no commits');
  }
})

app.post('/commits/:user', (req, res) => {
  commitCache[req.params.user] = req.body.commits;
  console.log('saved commits', req.body.commits)
  res.json('ok')
})

app.get('/login', (req, res) => {
  res.redirect('https://github.com/login/oauth/authorize');
  fetch('https://github.com/login/oauth/authorize', {
    method: 'get'
  })
  .then( res => res.json())
  .then( res => {
    console.log('responded')
    res.redirect('/')
  })
})


app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
})
