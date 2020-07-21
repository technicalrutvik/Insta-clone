const express=require('express');
const router=express.Router()
const mongoose=require('mongoose')
const Post=mongoose.model('Post')

const requiredLogin=require('../Middleware/requiredLogin')

const User =mongoose.model("User")
// const Post =mongoose.model("Post")

router.get('/user/:id',requiredLogin,(req,res)=>{
	User.findOne({_id:req.params.id})
	.select('-password')
	.then(user=>{
		Post.find({postedBy:req.params.id})
		.populate('postedBy','_id name')
		.exec((err,post)=>{
			if(err){
				return res.status(422).json({error:err})
			}
			res.json({user,post})
		})
	}).catch(err=>{
		return res.status(404).json({error:'user not found'})
	})
})

router.put('/follow',requiredLogin,(req,res)=>{
	User.findByIdAndUpdate(req.body.followId,{
		$push:{followers:req.user._id}
	},{
		new:true
	},(err,result)=>{
		if(err){
			return res.status(422).json({error:err})
		}
		User.findByIdAndUpdate(req.user._id,{
			$push:{following:req.body.followId}
		},{new:true}).select('-password').then(result=>{
			res.json(result)
		}).catch(err=>{
			return res.status(422).json({error:err})
		})
	}
	)
})

router.put('/unfollow',requiredLogin,(req,res)=>{
	User.findByIdAndUpdate(req.body.unfollowId,{
		$pull:{followers:req.user._id}
	},{
		new:true
	},(err,result)=>{
		if(err){
			return res.status(422).json({error:err})
		}
		User.findByIdAndUpdate(req.user._id,{
			$pull:{following:req.body.unfollowId}
		},{new:true}).select('-password').then(result=>{
			res.json(result)
		}).catch(err=>{
			return res.status(422).json({error:err})
		})
	}
	)
})

router.put('/updatepic',requiredLogin,(req,res)=>{
	User.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},
		(err,result)=>{
			if(err){
				return res.status(422).json({error:'pic cannot post'})
			}
			res.json(result)
	})
})

router.post('/search-users',(req,res)=>{
	let userPattern = new RegExp('^'+req.body.query)
	User.find({email:{$regex:userPattern}})
	.select('_id email')
	.then(user=>
		{res.json({user})
	}).catch(err=>console.log(err))
})

module.exports=router

