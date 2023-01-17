import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthProvider'

const Logout: React.FC = (): JSX.Element => {
    const [, setToken] = useAuth()
    useEffect(() => setToken(undefined), [])

    return <Navigate to="/" />
}
export default Logout
