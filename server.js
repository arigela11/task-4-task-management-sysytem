const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express()
const cors= require("cors");
const config = require('config');
//body parser middleware
app.use(bodyParser.json())

const db = config.get('mongoURI')
mongoose.set('strictQuery', true)
//mongoose connectivity for localhost database
mongoose.connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        }) //
        .then(() => console.log("mongodb connected"))
        .catch(err => console.log(err));

app.use(cors({
                origin:"*"
}))
//use routes 
app.use('/api/items',  require('./routes/api/items'))
app.use('/api/users',  require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

const port = process.env.PORT || 3008

app.listen(port, () => console.log(`server started on port ${port}`))

