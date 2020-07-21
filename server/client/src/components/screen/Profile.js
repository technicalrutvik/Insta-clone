import React,{useEffect,useState,useContext} from 'react'
import logo from './avatar1.png.jpg'
import {UserContext} from '../../App'
const Profile=()=>{
	const [mypics,setPics]=useState([])
	const {state,dispatch}=useContext(UserContext)
	const[image,setImage]=useState('');
	useEffect(()=>{
		fetch('/mypost',{
			method:'GET',
			headers:{
				'Authorization':'Bearer '+localStorage.getItem('jwt')
			}
		}).then(res=>res.json())
		  .then(result=>{
		  		console.log(result);
		  		setPics(result.mypost)
		  })
	},[])

	useEffect(()=>{	

		if(image){
			const data =new FormData()
            data.append('file',image);
            data.append('upload_preset','insta-clone')
            data.append('cloud_name','dbi42fgij')
            fetch("https://api.cloudinary.com/v1_1/dbi42fgij/image/upload",{
                  method:'POST',
                  body:data
            }).then(res=>res.json())
              .then(data=>{
                  // console.log(data)
                  // localStorage.setItem('user',JSON.stringify({...state,pic:data.url}))
                  // dispatch({type:'UPDATEPIC',payload:data.url})
                  fetch('/updatepic',{
                  	method:'PUT',
                  	headers:{
                  		'Content-Type':'application/json',
                  		'Authorization':'Bearer '+localStorage.getItem('jwt')
                  	},
                  	body:JSON.stringify({
                  		pic:data.url
                  	})
                  }).then(res=>res.json())
                    .then(result=>{
                    	console.log(result)
                   localStorage.setItem('user',JSON.stringify({...state,pic:result.pic}))
                   dispatch({type:'UPDATEPIC',payload:result.pic})

                    })
                  // window.location.reload()
              })
              .catch(error=>{console.log(error)})
		}

	},[image])


	const updatePhoto=(file)=>{
		setImage(file)
		
	}

	return(
		<div style={{'maxwidth':"1550px",'margin':'0px auto'}}>
			<div style={{
				'margin':'10px 12px',
				'borderBottom':'1px solid grey'
			}}>

			<div style={{
				'display':'flex',
				'justifyContent':'space-around',
				// 'margin':'10px 12px',
				// 'borderBottom':'1px solid grey'
			}}>
				<div>
					<img style={{width:'160px',height:'160px',borderRadius:'80px'}}
					src={state?state.pic:'loading'} alt="pic"
					/>
						
				</div>
				<div>
					<h4>{state?state.name:"loading"}</h4>
					<h4>{state?state.email:"loading"}</h4>
					<div style={{'display':'flex','justifyContent':'space-between','width':'108%'}}>
						<h5>{mypics.length} post</h5>
						<h5>{state ? state.followers.length : '0'} follower</h5>
						<h5>{state ? state.following.length : '0'} following</h5>
					</div>
				</div>
			</div>
			
      			<div className="file-field input-field" style={{'margin':'10px'}}>
                        <div className="btn #64b5f6 blue darken-1">
                          <span>Update Pic</span>
                          <input type="file" onChange={(e)=>{updatePhoto(e.target.files[0])}} />
                        </div>
                        <div className="file-path-wrapper">
                          <input className="file-path validate" type="text"/>
                        </div>
                      </div>
      		</div>
			<div className='gallary'>
				{
					mypics.map(item=>{
						return(
								<img key={item._id} className='item' src={item.photo} alt={item.title}/>
							)
					})
				}
				
			</div>

		</div>
		)
}
export default Profile