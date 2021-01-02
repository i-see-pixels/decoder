import react, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Viewpost.css';

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
        <div className="formatDedicatedPost">
            {
            postData ? 
            <div className="article-dual-column">
        <div className="container">
          <div className="row">
            <div className="col-md-4" style={{margin: '100px 0 0 0'}}>
              <div className="toc">
                <p>Categories</p>
                <ul>
                  <li><a href="#">Catergory A</a> </li>
                  <li><a href="#">Catergory B</a></li>
                  <li><a href="#">Category C</a> </li>
                  <li><a href="#">Dolor sit amet</a> </li>
                </ul>
              </div><button className="btn btn-primary" type="button" style={{margin: '20px'}}><a href="/create">Add Post</a></button>
            </div>
            <div className="col-md-7 offset-md-5" style={{height: '510px', margin: 0}}>
              <div className="intro">
                <h1 className="text-center">{postData.title}</h1>
                <p className="text-center"><span className="by">by</span> <a href="#">Author Name</a>
                <span className="date">{postData.likes.length} likes</span></p>
                <img className="img-fluid" src="https://bit.ly/3mSWOVk" style={{margin: 0}} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-7 col-lg-7 offset-md-4 offset-lg-4">
              <div className="text">
                <p>
                {postData.body}
                </p>
                <hr/>
                <h4>Comments</h4>
                <p>
                                    {
                                        postData.comments.map(userComment=>{
                                            return(
                                                <p>
                                                    <span style={{fontWeight:"600"}}>{userComment.commentedBy.name}</span> 
                                                    {userComment.commentBody}
                                                    <hr/>
                                                </p>
                                            )
                                        })
                                    }
                                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    :
    <h1>Loading</h1>
    }
        </div>
    )
}

export default ViewPost;