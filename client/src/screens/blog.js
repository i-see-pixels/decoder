import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import './Home.css'
import './blog.css'
import {UserContext} from '../App'
import Navbar from '../Navbar'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import M from 'materialize-css'

function  Home() 
{
    const {state,dispatch}=useContext(UserContext)
    const [allThePosts,setAllThePosts]=useState([]);
    const [imageLoad,setImageload]=useState(false);
    // var flag=1;
    // console.log(state)

    useEffect(()=>{
        fetch('/allposts',{
            // method:"get",
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then((data)=>{                         // this is an array
            // console.log(typeof(data));
            setAllThePosts(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    function LikePost(postId)
    {
        fetch('/likepost',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt") 
            },
            body:JSON.stringify({
                postId,
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data);
            const newData=allThePosts.map(item=>{
                if(item._id === data._id)
                    return data;
                else   
                    return item;
            })

            setAllThePosts(newData);
            M.toast({html:'Post liked',classes:'#ce93d8 purple',displayLength:2000});
            // flag+=1;
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    function UnlikePost(postId)
    {
        fetch('/unlikepost',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data);
            const newData=allThePosts.map(item=>{
                if(item._id === data._id)
                    return data;
                else   
                    return item;
            })

            setAllThePosts(newData);
            M.toast({html:'Post disliked',classes:'#ce93d8 purple',displayLength:2000});
            // flag+=1;
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    function DeletePost(postId)
    {
        fetch(`/delete/${postId}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
            const newData=allThePosts.map(item=>{
                    if(item._id !== data._id)
                        return item
                    return data
            })
            setAllThePosts(newData);
            window.location.reload();
            // flag+=1;
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    function makeComment(comment,postId)
    {
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                commentBody:comment,
                postId,
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            // console.log(data);
            const newData=allThePosts.map(item=>{
                if(item._id === data._id)
                    return data
                else    
                    return item
            })
            setAllThePosts(newData)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    function ForkPost(postId)
    {
        fetch('/forkpost',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
            })
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data.forkedPost)
            // console.log("state before ",state);
            dispatch({type:"FORK" , payload : data.forkedPost})
            localStorage.setItem("user",JSON.stringify(data))
            M.toast({html:'Post forked successfully',classes:'#ce93d8 purple',displayLength:2000});
            // console.log("state after ",state);
        })
    }

    function UnForkPost(postId)
    {
        fetch('/unforkpost',{
                method:"put",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    postId,
                })
            })
            .then(res=>res.json())
            .then(data=>{
                // console.log(data.forkedPost)
                dispatch({type:"FORK" , payload : data.forkedPost})
                localStorage.setItem("user",JSON.stringify(data))
                M.toast({html:'Post unforked successfully',classes:'#ce93d8 purple', displayLength:2000});
            })
    }    
    
    function imageLoaded(params) {
        setImageload(true);
    }

    return (
        <div>
                {/* <li><Link to="/categoryA">CategoryA</Link></li>
                <li><Link to="/categoryB">CategoryB</Link></li>
                <li><Link to="/categoryC">CategoryC</Link></li> */}
                {
                    allThePosts.map(item=>{
                        return(
                            // console.log(item),

                            // body: "d"
                            // category: "C"
                            // comments: []
                            // likes: []
                            // pic: "C:\fakepath\wallhaven-42qee6_1366x768.png"
                            // postedby: {_id: "5fc9dbfa24626d26b8296d32", name: "y"}
                            // title: "d"
                            // __v: 0
                            // _id: "5fc9e12024626d26b8296d33"
                            // __proto__: Object

                            <div className="card">
                                <Link to={"/viewpost/" + item._id }><h2>{item.title}</h2></Link>
                                <img src={item.pic} onLoad={()=>{imageLoaded()}}/>
                                {!imageLoad && <h2>loading image</h2>}
                                <h2>{item.body}</h2>
                                <h4>{item.likes.length} likes</h4>

                                <div>
                                {
                                    item.likes.includes(state._id)
                                    ?
                                        <i className="small material-icons" title='Unlike' onClick={()=>{
                                            UnlikePost(item._id)
                                        }}>thumb_down</i>
                                    :
                                        <i className="small material-icons" title='Like' onClick={()=>{
                                            LikePost(item._id)
                                        }} style={{cursor:'pointer'}}>thumb_up</i>

                                }

                                {
                                    item.postedby._id === state._id
                                    &&
                                    <i className="small material-icons" title='Delete' onClick={()=>{
                                        DeletePost(item._id)
                                    }} >delete</i>
                                }
                
                                {
                                    
                                    state
                                    ?
                                        // 
                                        state.forkedPost.some(({_id})=>_id === item._id)
                                        ?
                                        <i className="small material-icons" title='Unfork this post' onClick={()=>{
                                            UnForkPost(item._id)
                                        }} style={{cursor:'pointer'}}>highlight_off</i>
                                        :
                                        <i className="small material-icons" title='Fork this post for future' onClick={()=>{
                                            ForkPost(item._id)
                                        }} style={{cursor:'pointer'}}>input</i>

                                    :

                                    <h5> loading </h5>

                                }

                                {/* {
                                    state.forkedPost.includes(item._id)
                                    ?
                                    <button 
                                    className="btn"
                                    onClick={()=>{
                                        UnForkPost(item._id)
                                    }}
                                    >UnFork</button>
                                    :
                                    <button 
                                    className="btn"
                                    onClick={()=>{
                                        ForkPost(item._id)
                                    }}
                                    >Fork</button>
                                }  */}

                                {/* <button 
                                className="btn"
                                onClick={()=>{
                                    ForkPost(item._id)
                                }}
                                >Fork</button>
                                
                                <button 
                                className="btn"
                                onClick={()=>{
                                    UnForkPost(item._id)
                                }}
                                >Un Fork</button> */}



                                </div>
                                {/* <h4>Previous Comments</h4> */}
                                <div style={{marginTop:'40px'}}>
                                    {
                                        item.comments.map(userComment=>{
                                            // console.log(userComment)
                                            return(
                                                <h4>
                                                    <span style={{fontWeight:"700"}}>{userComment.commentedBy.name} : </span> {userComment.commentBody}
                                                </h4>   
                                            )
                                        })
                                    }
                                </div>

                                <div>
                                    <form onSubmit={(e)=>{
                                        makeComment(e.target[0].value , item._id);
                                        e.preventDefault();     //when we submit forms, the page automatically gets reloaded
                                    }}>                         
                                        <input                  //to prevent that reloading, we have used e.preventDefault()
                                        type="text"
                                        placeholder="comments"
                                        />
                                    </form>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
    )
}

export default Home;
