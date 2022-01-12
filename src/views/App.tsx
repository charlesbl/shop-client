import '../css/App.css';
import HomeView from './HomeView';
import NotFoundView from './NotFoundView';
import ProductListView from './ProductListView';
import ProductAddView from './ProductAddView';
import { Link, Route, Routes } from 'react-router-dom';
import ProductView from './ProductView';
import CartView from './CartView';
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
                        <Route path="/" element={<HomeView />} />
                        <Route path="/products" element={<ProductListView />} />
                        <Route path="/product/:productId" element={<ProductView />} />
                        <Route path="/addproduct/" element={<ProductAddView />} />
                        <Route path="/cart/" element={<CartView />} />
                        <Route path="*" element={<NotFoundView />} />
                    </Routes>
                </div >
            </div >
        </AppProvider>
    );
}
export default App;