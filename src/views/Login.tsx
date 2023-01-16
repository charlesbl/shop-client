import { useState } from "react";
import { Navigate } from "react-router-dom";
import authService from "../services/auth.service";
import { setLocalData, useIsMounted } from "../utils";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isFailed, setFailed] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const isMounted = useIsMounted()

    const onLogin = async () => {
        authService.login(username, password).then((res) => {
            const accessToken = res.data.accessToken
            setLocalData<string>("accessToken", accessToken)
            if (!isMounted.current) return
            setIsLogin(true)
        }).catch(() => {
            setFailed(true)
        })
    }
    const onSignup = async () => {
        authService.signup(username, password).then((res) => {
            console.log(res.data)
            onLogin()
        }).catch(() => {
            setFailed(true)
        })
    }
    if(isLogin) return <Navigate to="/products" />;

    return (
        <div id="login">
            <h1>
                Login
            </h1>
            {isFailed && 
            <div>
                Login failed
            </div>
                }
            <div>
                <label>Username</label>
                <input type={"text"} onChange={e => setUsername(e.target.value)}></input>
            </div>
            <div>
                <label>Password</label>
                <input type={"password"} onChange={e => setPassword(e.target.value)}></input>
            </div>
            <button onClick={() => onLogin()}>Login</button>
            <button onClick={() => onSignup()}>Signup</button>
        </div>
    );
}
export default Login;