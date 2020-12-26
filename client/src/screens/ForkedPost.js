import react, { useEffect, useState, useContext } from 'react';
import {useHistory} from 'react-router-dom';
import {UserContext} from '../App'

function ForkedPost()
{
    const [myforks,setMyforks]=useState([]);
    const {state,dispatch}=useContext(UserContext)
    const history=useHistory();

    useEffect(()=>{
        fetch('/getforkpost',{
            method:"get",
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then((data)=>{
            // console.log(data);
            setMyforks(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    function UnforkPost(postId)
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
        .then((data)=>{
            dispatch({type:"FORK" , payload : data.forkedPost})
            localStorage.setItem("user",JSON.stringify(data))
            window.location.reload();
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(
        <div>
            {
                <h1>All your forked posts appear here</h1>,
                myforks.map(item=>{
                    return(
                        <div className="card">
                            <h1>{item.title}</h1>
                            <img src={item.pic}/>
                            <h2>{item.body}</h2>
                            <h4>{item.likes.length} likes</h4>

                            {
                                state
                                ?
                                    state.forkedPost.some(({_id})=>_id === item._id)
                                    ?
                                    <i className="small material-icons" title='Unfork this post' onClick={()=>{
                                        UnforkPost(item._id)
                                    }} style={{cursor:'pointer'}}>highlight_off</i>
                                    :
                                    <h6> </h6>
                                :
                                <h5> !! loading </h5>
                            }

                            <div>
                                {
                                    item.comments.map(userComment=>{
                                        return(
                                            <h4>
                                                <span style={{fontWeight:"700"}}>{userComment.commentedBy.name}</span> {userComment.commentBody}
                                            </h4>   
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
            <h1>Forked page</h1>
        </div>
    )
}

export default ForkedPost;