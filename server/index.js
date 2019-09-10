const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');

app.use(compression());
app.use('/listings/:listing_id', express.static('./public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))