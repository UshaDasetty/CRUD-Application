const express = require('express');
const dotenv = require('dotenv'); 
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require ('path');
const connectDB = require('./server/dataBase/connection')

const app = express();


dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

// log request
app.use(morgan('tiny'));

//mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))


// set view engine
app.set("view engine", "ejs")    // ejs -> Embedded JavaScript Templating
//app.set('/views', path.resolve(__dirname, "views/ejs"))   // if ejs files are having in ejs folder which is insided the Views folder


// load Assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))


// load routers
app.use('/',require('./server/routes/router'))

app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

