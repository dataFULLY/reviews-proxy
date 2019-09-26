/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const Axios = require('axios');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const compression = require('compression');

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/listings/:listings_id', express.static('public'));

app.get('/api/listings/:listing_id/reviews', (req, res) => {
  const listingID = req.params.listing_id;
  Axios.get(`http://ec2-54-67-117-197.us-west-1.compute.amazonaws.com:3210/api/listings/${listingID}/reviews`)
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

app.get('/api/listings/:listing_id/host', (req, res) => {
  const listingID = req.params.listing_id;
  Axios.get(`http://ec2-54-67-117-197.us-west-1.compute.amazonaws.com:3210/api/listings/${listingID}/host`)
    .then((results) => { res.status(200).send(results.data); })
    .catch((err) => console.error(err));
});

app.get('/api/listings/users/:user_id', (req, res) => {
  const userID = req.params.user_id;
  Axios.get(`http://ec2-54-67-117-197.us-west-1.compute.amazonaws.com:3210/api/listings/users/${userID}`)
    .then((results) => { res.status(200).send(results.data); })
    .catch((err) => console.error(err));
});

app.get('/api/listings/review/response/:response_id', (req, res) => {
  const responseID = req.params.response_id;
  Axios.get(`http://ec2-54-67-117-197.us-west-1.compute.amazonaws.com:3210/api/listings/review/response/${responseID}`)
    .then((results) => { res.status(200).send(results.data); })
    .catch((err) => console.error(err));
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
