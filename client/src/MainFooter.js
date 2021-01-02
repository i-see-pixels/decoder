import React,{useEffect, useState} from "react";
import "./MainFooter.css";
import M from 'materialize-css'

function Footer() {

  var elems=document.querySelectorAll('.modal')
  var instances=M.Modal.init(elems);

    function SubmitQuery(e)
    {
      e.preventDefault();

        fetch('/submitQuery',{
            "method":"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "  + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                query:e.target[1].value,
                contentIssue:e.target[0].checked
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data);
        })

    }

  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">

          <div className="col">
            <h4 style={{marginTop:'10px'}}>Get in touch with us</h4>
          </div>

          <div className="col">
            
              <a class="modal-trigger" href="#modal5"><i className='medium material-icons'>mail_outline</i></a>

              <div id="modal5" class="modal" style={{width:'600px !important ' }}>
              <form onSubmit={(e)=>{SubmitQuery(e)}}>
                <div class="modal-content" style={{background:"gainsboro"}}>
                  
                    <h4 style={{color:'darkcyan', fontSize:'xxx-large', textAlign:'center'}}>Tell us the issues you are facing</h4>

                        <label>
                          <input type="checkbox" id="content" name="content" style={{opacity:'10', marginTop:'12px'}} />
                          <h2 style={{margin:"0 0 0 50px", color:'salmon'}}>Content Issue</h2>
                        </label>

                      <textarea id="otherErrors" name="otherErrors" type="text" style={{color: "indigo", font: "larger", height:'300px'}}
                        placeholder="Mention here if there are some other errors" />

                </div>
                <div className="modal-footer" style={{background: "white"}}>
                      <button class="modal-close btn-flat waves-effect waves-green" type="submit">Submit</button>
                      <button class="modal-close btn-flat waves-effect waves-green" type="button">Close</button>
                    </div>
                
                </form>
              </div>
            
          </div>

          

        </div>
        {/* <hr /> */}
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Pride We | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;