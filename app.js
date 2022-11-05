require('dotenv').config()
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const tasks = require('./routes/tasks');
const notFound=require('./middleware/not-found');
const errorHandlerMiddleware= require('./middleware/error-handler');
//middleware
app.use(express.static('./public'))
app.use(express.json())
app.use(errorHandlerMiddleware);

//routes
app.get('/hello',(req,res)=>{
    res.send("task manager app");
});

app.use('/api/v1/tasks',tasks)
app.use(notFound);


const port = process.env.PORT || 3000;

const start = async()=>{
   try{
    await connectDB(process.env.MONGO_URI)
    app.listen(port,()=>{
        console.log(`Server started on port ${port}`);
    })
   }catch(error){
    console.log(error);
   }
}
start()
