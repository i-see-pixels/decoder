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
            // history.push('/forked');
            window.location.reload();
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(
        <div>
            {
                myforks.map(item=>{
                    return(
                        <div className="card">
                            <h1>{item.title}</h1>
                            <h2>{item.body}</h2>
                            <h5>{item.likes.length} likes</h5>

                            {
                                state
                                ?
                                    state.forkedPost.some(({_id})=>_id === item._id)
                                    ?
                                    <button 
                                    className="btn"
                                    onClick={()=>{
                                        UnforkPost(item._id)
                                    }}
                                    >UnFork</button>
                                    :
                                    <h6> </h6>
                                :
                                <h5> !! loading </h5>
                            }

                            <div>
                                {
                                    item.comments.map(userComment=>{
                                        return(
                                            <h6>
                                                <span style={{fontWeight:"600"}}>{userComment.commentedBy.name}</span> {userComment.commentBody}
                                            </h6>   
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