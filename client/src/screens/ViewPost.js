import react, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Toolbar.css';

function ViewPost()
{
    const {postId}=useParams();
    // console.log(postId)

    const [postData,setPostData]=useState(null);

    useEffect(()=>{
        fetch(`/getPost/${postId}`,{
            method:"get",
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then((data)=>{
            // console.log(data.likes.length)
            // console.log(typeof(data.likes))
            console.log(data)
            setPostData(data)
            // console.log(postData.comments.length)
            // console.log(typeof(postData.comments))
        })
        .catch((err)=>{
            console.log(err);
        })
    },[postId])


    return(
        <div>
            {                                               // did this so that when postData will be available
                postData?                                   // only then the further components can be accessed
                <div className="formatDedicatedPost">                                     
                    <h1>{postData.title}</h1>
                    <h3>{postData.body}</h3>
                    <h5>{postData.likes.length} likes</h5>
                    <div>
                        {
                            postData.comments.map(userComment=>{
                                return(
                                    <h6>
                                        <span style={{fontWeight:"600"}}>{userComment.commentedBy.name}</span> {userComment.commentBody}
                                    </h6>
                                )
                            })
                        }
                    </div>
                </div>
                :
                <h1>! loading  </h1>
            }
            
        </div>
    )
}

export default ViewPost;