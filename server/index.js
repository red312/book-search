const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require('./authRouter')
const PORT = process.env.PORT || 3000


const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.json())
app.use('/auth', authRouter)


async function start(){
    try {
        await mongoose.connect('mongodb+srv://roman:root@booksearch.wzrak.mongodb.net/book-search', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log('Server has been started', PORT);
        })
    }
    catch(e){
        console.log(e);
    }
}
start()
