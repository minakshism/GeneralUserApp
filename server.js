const express = require("express");
const app = express();
const bodyParser =  require("body-parser");
const mongoose = require("mongoose");
const {dbConnect, port} = require("./config/db");
const router = require("./routes/index");

//db connect
mongoose.connect(dbConnect, { useNewUrlParser: true, useUnifiedTopology: true },  ()=>{
    console.log("DB connected");
});


//middleware
app.use(bodyParser.json());
app.use(router);

app.listen(port);