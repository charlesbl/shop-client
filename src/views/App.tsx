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

const App = () => {
    return (
        <AppProvider>
            <div>
                <header>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/products">All Products</Link>
                        <Link to="/addproduct">Add Product</Link>
                        <Link to="/cart">Cart</Link>
                        <Link to="/login">Login</Link>
                    </nav>
                </header>
                <div id="main">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/product/:productId" element={<Product />} />
                        <Route path="/addproduct/" element={<ProductAdd />} />
                        <Route path="/cart/" element={<Cart />} />
                        <Route path="/login/" element={<Login />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div >
            </div >
        </AppProvider>
    );
}
export default App;