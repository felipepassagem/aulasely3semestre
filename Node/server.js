const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors())
app.use(express.json())

//adiciona pasta publica
app.use(express.static("public"));

require('./src/Index')(app);
app.listen(3333);