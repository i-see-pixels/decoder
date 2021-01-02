const express=require("express")
const router=express.Router();
const mongoose=require("mongoose")
const User=mongoose.model("User")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const {JWT_SECRET_KEY}=require("../keys")
const requireLogin=require('./middleware')
const VerifySignup=require('../validation/signupValidator')
const nodemailer=require('nodemailer');
const crypto=require('crypto')

router.get('/protected',requireLogin,(req,res)=>{
    // res.json({message:"success"})
    console.log(req.user)
})

router.post("/signup",(req,res)=>{

    const {errors,isValid}=VerifySignup(req.body);

    if(!isValid)
    {
        return res.status(400).json({error:errors})
    }

    const {name,email,password}=req.body;
    
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            //console.log(savedUser)
            return res.status(422).json({error:"email already exists"})        ////user already exists with that email
        }

        bcrypt.hash(password,5)
        .then((hashedPassword)=>{
            const user=new User({
                name:name,
                email:email,
                password:hashedPassword,
                // password:password,
            })

            user.save()
                .then(()=>{
                    /* SENDING WELCOME MAIL */

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
                        subject: "Signup success",
                        html: `
                        <h2>Hi! ${user.name}</h2>
                        <h3>Welcome to PrideWe</h3>
                        `,
                      };
                    
                      transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log("Email sent: " + info.response);
                        }
                      });

                    /* WELCOME MAIL SENT */ 
                    res.json({message:"user saved successfully"});
                    console.log("saved successfully")
                })
                .catch((err)=>{
                    console.log(err);
                })
        })
        .catch((err)=>{
            console.log(err);
        })  
    })

})

router.post("/signin",(req,res)=>{
    const {email,password} = req.body;
    User.findOne({email:email})
    .then((savedUser)=>{
        if(!savedUser)
        {
            return res.status(422).json({error:"no such user"})
        }

        bcrypt.compare(password,savedUser.password)
              .then((foundUser)=>{
                  if(!foundUser)
                  {
                      return res.status(422).json({error:"invalid email or password"})
                  }
                  const token=jwt.sign({_id:savedUser._id},JWT_SECRET_KEY)
                  const {_id,name,email,pic,forkedPost}=savedUser;
                  res.json({token:token,user:{_id,name,email,pic,forkedPost}})

              })
              .catch((err)=>{
                  console.log(err)
              })
    })

})

router.post('/forgotPassword',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err)
        {
            console.log(err)
        }
        const token=buffer.toString('hex');
        

        User.findOne({email:req.body.email})
        .then((user)=>{
            if(!user)
            {
                return res.status(400).json({error:"no such email exists before"})
            }
            user.resetToken=token;
            user.tokenExpiry=Date.now()+3600000;
            user.save();
            // console.log(user)
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
                <h4>Click on the <a href="http://localhost:3000/${token}">link</a> to reset your password</h4>
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

router.post('/updatePassword',(req,res)=>{
    const {newPassword,userEmail,token}=req.body
    User.findOne({email:userEmail,resetToken:token, tokenExpiry:{$gte:Date.now()}})
    .then((user)=>{
        if(!user){
            return res.status(400).json({error:"Please try again"})
        }

        bcrypt.hash(newPassword,5)
        .then((hashedPassword)=>{
            user.password=hashedPassword
            // user.password=newPassword
            user.tokenExpiry=undefined
            user.resetToken=undefined
            user.save();
            return res.json({success:"Password reset successfully"})
        })

    })
})

module.exports=router;