import '../css/App.css';
import { Link } from 'react-router-dom';
import AppProvider from '../contexts/AppProvider';
import { RoutesDiv } from './Routes';

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
                    <RoutesDiv />
                </div >
            </div >
        </AppProvider>
    );
}
export default App;