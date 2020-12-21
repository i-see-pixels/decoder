import {useState} from 'react';

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
        <div>
            <h1>this is footer</h1>
            <h2>Reach out to us</h2>
            <input 
            type="text" 
            placeholder="email..."
            onChange={(e)=>{
                // console.log(e.target.value)
                setEmail(e.target.value)
            }}/>
            <textarea 
            placeholder="enter your text...."
            onChange={(e)=>{
                setQuery(e.target.value);
            }}
            ></textarea>
            <button type="submit" className="btn" onClick={
                ()=>{SubmitQuery()}
            }>Submit</button>
        </div>
    )
}

export default Footer;