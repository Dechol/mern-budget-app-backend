//imports
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

//locals
const transRoutes = require('./routes/trans')
const userRoutes = require('./routes/user')

//app
const app = express()

//middleware
app.use(cors(
    {
        origin:'https://budgetfrontend.onrender.com',
    }
))

app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path , req.method)
    next()
})

//routes
app.use('/trans' ,transRoutes)
app.use('/user', userRoutes )

//connect & listen to requests
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('connected to MongoDB and listening to port', process.env.PORT)
    })
})
.catch(err => console.log(err))