import axios from "axios";
import { useRef, useState } from "react";
// import "./login.css";

const Login = ({setshowLogin, myStorage ,setcurrentUser ,setshowMap }) => {
    const [success, setSuccess] = useState(false);
    const [error, seterror] = useState(false);
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const User = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };


        try {
            console.log(User)
            const res = await axios.post("/users/login", User);
            console.log(res)
            console.log(" hello dudeeeeeeeee")
            console.log(res.data.Username)
            myStorage.setItem("user",res.data.Username)
            setcurrentUser(res.data.Username)
            setshowMap(true)
            setshowLogin(false)
            seterror(false);
        } catch (err) {
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

                <form onSubmit={handleSubmit} style = {{
                    width: 250,
                    height: 300,
                    display: 'flex',
                    flexDirection :"column",
                    justifyContent: 'space-around',
                    color :'white'}} >
                    <h1>Login</h1>
                    <div class="textbox">
                        <i class="fas fa-user"></i>
                        <input autoFocus type="text" placeholder="Username" ref={usernameRef} className="loginlabel" />

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

                    {success && (<span className="success">Successfull logged in!</span>)}
                    {error && <span className="failure">Something went wrong!</span>}

                </form>
            </div>


        </div>



    )



}



export default Login;