import React,{useEffect,createContext,useReducer,useContext} from 'react';
import {} from './Grand_Hotel/GrandHotel-Regular.ttf' 
import Home from './components/screen/Home';
import Login from './components/screen/SignIn';
import Profile from './components/screen/Profile';
import Signup from './components/screen/Signup';
import CreatePost from './components/screen/CreatePost';
import './App.css';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import {} from './materialize/css/materialize.min.css'
import Navbar from './components/Navbar'
import {reducer,initialState} from './reducer/userReducer'
import UserProfile from './components/screen/UserProfile'
import SubscribeUserPost from './components/screen/SubscribeUserPost'
import Reset from './components/screen/Reset'
import NewPassword from './components/screen/NewPassword'
export const UserContext=createContext()
const Routing=()=>{
	const history=useHistory()
	const {state,dispatch}=useContext(UserContext)
	useEffect(()=>{
		const user=JSON.parse(localStorage.getItem('user'))
		// console.log(user)

		if(user){
			dispatch({type:'USER',payload:user})
			// history.push('/')
		}
		else{
			if(!history.location.pathname.startsWith('/reset')){
			history.push('/signin')}
		}
	},[])

		return(
		<Switch>
		<Route exact path='/' component={Home}/>
	    <Route path='/signin' component={Login}/>
	    <Route exact path='/profile' component={Profile}/>
	    <Route path='/signup' component={Signup}/>
	    <Route path='/create'><CreatePost/></Route>
	    <Route path='/profile/:userid'><UserProfile/></Route>
	    <Route path='/myfollowingpost'><SubscribeUserPost/></Route>
	    <Route exact path='/reset' component={Reset}></Route>
	    <Route  path='/reset/:token'><NewPassword/></Route>


		</Switch> 	
	    )
}

function App() {
	const[state,dispatch]=useReducer(reducer,initialState)
  return (
  	<UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Navbar/>
    <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
