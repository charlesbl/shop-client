import React from 'react';
import '../css/App.css';
import { Route, Link, RouteComponentProps, Switch } from "react-router-dom";
import HomeView from './HomeView';
import NotFoundView from './NotFoundView';
import ProductListView from './ProductListView';
import ProductView from './ProductView';
import ProductAddView from './ProductAddView';
import CartView from './CartView';
import Cart from '../models/Cart';

export default class App extends React.Component {
    private cart: Cart;

    constructor(props: any) {
        super(props);
        this.cart = new Cart();
        this.addProductAndUpdateCart = this.addProductAndUpdateCart.bind(this);
    }

    addProductAndUpdateCart(productId: string) {
        this.cart.addToCart(productId);
    }


    render() {
        return (

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
                    <Switch>
                        <Route path="/" exact component={HomeView} />
                        <Route path="/products" component={() => {
                            return <ProductListView getCart={() => this.cart} />
                        }} />
                        <Route path="/product/:id" component={(routeComponent: RouteComponentProps<any>) => {
                            return <ProductView productId={routeComponent.match.params.id} getCart={() => this.cart} />
                        }} />
                        <Route path="/addproduct/" component={ProductAddView} />
                        <Route path="/cart/" component={() => {
                            return <CartView getCart={() => this.cart} />
                        }} />
                        <Route component={NotFoundView} />
                    </Switch>
                </div >
            </div >
        );
    }
};
