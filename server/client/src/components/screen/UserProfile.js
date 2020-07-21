import React,{useEffect,useState,useContext} from 'react'
import logo from './avatar1.png.jpg'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
const Profile=()=>{
	const [userProfile,setUserProfile]=useState(null)
	const {state,dispatch}=useContext(UserContext)
	const {userid}=useParams()
	 //console.log(userid)

	const [showfollow,setShowFollow]=useState(state ? !state.following.includes(userid) : true)
	
	useEffect(()=>{
		fetch(`/user/${userid}`,{
			method:'get',
			headers:{
				'Authorization':'Bearer '+localStorage.getItem('jwt')
			}
		}).then(res=>res.json())
		  .then(result=>{
		  		console.log(result);
		  		setUserProfile(result)
		  })
	},[])

	const followUser=(followId)=>{
		fetch('/follow',{
			method:'PUT',
			headers:{
				'Content-Type':'application/json',
				'Authorization':'Bearer '+localStorage.getItem('jwt')
			},
			body:JSON.stringify({
				followId:userid
			})
			}).then(res=>res.json())
			  .then(data=>{
			  	// console.log(data)
			  	dispatch({type:'UPDATE',payload:{following:data.following,followers:data.followers}})

			  	localStorage.setItem('user',JSON.stringify(data))
			  	setUserProfile((prevState)=>{
			  		return{
			  			...prevState,
			  			user:{
			  				...prevState.user,
			  				followers:[...prevState.user.followers,data._id]
			  			}
			  		}
			  	})
			  	setShowFollow(false)
			  }).catch(err=>console.log(err))
		
	}


	const unfollowUser=(followId)=>{
		fetch('/unfollow',{
			method:'PUT',
			headers:{
				'Content-Type':'application/json',
				'Authorization':'Bearer '+localStorage.getItem('jwt')
			},
			body:JSON.stringify({
				unfollowId:userid
			})
			}).then(res=>res.json())
			  .then(data=>{
			  	// console.log(data)
			  	dispatch({type:'UPDATE',payload:{following:data.following,followers:data.followers}})

			  	localStorage.setItem('user',JSON.stringify(data))
			  	setUserProfile((prevState)=>{
			  		const newFollower=prevState.user.followers.filter(item=>item!== data._id)	
			  		return{
			  			...prevState,
			  			user:{
			  				...prevState.user,
			  				followers:newFollower
			  			}
			  		}
			  	})
			  	setShowFollow(true)

			  }).catch(err=>console.log(err))
		
	}


	return(
		<>
		{userProfile ? 

		<div style={{'maxwidth':"1550px",'margin':'0px auto'}}>
			<div style={{
				'display':'flex',
				'justifyContent':'space-around',
				'margin':'10px 12px',
				'borderBottom':'1px solid grey'
			}}>
				<div>
					<img style={{width:'160px',height:'160px',borderRadius:'80px'}}
					src={userProfile.user.pic} alt="pic"
					/>
					
				</div>
				 <div>
					<h4>{userProfile.user.name}</h4>
					<h5>{userProfile.user.email}</h5>

					<div style={{'display':'flex','justifyContent':'space-between','width':'108%'}}>
						<h5>{userProfile.post.length} posts</h5>
						<h5>{userProfile.user.followers.length} follower</h5>
						<h5>{userProfile.user.following.length} following</h5>
					</div>
					{showfollow ? 
								<button style={{margin:'10px'}} className='btn waves-effect waves-light #64b5f6 blue darken-1'
		                        onClick={()=>followUser()}
		                        >
			      				Follow
			      				</button>

			      				:

			      				<button style={{margin:'10px'}} className='btn waves-effect waves-light #64b5f6 blue darken-1'
		                        onClick={()=>unfollowUser()}
		                        >
			      				Unfollow
			      			<	/button>

					}
					
      				
				</div>
			</div>
		
			

			<div className='gallary'>
				{
					userProfile.post.map(item=>{
						return(
								<img key={item._id} className='item' src={item.photo} alt={item.title}/>
							)
					})
				}
				
			</div>

		</div>	

		:	<h2>loading ...!</h2>}
		
		</>
		)
}
export default Profile