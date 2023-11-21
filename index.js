const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const aspiranteRouters = require('./src/routes/aspiranteRoute');
const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use('/api/', aspiranteRouters);

// mongodb connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlass'))
    .catch((error) => console.error(error));

app.listen(port, () => console.log('Server listening on port',port));