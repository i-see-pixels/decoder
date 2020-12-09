import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import { UserContext } from '../App'
import classes from './Signin.module.css'

function Signin()
{
    // const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const history=useHistory();
    const {state,dispatch}=useContext(UserContext);

    function PostData()
    {
        // const history=useHistory();
        fetch('/signin',{
            method:"post",
            headers:
            {
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                email,
                password
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            if(data.error)
            {
                console.log("error ");
                console.log(data.error);
            }
            else
            {
                localStorage.setItem("jwt",data.token);
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                console.log("signed in successfully");
                history.push("/");
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className={classes.main}>
            <div>
                <div className={classes.input}>
                    <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={
                        function(event)
                        {
                            // console.log(event)
                            // console.log(event.target.value)
                            setEmail(event.target.value);
                        }
                    }
                    />
                </div>  
                <div className={classes.input}>
                    <input
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={
                        function(event)
                        {
                            // console.log(event)
                            // console.log(event.target.value)
                            setPassword(event.target.value);
                        }
                    }
                    />
                </div>  
            </div>
            <button 
            className={classes.button}
            onClick={()=>PostData()}>Login</button>
        </div>
    );
}

export default Signin;