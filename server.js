const express = require('express');
const cors = require('cors');
const path = require('path');
const unirest = require("unirest");
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get('/api/GetShipment/:shipperID', (req, res) => {
  const request = unirest("GET", "https://assi4-functions.azurewebsites.net/api/GetShipment/"+req.params.shipperID);
  request.headers({"x-functions-key": process.env.APIKEY });

  request.end(function (response) {
    if (response.error) throw new Error(response.error);


    res.json(response.body || {});
  });

});
app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port} .`);
});