import { Link } from "react-router-dom";
import Product from "../models/Product";
import ProductList from "../models/ProductList";
import "../css/ProductList.css"
import { getLocalData, regexPrice, setLocalData } from "../utils";
import LoadingDataState, { LoadState } from "../models/LoadingData";
import { getAll } from "../productService";
import React from "react";
import CartProps from "../models/CartProps";

const LOCALSTORAGE_DATA_KEY = "product_list";

export default class ProductListView extends React.Component<CartProps, LoadingDataState<ProductList>> {
    private _isMounted: boolean;

    constructor(props: any) {
        super(props);

        this.state = {
            loadState: LoadState.LOADING,
            data: getLocalData(LOCALSTORAGE_DATA_KEY)
        }
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async componentDidMount() {
        const plist = await this.fetchProduct();
        if (this._isMounted && plist) {
            this.setState({
                data: plist,
                loadState: LoadState.SUCCESS
            });
            setLocalData<ProductList>(LOCALSTORAGE_DATA_KEY, plist);
        }
    }

    async fetchProduct(): Promise<ProductList | undefined> {
        try {
            const res = await getAll();
            const plist: ProductList = new ProductList();
            plist.push(...res.data);
            return plist;
        } catch (ex) {
            console.error(ex);
            this.setState({
                loadState: LoadState.ERROR
            });
            return undefined;
        }
    }

    renderProduct(product: Product) {
        const errorPrice: boolean = !regexPrice.test(product.price);
        const priceDiv = errorPrice ? <div className="price">Error</div> : <div className="price">{(Number.parseInt(product.price) / 100).toFixed(2)} €</div>
        return (
            <div key={product.id} className="short-product">
                <h2 className="name"><Link to={"/product/" + product.id}>{product.name}</Link></h2>
                <p className="description">{product.desc}</p>
                <div>
                    {priceDiv}
                    <button onClick={() => this.props.getCart().addToCart(product.id)}>Buy</button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div id="product-list">
                {this.state.loadState === LoadState.LOADING ? <div>Loading...</div> : ""}
                {this.state.data?.map((product: Product) => this.renderProduct(product))}
            </div>
        );
    }
}