import React,{useState,useContext,useReducer} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
// import {reducer,initialState} from '../../reducer/userReducer'

      // const[state,dispatch]=useReducer(reducer,initialState)

const Reset=()=>{
      const history=useHistory();

      const[email,setEmail]=useState('');

         const postData=()=>{          

            fetch('/reset-password',{
                  method:'POST',
                  headers:{
                        "Content-Type":"application/json"
                  },
                  body:JSON.stringify({
                        email
                        })
            }).then(res=>{res.json()
                        .then(data=>{

                              if(data.error){
                                    M.toast({html:data.error,classes:"#c62828 red darken-3"})
                              } 
                              else{
                        
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
                        type='text'
                        placeholder='email'
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        />
            
      			<button className='btn waves-effect waves-light #64b5f6 blue darken-1'
                        onClick={()=>postData()}
                        >
      				reset password
      			</button>
                     
      		</div>
		</div>
		)
}
export default Reset