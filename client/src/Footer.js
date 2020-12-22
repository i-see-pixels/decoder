import {useState} from 'react';
import './Footer.css'

function Footer()
{
    const [email,setEmail]=useState("");
    const [query,setQuery]=useState("");
    
    function SubmitQuery()
    {
        console.log("email",email);
        console.log("query",query);
        fetch('/submitQuery',{
            "method":"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "  + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                email,
                query
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data);
        })

    }

    return (
        <footer className="" style={{position:'relative', bottom:'0', width: "100%",
        height: "350px",backgroundColor:"#6D68B1"}}>
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h1 style={{paddingTop:"100px",textAlign:"left",width:"200%"}}className="white-text">Have a query ?</h1>
                <h1  style={{marginTop:"2px",textAlign:"left",width:"200%"}} className="white-text">Get in Touch</h1>
                </div>
                <div style={{paddingTop:"100px",marginLeft:"400px" ,marginTop:"2px",paddingBottom:"100px", alignItems:"right",width:"50%"}}>
                <input 
                style={{backgroundColor:"#FFFFFF",borderRadius:"4px"}}
                type="text" 
                placeholder="email..."
                onChange={(e)=>{
                    // console.log(e.target.value)
                    setEmail(e.target.value)
                }}/>
                  <textarea 
                  style={{backgroundColor:"#FFFFFF",borderRadius:"4px"}}
                placeholder="enter your text...."
                onChange={(e)=>{
                    setQuery(e.target.value);
                }}
                />

                <button 
                  style={{backgroundColor:"#182628"}}                
                type="submit" className="btn" onClick={
                    ()=>{SubmitQuery()}
                }>Submit</button>

            </div>
            </div>
          </div>
          {/* <div className="footer-copyright">
            <div className="container">
            © 2014 Copyright Text
            <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
            </div>
          </div> */}
        </footer>

    )
}

export default Footer;