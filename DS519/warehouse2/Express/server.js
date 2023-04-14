const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port} .`);
});