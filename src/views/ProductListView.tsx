import React from "react";
import { Link } from "react-router-dom";

export default class ProductListView extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <div>Produit A</div>
                    <Link to="/products/1"> First Product</Link>
                </div>
                <div>
                    <div>Produit B</div>
                    <Link to="/products/2"> Second Product</Link>
                </div>
            </div>
        );
    }
}