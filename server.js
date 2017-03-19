import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const searchCache = {};

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



app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
})
