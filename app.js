const express = require('express');
const cors = require('cors')
const config = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

const port = config.PORT;

require('./router')(app);
require('./db');

app.listen(port, () => console.log(`listening on port ${port}`));