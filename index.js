const express = require("express")
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(express.json());


const PORT = process.env.PORT || 8800
mongoose
.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => {
    console.log("Mongodb connected");
})
.catch((err) => { console.log(err)});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}


const userRoute = require('./routes/users')
// app.use('/api/users',userRoute)
app.use('/users',userRoute)

// load the router module for pins in the app
const pinRoute = require("./routes/pins");
// app.use("/api/pins", pinRoute);
app.use("/pins", pinRoute);


app.listen(PORT, console.log(` Backend Server is starting at ${PORT}`));


