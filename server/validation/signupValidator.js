require('dotenv').config;
const Validator=require('validator')

function VerifySignup(data)
{
    var errors={};

    if(Validator.isEmpty(data.name))
    {
        errors.name="Name missing";
    }
    if(Validator.isEmpty(data.email))
    {
        errors.email="Email missing";
    }
    if(Validator.isEmpty(data.password))
    {
        errors.password="Password missing";
    }
    if(!Validator.isEmail(data.email))
    {
        errors.invalidEmail="Provided email id doesn't exist"
    }

    return {
        errors,
        isValid:(Object.keys(errors).length==0)
    }
}

module.exports=VerifySignup;