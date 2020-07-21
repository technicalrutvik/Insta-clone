import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const SignUp=()=>{
      
      const history=useHistory();

      const[name,setName]=useState('');
      const[password,setPassword]=useState('');
      const[email,setEmail]=useState('');
      const[image,setImage]=useState('');
      const[url,setUrl]=useState(undefined);

      useEffect(()=>{
            if(url){
                  uploadFields()
            }
      },[url])

      const uploadPic=()=>{

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

      const uploadFields=()=>{

            fetch('/signup',{
                  method:'POST',
                  headers:{
                        "Content-Type":"application/json"
                  },
                  body:JSON.stringify({

                        name,
                        password,
                        email,
                        pic:url
                        })
            }).then(res=>{res.json()
                        .then(data=>{

                              if(data.error){
                                    M.toast({html:data.error,classes:"#c62828 red darken-3"})
                              } 
                              else{
                                    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      
                                           M.toast({html:"Invalid Email",classes:"#c62828 red darken-3"})
                                         return  
                                     }
                                    M.toast({html:data.message,classes:"#43a047 green darken-1"})
                                    history.push('/signin')
                              }

                        }).catch(error=>{console.log(error)})
                  })

      }


      const postData=()=>{          

            if(image){
                  uploadPic()
            }else{
                  uploadFields()
            }

            
      }

	return(
		<div className='mycard'>
			<div class='card auth-card input-field'>
      			<h2 className='insta'>Instagram</h2>
      			<input
      			type='text'
      			placeholder='name'
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
      			/>
      			<input
      			type='text'
      			placeholder='email'
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
      			/>
      			<input
      			type='password'
      			placeholder='password'
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
      			/>
                        <div className="file-field input-field">
                        <div className="btn #64b5f6 blue darken-1">
                          <span>Uploads Image</span>
                          <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} />
                        </div>
                        <div className="file-path-wrapper">
                          <input className="file-path validate" type="text"/>
                        </div>
                      </div>
      			<button className='btn waves-effect waves-light #64b5f6 blue darken-1'
                        onClick={()=>postData()}
                        >
      				SignUp
      			</button>
      			<h5>
      				<Link to='/signin'>Already have Account ?</Link>
      			</h5>
      		</div>
		</div>
		)
}
export default SignUp