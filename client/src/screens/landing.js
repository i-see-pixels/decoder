import React from 'react'
import './landing.css'

const landing=()=>{
    return(
    <div className="landing">
    
    <div className="landing-header">
 		<h1>Welcome to Pride We</h1>
		<a href="/home" className="btn btn-lg btn-success">Proceed to Pride We</a>
    </div>
    
    <ul className="slideshow">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js" type="text/javascript" async></script>
    </div>)
}

export default landing;