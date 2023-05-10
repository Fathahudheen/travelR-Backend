const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors({
    origin:'*'
}));


const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/crud-file-upload");

const postRoute = require('./routes/Postroute');
app.use('/api',postRoute);

app.listen(8000,() => {
    console.log('Server is running');
});