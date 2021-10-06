const express = require('express');
const config = require('./config');

const app = express();
const port = config.PORT;

require('./router')(app);
require('./db');

app.listen(port, () => console.log(`listening on port ${port}`));