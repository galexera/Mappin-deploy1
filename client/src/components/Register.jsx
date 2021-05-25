import axios from "axios";
import { useRef, useState } from "react";
import "./register.css";


const Register = ( {setshowRegister}) => {
    const [success, setSuccess] = useState(false);
    const [error, seterror] = useState(false);
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            name: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };


        try {
            await axios.post("/users/register", newUser);
            seterror(false);
            setSuccess(true);
        } catch (err) {
            console.log(err)
            setSuccess(false)
            seterror(true);
        }
    }

    return (
        <div className="login-box">
            <div className="logo">
                <div className="symbol">
                <i class="fas fa-map-marker-alt"></i>
                </div>
                
               <h1>MapPin</h1>
            </div>


            <div className="outer-form">

                <form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <div class="textbox">
                        <i class="fas fa-user"></i>
                        <input autoFocus type="text" placeholder="Username" ref={usernameRef} className="registerlabel" />

                    </div>

                    <div class="textbox">
                        <i class="fas fa-envelope-open"></i>
                        <input type="text" placeholder="Email" ref={emailRef} />

                    </div>
                    <div class="textbox">
                        <i class="fas fa-lock"></i>
                        <input
                            type="password"
                            min="6"
                            placeholder="password"
                            ref={passwordRef} />
                    </div>


                    <button type="submit" className="btn">Submit</button>

                    {success && (<span className="success">Successfull. You can login now!</span>)}
                    {error && <span className="failure">Something went wrong!</span>}

                </form>
            </div>


        </div>



    )



}



export default Register;