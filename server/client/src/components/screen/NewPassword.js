import React,{useState,useContext,useReducer} from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'
import M from 'materialize-css'
// import {reducer,initialState} from '../../reducer/userReducer'

      // const[state,dispatch]=useReducer(reducer,initialState)

const SignIn=()=>{
      const history=useHistory();
      const {token}=useParams()
      const[password,setPassword]=useState('');

         const postData=()=>{          

            fetch('/new-password',{
                  method:'POST',
                  headers:{
                        "Content-Type":"application/json"
                  },
                  body:JSON.stringify({
                        token,
                        password
                        })
            }).then(res=>{res.json()
                        .then(data=>{
                              console.log(data)
                              if(data.error){
                                    M.toast({html:data.error,classes:"#c62828 red darken-3"})
                              } 
                              else{
                                    // if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      
                                    //        M.toast({html:"Invalid Email",classes:"#c62828 red darken-3"})
                                    //      return  
                                    //  }
                                    
                                    
                                    M.toast({html:data.message,classes:"#43a047 green darken-1"})
                                    history.push('/signin')

                              }

                        }).catch(error=>{console.log(error)})
                  })
      }


	return(
		<div className='mycard'>
			<div className='card auth-card input-field'>
      			<h2 className='insta'>Instagram</h2>

                        <input
                        type='password'
                        placeholder='enter new password'
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        />
      			<button className='btn waves-effect waves-light #64b5f6 blue darken-1'
                        onClick={()=>postData()}
                        >
      				Update password
      			</button>
                        
      		</div>
		</div>
		)
}
export default SignIn