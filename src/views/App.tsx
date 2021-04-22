import React from 'react';
import '../css/App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomeView from './HomeView';
import ProductListView from './ProductListView';
import ProductView from './ProductView';

export default class App extends React.Component {
    render() {
        return (

            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/"> Home</Link>
                            </li>
                            < li>
                                <Link to="/products"> All Products</Link>
                            </li>
                        </ul>
                    </nav>

                    <Route path="/" exact component={HomeView} />
                    <Route path="/products" exact component={ProductListView} />
                    <Route path="/products/:id" component={ProductView} />
                </div >
            </Router >
        );
    }
};
