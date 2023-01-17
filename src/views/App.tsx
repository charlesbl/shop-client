import '../css/App.css';
import { Link, Route, Routes } from 'react-router-dom';
import AppProvider from '../contexts/AppProvider';
import Cart from './cart/Cart';
import Home from './Home';
import NotFound from './NotFound';
import Product from './products/Product';
import ProductAdd from './products/ProductAdd';
import ProductList from './products/ProductList';
import Login from './Login';
import ProtectedRoute from './shared/ProtectedRoute';
import { useIsLogged } from '../contexts/AuthProvider';
import Logout from './Logout';

const NavBar = () => {
    const isLogged = useIsLogged()
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/products">All Products</Link>
            {isLogged && <Link to="/addproduct">Add Product</Link>}
            <Link to="/cart">Cart</Link>
            {isLogged ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
        </nav>
    )
}

const App = () => {
    return (
        <AppProvider>
            <div>
                <header>
                    <NavBar />
                </header>
                <div id="main">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/product/:productId" element={<Product />} />
                        <Route path="/cart/" element={<Cart />} />
                        <Route path="/login/" element={<Login />} />
                        <Route path="/logout/" element={<Logout />} />
                        <Route path="*" element={<NotFound />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/addproduct/" element={<ProductAdd />} />
                        </Route>
                    </Routes>
                </div >
            </div >
        </AppProvider>
    );
}
export default App;