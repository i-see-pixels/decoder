import { BrowserRouter, Route, useHistory } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './screens/Home';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import ViewPost from './screens/ViewPost';
import CreatePost from './screens/CreatePost';
import ForkedPost from './screens/ForkedPost';
import NewHome from './screens/NewHome';
import Navbar from './Navbar';
import CategoryA from './screens/category/CategoryA';
import CategoryB from './screens/category/CategoryB';
import CategoryC from './screens/category/CategoryC';
import { initialState , reducer } from './Reducer'
import { createContext, useContext, useEffect, useReducer } from 'react';

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
        <Navbar />
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Route exact path="/"><Home/></Route>
        <Route exact path="/newhome"><NewHome/></Route>
        <Route exact path="/signin"><Signin/></Route>
        <Route exact path="/signup"><Signup/></Route>
        <Route exact path="/create"><CreatePost/></Route>
        <Route exact path="/forked"><ForkedPost/></Route>
        <Route exact path="/categoryA"><CategoryA/></Route>
        <Route exact path="/categoryB"><CategoryB/></Route>
        <Route exact path="/categoryC"><CategoryC/></Route>
        <Route exact path="/viewpost/:postId"><ViewPost/></Route>
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
