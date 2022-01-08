import Product from "../models/Product";
import { getById, remove } from "../productService";
import { Redirect } from "react-router-dom";
import LoadingDataState, { LoadState } from "../models/LoadingData";
import React from "react";
import { getLocalData, setLocalData } from "../utils";
import CartProps from "../models/CartProps";

enum DISPLAY_STATES {
    DISPLAY,
    REMOVING,
    REMOVED,
    REDIRECT
}

interface ComponentState extends LoadingDataState<Product> {
    displayState: DISPLAY_STATES;
}

interface ComponentProps extends CartProps {
    productId: string;
}

const LOCALSTORAGE_DATA_KEY = "product";
export default class ProductView extends React.Component<ComponentProps, ComponentState> {
    private _isMounted: boolean;

    constructor(props: ComponentProps) {
        super(props);

        this.state = {
            loadState: LoadState.LOADING,
            data: getLocalData(LOCALSTORAGE_DATA_KEY + props.productId),
            displayState: DISPLAY_STATES.DISPLAY
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
            setLocalData<Product>(LOCALSTORAGE_DATA_KEY + this.props.productId, product);
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

    removeProduct(p: Product) {
        this.setState({
            displayState: DISPLAY_STATES.REMOVING
        });
        remove(p.id).then((res) => {
            if (!this._isMounted)
                return;
            this.setState({
                displayState: DISPLAY_STATES.REMOVED
            });
            setTimeout(async () => {
                if (!this._isMounted)
                    return;
                this.setState({
                    displayState: DISPLAY_STATES.REDIRECT
                });
            }, 1000);
        });
    }

    renderSuccess(p: Product) {
        return (
            <div>
                <div>{p.id} {p.name} {p.desc} {p.price}</div>
                <button onClick={() => this.props.getCart().addToCart(p.id)}>Add to cart</button>
                <button onClick={() => this.removeProduct(p)} disabled={this.state.loadState !== LoadState.SUCCESS}>Remove from database</button>
            </div>
        );
    }

    render() {
        if (this.state.displayState === DISPLAY_STATES.REDIRECT) {
            return (
                <Redirect to="/products" />
            );
        }
        if (this.state.displayState === DISPLAY_STATES.REMOVED) {
            return (
                <div>Removed</div>
            );
        }
        if (this.state.displayState === DISPLAY_STATES.REMOVING) {
            return (
                <div>Removing...</div>
            );
        }
        if (this.state.data) {
            return this.renderSuccess(this.state.data);
        } else {
            return (
                <div>loading...</div>
            );
        }
    }
}