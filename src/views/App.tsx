import React from 'react';
import '../css/App.css';
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from "react-router-dom";
import HomeView from './HomeView';
import ProductListView from './ProductListView';
import ProductView from './ProductView';
import ProductAddView from './ProductAddView';
import LoadingData, { LoadState } from '../models/LoadingData';
import ProductList from '../models/ProductList';
import { getAll } from '../productService';

interface AppState extends LoadingData<ProductList> {
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

    async componentDidMount() {
        this.fetchProduct();
    }

    async fetchProduct() {
        let success;
        getAll().then((res) => {
            this.setState({
                data: res.data,
                loadState: LoadState.SUCCESS
            });
            success = true;
        }).catch((ex) => {
            console.error(ex);
            this.setState({
                loadState: LoadState.ERROR
            });
            success = false;
        });

        if (success) {
            //Verify if all product in cart are available
            Array.from(this.state.cart.keys()).forEach((id: string) => {
                if (this.state.data) {
                    if (!this.state.data.getProductById(id)) {
                        this.removeAllFromCart(id);
                    }
                }
            });
        }
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

            <Router>
                <header>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/products">All Products</Link>
                        <Link to="/addproduct">Add Product</Link>
                    </nav>
                </header>
                <div id="main">

                    <Route path="/" exact component={HomeView} />
                    <Route path="/products" exact component={() => {
                        return <ProductListView
                            loadState={this.state.loadState}
                            data={this.state.data}
                            onAddToCart={(id: string) => this.addToCart(id)} />
                    }} />
                    <Route path="/product/:id" component={(routeComponent: RouteComponentProps<any>) => {
                        return <ProductView
                            loadState={this.state.loadState}
                            data={this.state.data?.getProductById(routeComponent.match.params.id)}
                            onAddToCart={(id: string) => this.addToCart(id)} />
                    }} />
                    <Route path="/addproduct/" component={(routeComponent: RouteComponentProps<any>) => {
                        return <ProductAddView />
                    }} />
                    {/*
                    <button onClick={() => this.fetchProduct()}>SUCCESS</button>
                    <button onClick={() => this.setState({ loadState: LoadState.ERROR })}>ERROR</button>
                    <button onClick={() => this.setState({ loadState: LoadState.SUCCESS, data: new ProductList() })}>No products</button>
                    <button onClick={() => this.setState({ loadState: LoadState.LOADING })}>reset</button>
                    */}
                </div >
            </Router >
        );
    }
};
