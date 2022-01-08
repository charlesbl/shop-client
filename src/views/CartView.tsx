import React from "react";
import Cart from "../models/Cart";
import CartProps from "../models/CartProps";
import LoadingDataState, { LoadState } from "../models/LoadingData";
import Product from "../models/Product";
import CartEntryComponent from "../components/CartEntryComponent";

interface ComponentState extends LoadingDataState<Product> {
    cart: Cart;
}

export default class CartView extends React.Component<CartProps, ComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: undefined,
            loadState: LoadState.LOADING,
            cart: this.props.getCart()
        }
    }

    componentDidMount(): void {
        this.props.getCart().setOnCartUpdate(() => {
            this.setState({
                cart: this.props.getCart()
            });
        });
    }

    componentWillUnmount(): void {
        this.props.getCart().setOnCartUpdate(() => { });
    }

    render(): JSX.Element {
        return (
            <div id="cart">
                <h1>
                    Cart
                </h1>
                <div>{this.state.cart.getEntries().map(([productId, quantity]) => {
                    return <CartEntryComponent productId={productId} quantity={quantity} getCart={this.props.getCart} />
                })}</div>
            </div>
        );
    }
}