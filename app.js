const express = require('express');
const cors = require('cors')
const path = require('path');
const config = require('./config');

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, './public')));


const port = config.PORT;

require('./router')(app);
require('./db');

app.listen(port, () => console.log(`listening on port ${port}`));