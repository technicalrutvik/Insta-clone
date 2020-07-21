const express=require('express');
const router=express.Router()
const mongoose=require('mongoose')
const {JWT_SECRET}=require('../keys');
const bcrypt= require('bcryptjs')
const User =mongoose.model("User")
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer')
const crypto=require('crypto')
let transport=nodemailer.createTransport({
	service:'gmail',
	auth:{
		user:'rutvikghori25@gmail.com',
		pass:'KivtuR$12'
	}
})
// mongoose.connect(MONGOURI,{
// 	useNewUrlParser: true,
// 	 useUnifiedTopology: true

// })
const requiredLogin=require('../Middleware/requiredLogin')

// router.get('/protected',requiredLogin,(req,res)=>{
// 	res.send("hello")
// })


router.post('/signup',(req,res)=>{
	// console.log(req.body)
	const{name,email,password,pic}=req.body
	if(!email || !name || !password){
		return res.json({error:"please add all record"})
	}
	User.findOne({email:email})
	.then((saveduser)=>{
		if(saveduser){
		return res.json({error:"email already exist"})
		}
		bcrypt.hash(password,12)
		.then(hashpassword=>{
				const user=new User({
					email,
					password:hashpassword,
					name,
					pic
				})
				user.save()
				.then(user=>{
					transport.sendMail({
						to:user.email,
						from:'no-reply@insta.com',
						subject:'signup success',
						html:'<h1>welcome to instagram</h1>'
					})
					res.json({message:"saved Successfuly"})
				})
				.catch(err=>{console.log(err)})
				})
		
	})
	.catch(err=>{console.log(err)})
})

router.post('/signin',(req,res)=>{
	const {email,password}=req.body
	if(!email || !password){
		return res.status(422).json({error:"Please add email or password"})
	}
	User.findOne({email:email})
	.then(saveduser=>{
		if(!saveduser){
			return res.status(422).json({error:"Invalid Email or Password"})
		}
		bcrypt.compare(password,saveduser.password)
		.then(doMatch=>{
			if(doMatch){
				// res.json({message:"Successfuly signin"})
				const token=jwt.sign({_id:saveduser._id},JWT_SECRET)
				const{_id,name,email,followers,following,pic}=saveduser
				res.json({token,user:{_id,name,email,followers,following,pic}})
			}
			else{
				return res.status(422).json({error:"Invalid Email or Password"})
			}
		})
		.catch(err=>{console.log(err)})
	})
	.catch(err=>{console.log(err)})
})


router.post('/reset-password',(req,res)=>{
	crypto.randomBytes(32,(err,buffer)=>{
		if(err){
			console.log(err)
		}
		const token=buffer.toString('hex')
		User.findOne({email:req.body.email})
		.then(user=>{
			if(!user){
				return res.status(422).json({error:"User don't exist that email"})
			}
			user.resetToken=token
			user.expireToken=Date.now()+366660
			user.save().then((result)=>{
				transport.sendMail({
				to:user.email,
				from:'noreply@insta.com',
				subject:'password reset',
				html:`
				<p>You requested for password reset</p>
				 <h5>click in this <a href='http://localhost:3000/reset/${token}'>link</a> to reset password</h5>`
			})
				res.json({message:'check your mail'})
			}) }) 
		})
	 })

router.post('/new-password',(req,res)=>{
	const newpassword=req.body.password
	const sentToken=req.body.token
	User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
	.then(user=>{
		console.log(user)
		if(!user){
			return res.status(422).json({error:'Try again,session expired!'})
		}
		bcrypt.hash(newpassword,12).then(hashpassword=>{
			user.password=hashpassword
			user.resetToken=undefined
			user.expireToken=undefined
			user.save().then((saveduser)=>{
				res.json({message:'Password updated Successfuly'})
			})
		})
	}).catch(error=>{console.log(error)})
})


module.exports=router