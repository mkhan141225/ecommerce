const express = require("express")
const morgan = require("morgan")
const colors=require("colors")
const dotenv = require("dotenv")
const connectDB = require("./database/db")
const authRoutes = require('./routes/authRouter')
const categoryRoutes = require('./routes/categoryRoutes')
const cors = require("cors")
const productRoutes = require('./routes/productRoutes')
const bodyParser = require("body-parser");
const path =require("path")

//config dotenv
dotenv.config()

//database config after env config 
connectDB()


//rest object
const app = express()
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '100000mb', extended: true}));

//middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.static(path.join(__dirname,'./client/build')))


//routes
app.use('/api/v1/auth',authRoutes)



app.use('/api/v1/category',categoryRoutes)

app.use('/api/v1/product',productRoutes)



//rest api
app.use('*',function(req,res){
res.sendFile(path.join(__dirname,'./client/build/index.html'))

})
// app.get('/',(req,res)=>{
//     res.send("<h1>welcome to E-comm app</h1>")
// })







const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`the server is running on ${PORT}` .bgCyan.white)
})
  