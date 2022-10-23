import React, { useState } from "react";
import { useProducts } from "../../contexts/ProductsProvider";
import { ICreateProduct } from "../../models/ProductFunctions";
import productService from "../../services/product.service";
import { useIsMounted, regexPrice } from "../../utils";
import PriceInput from "../shared/PriceInput";

interface ComponentState {
    name: string,
    desc: string,
    price: string
}

const ProjectAdd = () => {
    const [state, setState] = useState({
        name: "Product name",
        desc: "Description",
        price: "20.00"
    } as ComponentState);
    const [actionText, setActionText] = useState<string | undefined>(undefined);
    const isMounted = useIsMounted();
    const [, , updateProducts] = useProducts();

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const product: ICreateProduct = {
            name: state.name,
            desc: state.desc,
            price: state.price.replaceAll(".", "").replaceAll(",", "")
        };

        setActionText("Adding...");
        await productService.create(product);
        updateProducts();
        if (!isMounted.current) return;
        setActionText("Added !");
        setTimeout(() => {
            if (!isMounted.current) return;
            setActionText(undefined);
        }, 500);
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState = { ...state, [e.target.name]: e.target.value } as ComponentState;
        setState(newState);
    }

    const verifyForm = () => regexPrice.test(state.price);

    return (
        <form id="Add" onSubmit={handleSubmit}>
            <div>
                Name: <input type="text" name="name" value={state.name} onChange={handleChange}></input>
            </div>
            <div>
                Description: <input type="text" name="desc" value={state.desc} onChange={handleChange}></input>
            </div>
            <div>
                Price: <PriceInput name="price" value={state.price} onChange={handleChange} />
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
export default ProjectAdd;