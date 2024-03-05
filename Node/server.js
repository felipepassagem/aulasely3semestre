const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors())
app.use(express.json())

require('./src/Index')(app);
app.listen(3333);