const mongoose=require('mongoose')
const {MONGOURI}=require('../keys');
const {ObjectId}=mongoose.Schema.Types

mongoose.connect(MONGOURI,{
	useNewUrlParser: true,
	 useUnifiedTopology: false

})
const userSchema=new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	resetToken:String,
	expireToken:Date,
	pic:{
		type:String,
		default:"https://res.cloudinary.com/dbi42fgij/image/upload/v1594140489/default_nonzea.png"
	},
	followers:[{
		type:ObjectId,ref:'User'
	}],

	following:[{
		type:ObjectId,ref:'User'
	}]
},{
	timestamps:true
})
mongoose.model("User",userSchema)
// module.exports=userModel;