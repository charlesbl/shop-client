import React from "react";
import CartProps from "../models/CartProps";
import LoadingDataState, { LoadState } from "../models/LoadingData";
import Product from "../models/Product";
import { getById } from "../productService";

interface ComponentProps extends CartProps {
    productId: string,
    quantity: number
}

export default class CartEntryComponent extends React.Component<ComponentProps, LoadingDataState<Product>> {
    private _isMounted: boolean;

    constructor(props: any) {
        super(props);

        this.state = {
            data: undefined,
            loadState: LoadState.LOADING
        }
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async componentDidMount() {
        const product = await this.fetchProduct();
        if (product) {
            if (this._isMounted) {
                this.setState({
                    data: product,
                    loadState: LoadState.SUCCESS
                });
            }
        }
    }

    async fetchProduct(): Promise<Product | undefined> {
        try {
            const res = await getById(this.props.productId);
            return res.data;
        } catch (ex) {
            console.error(ex);
            this.setState({
                loadState: LoadState.ERROR
            });
            return undefined;
        }
    }

    render(): JSX.Element {
        return (
            <div key={this.props.productId}>
                <div>
                    {this.state.loadState === LoadState.SUCCESS ? this.state.data?.name : this.props.productId}
                </div>
                <div>
                    {/* <button onClick={() => this.props.getCart().removeAmountFromCart(this.props.productId)}>-</button>
                    <div>{this.props.quantity}</div>
                    <button onClick={() => this.props.getCart().addToCart(this.props.productId)}>+</button> */}
                </div>
            </div>
        );
    }
}