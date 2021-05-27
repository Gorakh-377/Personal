const mongoose =require('mongoose')

const db=process.env.Data;

mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=>{
    console.log("connection succesfully")
}).catch(()=>{
    console.log("error")
})