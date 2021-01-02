const express=require("express")
const router=express.Router();
const mongoose=require("mongoose");
const User=mongoose.model("User")
const requireLogin=require('./middleware');
const { route } = require("./post");
const crypto=require('crypto')

router.get('/test',(req,res)=>{
    console.log("triggered");
})

router.put('/forkpost',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{
        $push:{forkedPost:req.body.postId}
    },{
        new:true
    })
    .populate("forkedPost","_id title")
    .exec((err,result)=>{
        if(err)
            console.log(err);
        else
            res.json(result);
    })
})

router.put('/unforkpost',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{
        $pull:{forkedPost:req.body.postId}
    },{
        new:true
    })
    .populate("forkedPost","_id title")
    .exec((err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            // console.log("unfork ",result)
            res.json(result);
        }
    })
})

router.post('/rich',(req,res)=>{
    const content=req.body;
    // console.log(typeof(content.blocks))
    console.log(content.content.blocks[0].text)
    res.json(content.content.blocks[0].text)
})

router.get('/getforkpost',requireLogin,(req,res)=>{
    User.findById(req.user._id)
        // .populate("forkedPost","_id title body likes pic comments")
        // .populate("forkedPost.comments.commentedBy","_id name")

        .populate({                         // learnt this from Stack overflow
            path:'forkedPost',              // this is an important and useful concept
            populate:{                      //ALWAYS KEEP THE TECHNIQUE IN MIND
                path:'comments',            //https://stackoverflow.com/questions/19222520/populate-nested-array-in-mongoose
                populate:{
                    path:'commentedBy',
                    select:'name'
                }
            }
        })
        .then(posts=>{
            // console.log(posts.forkedPost)
            res.json(posts.forkedPost)
        })
        .catch((err)=>{
            console.log(err)
        })
})

router.post('/forgotPassword',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err)
        {
            console.log(err)
        }
        const token=buffer.toString('hex');
        user.resetToken=token;
        user.tokenExpiry=Date.now()+3600000;

        User.findOne({email:req.body.email})
        .then((user)=>{
            if(!user)
            {
                return res.status(400).json({error:"no such email exists before"})
            }
            var transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                  user: process.env.GMAIL_ID,
                  pass: process.env.GMAIL_PASSWORD,
                },
              });
            
              var mailOptions = {
                from: process.env.GMAIL_ID,
                to: user.email,
                subject: "Forgot password",
                html: `
                <h2Hi! ${user.name}</h2>
                <h3>Forgot your password??</h3>
                <h4>No issues</h4>
                <h4>Click on the <a href="http://localhost:3000/updatePassword">link</a> to reset your password</h4>
                `,
              };
            
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                    res.json({message:"Check your email id"})
                    console.log("Email sent: " + info.response);
                }
              });
        })

    })
})

router.post('updatePassword',(req,res)=>{

})

module.exports=router;