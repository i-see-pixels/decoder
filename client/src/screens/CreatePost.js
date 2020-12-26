// import { useState } from "react";
import React , {useEffect, useState} from 'react';
import M from 'materialize-css';
import classes from './CreatePost.module.css'
import Spinner from './spinner';

function CreatePost()
{
    const [title,setTitle]=useState("");
    const [body,setBody]=useState("");
    const [pic,setPic]=useState("")
    const [picurl,setPicurl]=useState("");
    const [category,setCategory]=useState("");
    const [loading,setLoading]=useState(false);


    useEffect(()=>{
        if(picurl)
        {
            console.log("picurl=",picurl)
            fetch('/createpost',{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    picurl,
                    category,
                })
            })
            .then(res=>res.json())
            .then((data)=>{
                console.log(data);
                setLoading(false)
                M.toast({html:'Post created successfully',classes:'#ce93d8 purple', displayLength:2000});
            })
        }
    },[picurl])

    function PostImageOnCloud() 
    {
        setLoading(true);
        const data=new FormData();
        data.append('file',pic);
        data.append('upload_preset','insta-clone')
        data.append('cloud_name','vikash0901');

        fetch('https://api.cloudinary.com/v1_1/vikash0901/image/upload',{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setPicurl(data.url)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    /*function PostData()
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
    }*/

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
                    placeholder="Picture"
                    onChange={
                        function(event)
                        {
                            console.log(event.target.files[0])
                            setPic(event.target.files[0]);
                            // setPic(event.target.value);
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
                PostImageOnCloud();
                
            }}
            disabled={loading}
            >
               {
                   loading?
                   <Spinner/>
                   :
                   <h3>Post</h3>
               }
            </button>
        </div>
    )
}

export default CreatePost;