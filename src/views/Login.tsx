import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthProvider'
import authService from '../services/auth.service'
import { useIsMounted } from '../utils'

const Login = (): JSX.Element => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isFailed, setFailed] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const isMounted = useIsMounted()
    const [, setToken] = useAuth()

    const onLogin = async (): Promise<void> => {
        authService.login(username, password).then((res) => {
            const accessToken = res.data.accessToken
            setToken(accessToken)
            if (!isMounted.current) return
            setIsLogin(true)
        }).catch(() => {
            setFailed(true)
        })
    }
    const onSignup = async (): Promise<void> => {
        authService.signup(username, password).then((res) => {
            console.log(res.data)
            void onLogin()
        }).catch(() => {
            setFailed(true)
        })
    }
    if (isLogin) return <Navigate to="/products" />

    return (
        <div id="login">
            <h1>
                Login
            </h1>

            {isFailed && (
                <div>
                    Login failed
                </div>
            )}

            <div>
                <label>
                    Username
                </label>

                <input onChange={e => setUsername(e.target.value)} type="text" />
            </div>

            <div>
                <label>
                    Password
                </label>

                <input onChange={e => setPassword(e.target.value)} type="password" />
            </div>

            <button onClick={() => { void onLogin() }}>
                Login
            </button>

            <button onClick={() => { void onSignup() }}>
                Signup
            </button>
        </div>
    )
}
export default Login
