import CartProps from "../models/CartProps";
import LoadingComponent from "../components/LoadingComponent";
import Product from "../models/Product";
import { remove } from "../productService";
import { Redirect } from "react-router-dom";

interface ComponentProps extends CartProps {
    onProductRemove: (p: Product) => Promise<void>;
}

enum DISPLAY_STATES {
    DISPLAY,
    REMOVING,
    REMOVED,
    REDIRECT
}

interface ComponentState {
    displayState: DISPLAY_STATES;
}

export default class ProductView extends LoadingComponent<Product, ComponentProps, ComponentState> {

    constructor(props: any) {
        super(props);

        this.state = {
            displayState: DISPLAY_STATES.DISPLAY
        };
    }

    removeProduct(p: Product) {
        this.setState({
            displayState: DISPLAY_STATES.REMOVING
        });
        remove(p.id).then((res) => {
            this.setState({
                displayState: DISPLAY_STATES.REMOVED
            });
            setTimeout(async () => {
                this.setState({
                    displayState: DISPLAY_STATES.REDIRECT
                });
                await this.props.onProductRemove(p);
            }, 1000);
        });
    }

    renderSuccess(p: Product) {
        return (
            <div>
                <div>{p.id} {p.name} {p.price}</div>
                <button onClick={() => this.props.onProductAddToCart(p.id)}>Add to cart</button>
                <button onClick={() => this.removeProduct(p)}>Remove from database</button>
            </div>
        );
    }

    render(): JSX.Element {
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
        return super.render();
    }
}