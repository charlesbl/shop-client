import React from "react";
import Product from "../models/Product";
import { create } from "../productService";

interface ComponentState {
    name: string,
    desc: string,
    price: string
}

const regexPrice = /^\d+(.\d{1,2})?$/;

export default class ProjectAddView extends React.Component<any, ComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: "product name",
            desc: "description",
            price: "30"
        };
        this.verifyForm();
    }

    async handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        let product: Product = {
            id: "",
            name: this.state.name,
            desc: this.state.desc,
            price: this.state.price
        };

        await create(product);
    }

    handleChange(e: any) {
        this.setState({ [e.target.name]: e.target.value } as Pick<ComponentState, any>);
        this.verifyForm();
    }

    verifyForm(): boolean {
        return regexPrice.test(this.state.price);
    }

    render() {
        return (
            <form id="Add" onSubmit={(e) => this.handleSubmit(e)}>
                <div>
                    Name: <input type="text" name="name" value={this.state.name} onChange={(e) => this.handleChange(e)}></input>
                </div>
                <div>
                    Description: <input type="text" name="desc" value={this.state.desc} onChange={(e) => this.handleChange(e)}></input>
                </div>
                <div>
                    Price: <input type="text" name="price" value={this.state.price} onChange={(e) => this.handleChange(e)}></input>
                </div>
                <div>
                    <input type="submit" value="Add product" disabled={!this.verifyForm()} />
                </div>
            </form>
        );
    }
}