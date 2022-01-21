import '../css/App.css';
import Home from './Home';
import NotFound from './NotFound';
import ProductList from './ProductList';
import ProductAddView from './ProductAdd';
import { Link, Route, Routes } from 'react-router-dom';
import ProductView from './Product';
import CartView from './cart/Cart';
import AppProvider from '../contexts/AppProvider';

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
                    </nav>
                </header>
                <div id="main">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/product/:productId" element={<ProductView />} />
                        <Route path="/addproduct/" element={<ProductAddView />} />
                        <Route path="/cart/" element={<CartView />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div >
            </div >
        </AppProvider>
    );
}
export default App;