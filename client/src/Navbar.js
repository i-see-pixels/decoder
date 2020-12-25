

import React,{useContext} from 'react'
import { Link, useHistory } from 'react-router-dom';
import './Toolbar.css'
import {UserContext} from './App'

function Toolbar()
{
  const {state,dispatch}=useContext(UserContext);
  const history=useHistory();

  function RenderNavbar()
  {
    if(state)
    {
      return[
        <li className="nav-item" role="presentation"><a className="nav-link" href="/home">Home</a></li>,
        <li className="nav-item" role="presentation"><a className="nav-link" href="/forked">Forked Posts</a></li>,
        <li className="nav-item" role="presentation"><a className="nav-link" href="/blogs">Blogs</a></li>,
        <li className="nav-item" role="presentation"><a className="nav-link" href="/create">Create Post</a></li>,
        <li className="nav-item" role="presentation"><a className="nav-link" href="#">About</a></li>,
        <div class="nav-item dropdown">
                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Categories</a>
                    <div class="dropdown-menu">
                        <a href="/categoryA" className="dropdown-item">CategoryA</a>
                        <a href="/categoryB" className="dropdown-item">CategoryB</a>
                        <a href="/categoryC" className="dropdown-item">CategoryC</a>
                    </div>
                </div>,
        <li className="nav-item" role="presentation" className="nav-link">
        <button className="btn btn-primary" type="button" style={{padding: '5px 10px', borderRadius: '10px', backgroundColor: '#13694d'}}
            onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                history.push('/signin')
            }}>Logout</button>
        </li>
      ]
    }
    else
    {
      return[
        <li className="nav-item" role="presentation"><a className="nav-link" href="/signin">Signin</a></li>,
        <li className="nav-item" role="presentation" style={{margin: '0 20px'}}><button className="btn btn-primary" type="button" style={{padding: '5px 10px', borderRadius: '10px', backgroundColor: '#FF9999'}}>
          <Link to="/signup">Signup</Link></button></li>
      ]
    }
  }

		return(
			<div style={{margin:'0 30px 0 0'}}>
		   <nav className="navbar navbar-light navbar-expand-md" style={{height: '75px', position: 'fixed', zIndex: 10, width: '100%', backgroundColor: '#ffffff'}}>
        <div className="container-fluid"><a className="navbar-brand" href="#" style={{fontSize: '25px', textAlign: 'center', fontWeight: 800, color: '#13694d'}}>LOGO</a><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon" /></button>
          <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="nav navbar-nav d-xl-flex flex-grow-1 justify-content-end align-items-center">
              {/* <li className="nav-item" role="presentation"><a className="nav-link" href="/">Home</a></li>
              <li className="nav-item" role="presentation"><a className="nav-link" href="/forked">Forked Posts</a></li>
              <li className="nav-item" role="presentation"><a className="nav-link" href="/signin">Signin</a></li>
              <li className="nav-item" role="presentation"><a className="nav-link" href="/create">Create Post</a></li>
              <li className="nav-item" role="presentation"><a className="nav-link" href="#">About</a></li>
              <li className="nav-item" role="presentation"><a className="nav-link" href="#">Contact Us</a></li>
              <li className="nav-item" role="presentation" style={{margin: '0 20px'}}><button className="btn btn-primary" type="button" style={{padding: '5px 10px', borderRadius: '10px', backgroundColor: '#13694d'}}><Link to="/signup">Signup</Link></button></li>
              <li className="nav-item" role="presentation" className="nav-link">
            <button className="btn btn-primary" type="button" style={{padding: '5px 10px', borderRadius: '10px', backgroundColor: '#13694d'}}
            onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                history.push('/signin')
            }}>Logout</button>
           </li> */}
            <RenderNavbar/>
            </ul>
          </div>
        </div>
      </nav>
        </div>
    )
    
}


export default Toolbar;