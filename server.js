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

app.get('/search/:user', (req, res) => {
  const user = req.params.user;
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

  res.json({
    username: user,
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
  res.json('ok')
})


app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
})
