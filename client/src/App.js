import { BrowserRouter, Route, useHistory } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './screens/Home';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import ViewPost from './screens/ViewPost';
import CreatePost from './screens/CreatePost';
import ForkedPost from './screens/ForkedPost';
// import NewHome from './screens/NewHome';
import Navbar from './Navbar';
import Footer from './Footer';
import CategoryA from './screens/category/CategoryA';
import CategoryB from './screens/category/CategoryB';
import CategoryC from './screens/category/CategoryC';
import { initialState , reducer } from './Reducer'
import { createContext, useContext, useEffect, useReducer } from 'react';
import Landing from './screens/landing'
import Blog from './screens/blog'
import MainFooter from './MainFooter'

export const UserContext=createContext();

function Routing()
{

  const {state,dispatch}=useContext(UserContext);
  const history=useHistory();

  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))   //localstorage will return content in the form of 
                                                          // string, parse function turns it into object
    if(user)
    {
      dispatch({type:"USER",payload:user})
      console.log("state",state)
      // history.push('/')
    }
    else  
    {
      history.push('/signin')
    }


  },[])

  return (
    <div >
        <Route exact path="/"><Landing/></Route>
        <Route exact path="/home"><Navbar /><Home/><Footer/></Route>
        <Route exact path="/signin"><Navbar /><Signin/></Route>
        <Route exact path="/signup"><Navbar /><Signup/></Route>
        <Route exact path="/create"><Navbar /><CreatePost/></Route>
        <Route exact path="/forked"><Navbar /><ForkedPost/></Route>
        <Route exact path="/blogs"><Navbar/><Blog/></Route>
        <Route exact path="/categoryA"><CategoryA/></Route>
        <Route exact path="/categoryB"><CategoryB/></Route>
        <Route exact path="/categoryC"><CategoryC/></Route>
        <Route exact path="/viewpost/:postId"><Navbar /><ViewPost/></Route>
        <MainFooter/>
    </div>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState);
  return (
    <UserContext.Provider 
    value={{
      state:state,                        // value is an object 
      dispatch:dispatch
    }}>
      <BrowserRouter>
        <Routing/>
      </BrowserRouter>                  
    </UserContext.Provider>
  );                                      // need to study about browser router
}

export default App;
