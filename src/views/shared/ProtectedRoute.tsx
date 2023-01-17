import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthProvider'

const ProtectedRoute: React.FC = (): JSX.Element => {
    const [token] = useAuth()
    return token !== undefined ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute
