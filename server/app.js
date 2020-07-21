const express = require('express');
const app =express()
const PORT=5000
const mongoose=require('mongoose');
const {MONGOURI}=require('./keys');
app.use(express.json())
require('./models/user')
require('./models/post')

mongoose.connect(MONGOURI,{
	useNewUrlParser: true,
	 useUnifiedTopology: true

})
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


mongoose.connection.on('connected',()=>{
	console.log("Connection to mongo")
})

mongoose.connection.on('error',(err)=>{
	console.log("Connection to mongo fail",err)
})

app.listen(PORT,()=>{
	console.log("Server Running",PORT)
})