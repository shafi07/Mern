const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path')
const routes = require('./routes')
const app = express();



const PORT = process.env.PORT || 8000;

if (process.env.NOODE_ENV !== "production") {
	require("dotenv").config();
}

app.use(cors());
app.use(express.json());

//connecting to mongodb

try {
	mongoose.connect(process.env.MONGO_DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log("mongodb Connected");
} catch (error) {
	console.log(error);
}

app.use('/files',express.static(path.resolve(__dirname,'..','files')))
app.use(routes)

app.listen(PORT, () => {
	console.log(`App linstening on ${PORT}`); 
});
