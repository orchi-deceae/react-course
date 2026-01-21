import { useState } from "react"
import "../../styles/loginForm.css"

function LoginForm(){
    const [showPassword, setShowPassword] = useState(true);
    function useShowPassword(){setShowPassword(!showPassword)};

    return (<div className="login-form-">
        <div className="text-">Hello, welcome to my website</div>
        <div><input type="text" placeholder="Email" /></div>
        <div><input type={showPassword ? "password" : "text"} placeholder="Password" /></div>
        <button onClick={useShowPassword}>{showPassword ? "show" : "hide"}</button>
        <button>Login</button>
        <button>Sign up</button>
    </div>)
}

export default LoginForm