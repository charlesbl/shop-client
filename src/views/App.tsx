import React from 'react';
import '../css/App.css';
import { Route, Link, RouteComponentProps, Switch } from "react-router-dom";
import HomeView from './HomeView';
import NotFoundView from './NotFoundView';
import ProductListView from './ProductListView';
import ProductView from './ProductView';
import ProductAddView from './ProductAddView';
import LoadingDataState, { LoadState } from '../models/LoadingData';
import ProductList from '../models/ProductList';

interface AppState extends LoadingDataState<ProductList> {
    cart: Map<string, number>;
}

export default class App extends React.Component<any, AppState> {

    constructor(props: any) {
        super(props);
        this.state = {
            data: undefined,
            loadState: LoadState.LOADING,
            cart: new Map<string, number>()
        };
    }

    removeUnavailableProductFromCart() {
        //Verify if all product in cart are available
        Array.from(this.state.cart.keys()).forEach((id: string) => {
            if (this.state.data) {
                if (!this.state.data.getProductById(id)) {
                    this.removeAllFromCart(id);
                }
            }
        });
    }

    removeAllFromCart(id: string) {
        let newCard = this.state.cart;
        newCard.delete(id);
        this.setState({
            cart: newCard
        });
    }

    removeFromCart(id: string, count: number = 1) {
        let oldValue = this.state.cart.get(id);
        if (!oldValue) { return; }
        if (oldValue <= count) {
            this.removeAllFromCart(id);
        }
        let newCart = this.state.cart.set(id, oldValue - count);
        this.setState({
            cart: newCart
        });
    }

    addToCart(id: string, count: number = 1) {
        let oldValue = this.state.cart.get(id);
        if (!oldValue)
            oldValue = 0;
        let newCart = this.state.cart.set(id, oldValue + count);
        this.setState({
            cart: newCart
        });
    }


    render() {
        return (

            <div>
                <header>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/products">All Products</Link>
                        <Link to="/addproduct">Add Product</Link>
                    </nav>
                </header>
                <div id="main">
                    <Switch>
                        <Route path="/" exact component={HomeView} />
                        <Route path="/products" component={() => {
                            return <ProductListView onProductAddToCart={(id: string) => this.addToCart(id)} />
                        }} />
                        <Route path="/product/:id" component={(routeComponent: RouteComponentProps<any>) => {
                            return <ProductView productId={routeComponent.match.params.id} />
                        }} />
                        <Route path="/addproduct/" component={ProductAddView} />
                        <Route component={NotFoundView} />
                    </Switch>
                </div >
            </div >
        );
    }
};
