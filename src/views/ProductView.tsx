import React from "react";
import { RouteComponentProps } from "react-router-dom";

interface ProductRouterProps {
    id: string;
}

export default class ProductView extends React.Component<RouteComponentProps<ProductRouterProps>> {
    render() {
        return (
            <div>
                {this.props.match.params.id}
            </div>
        );
    }
}