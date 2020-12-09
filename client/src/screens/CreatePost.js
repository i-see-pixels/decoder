// import { useState } from "react";
import React , {useState} from 'react';
import M from 'materialize-css';
import classes from './CreatePost.module.css'
function CreatePost()
{
    const [title,setTitle]=useState("");
    const [body,setBody]=useState("");
    const [pic,setPic]=useState("")
    const [category,setCategory]=useState("");

    function PostData()
    {
        fetch('/createpost',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic,
                category,
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data);
        })
    }

    return(
        <div className={classes.main}>
            <div style={{textAlign:"center"}}>
                <div className={classes.input}>
                    <input
                    type="text"
                    value={title}
                    placeholder="Title"
                    onChange={
                        function(event)
                        {
                            setTitle(event.target.value);
                        }
                    }
                    />
                </div>

                <div className={classes.input}>
                    <input
                    type="text"
                    value={body}
                    placeholder="Body"
                    onChange={
                        function(event)
                        {
                            setBody(event.target.value);
                        }
                    }
                    />
                </div>
                <div className={classes.input}>
                    <input
                    type="file"
                    value={pic}
                    placeholder="Picture"
                    onChange={
                        function(event)
                        {
                            console.log(event.target.value)
                            // setPic(event.target.files);
                            setPic(event.target.value);
                        }
                    }
                    />
                </div>
                <div className={classes.input}>
                    {/* need to put dropdown list here */}
                    <input 
                    type="text"
                    value={category}
                    placeholder="category"
                    onChange={(event)=>{
                        console.log(event.target.value)
                        setCategory(event.target.value)
                    }}
                    />
                </div>
            </div>

            <button 
            className={classes.button}
            onClick={()=>{
                PostData();
            }}
            >
                Post
            </button>
        </div>
    )
}

export default CreatePost;