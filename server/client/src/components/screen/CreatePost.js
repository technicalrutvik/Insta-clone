import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const CreatePost=()=>{
	const[title,setTitle]=useState('');
	const[body,setBody]=useState('');
	const[image,setImage]=useState('');
	const[url,setUrl]=useState('');

	const history=useHistory()

	useEffect(()=>{
			if(url){
			fetch('/createpost',{
                  method:'POST',
                  headers:{
                        "Content-Type":"application/json",
                        'Authorization':'Bearer '+localStorage.getItem('jwt')
                  },
                  body:JSON.stringify({
                        title,
                        body,
                        pic:url
                        })
            }).then(res=>{res.json()
                        .then(data=>{

                              if(data.error){
                                    M.toast({html:data.error,classes:"#c62828 red darken-3"})
                              } 
                              else{
                                    // if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      
                                    //        M.toast({html:"Invalid Email",classes:"#c62828 red darken-3"})
                                    //      return  
                                    //  }
                                    M.toast({html:"Created Post Successfully",classes:"#43a047 green darken-1"})
                                    history.push('/')
                              }

                        }).catch(error=>{console.log(error)})
                  })
        }
	},[url])

	const postDetails=()=>{
		const data =new FormData()
		data.append('file',image);
		data.append('upload_preset','insta-clone')
		data.append('cloud_name','dbi42fgij')
		fetch("https://api.cloudinary.com/v1_1/dbi42fgij/image/upload",{
			method:'POST',
			body:data
		}).then(res=>res.json())
		  .then(data=>{
		  	setUrl(data.url)
		  })
		  .catch(error=>{console.log(error)})

		  

	}


	return(
		<div className='card input-field'
		style={{
			'margin':'30px auto',
			'maxWidth':'800px',
			'padding':'50px',
			'textAlign':'center'
		}}
		>
			<input 
			type='text' 
			placeholder='title'
			value={title}
			onChange={(e)=>setTitle(e.target.value)}
			/>

			<input 
			type='text' 
			placeholder='body'
			value={body}
			onChange={(e)=>setBody(e.target.value)}
			/>
			<div className="file-field input-field">
		      <div className="btn #64b5f6 blue darken-1">
		        <span>Upload Image</span>
		        <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} />
		      </div>
		      <div className="file-path-wrapper">
		        <input className="file-path validate" type="text"/>
		      </div>
		    </div>
      		<button className='btn waves-effect waves-light #64b5f6 blue darken-1'
      		onClick={()=>{postDetails()}}
      		>
      			Submit post
      		</button>
		</div>
		)
}
export default CreatePost