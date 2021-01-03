import React, { useState } from "react";
import classes from "./Signin.module.css";

function ForgotPass() {
    const [email, setEmail] = useState("");
    return (
        <div className={classes.container_fp}>
            <h2 className={classes.h2_fp}>Forgot Password</h2>
            <h5 className={classes.h5_fp}>
                Please enter the registered email address.
            </h5>
            <div className={classes.input_fp}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={function (event) {
                        setEmail(event.target.value);
                    }}
                />
            </div>
            <button className={`${classes.button} ${classes.btn_fp}`}>
                Submit
            </button>
        </div>
    );
}

export default ForgotPass;
