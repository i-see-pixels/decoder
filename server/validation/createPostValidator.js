const Validator=require('validator')
require('dotenv').config()

function VerifyCreatePost(data,user)
{
    var errors={};

    if(Validator.isEmpty(data.title))
    {
        errors.title="Title missing";
    }
    
    if(Validator.isEmpty(data.body))
    {
        errors.body="Body missing";
    }
    
    if(Validator.isEmpty(data.pic))
    {
        errors.pic="Pic missing";
    }
    
    if(Validator.isEmpty(data.category))
    {
        errors.category="Category missing";
    }

    if(!Validator.isURL(data.pic))
    {
        errors.picurl="Invalid URL"
    }

    if(user.email != process.env.GMAIL_ID)
    {
        errors.invalidUserId="You are not allowed to create a post"
    }

    if(data.secretKey != process.env.KEY_TO_CREATE_A_POST )
    {
        errors.invalidKey="Invalid secret key"
    }

    return {
        errors,
        isValid:(Object.keys(errors).length==0)
    }
}

module.exports=VerifyCreatePost;