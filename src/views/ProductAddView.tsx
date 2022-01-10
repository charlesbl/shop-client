import React, { useState } from "react";
import Product from "../models/Product";
import productService from "../productService";
import { regexPrice, useIsMounted } from "../utils";

interface ComponentState {
    name: string,
    desc: string,
    price: string
}

const ProjectAddView = () => {
    const [state, setState] = useState({
        name: "Product name",
        desc: "Description",
        price: "20.00"
    } as ComponentState);
    const [actionText, setActionText] = useState<string | undefined>(undefined);
    const isMounted = useIsMounted();

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const product: Product = {
            id: "",
            name: state.name,
            desc: state.desc,
            price: state.price.replaceAll(".", "").replaceAll(",", "")
        };

        setActionText("Adding...");
        await productService.create(product);
        if (!isMounted)
            return;
        setActionText("Added !");
        setTimeout(() => {
            if (isMounted)
                setActionText(undefined);
        }, 1000);
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState = { ...state, [e.target.name]: e.target.value } as ComponentState;
        setState(newState);
    }


    const verifyForm = () => {
        return regexPrice.test(state.price);
    }

    return (
        <form id="Add" onSubmit={handleSubmit}>
            <div>
                Name: <input type="text" name="name" value={state.name} onChange={handleChange}></input>
            </div>
            <div>
                Description: <input type="text" name="desc" value={state.desc} onChange={handleChange}></input>
            </div>
            <div>
                Price: <input type="text" name="price" value={state.price} onChange={handleChange}></input>
            </div>
            <div>
                <input type="submit" value="Add product" disabled={!verifyForm() || actionText !== undefined} />
            </div>
            {actionText !== undefined ?
                <div>
                    {actionText}
                </div> : ""}
        </form>
    );
}
export default ProjectAddView;