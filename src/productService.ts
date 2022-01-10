import axios from "axios";
import Product from "./models/Product";

const http = axios.create({
    baseURL: "http://localhost:3001/",
    headers: {
        "Content-type": "application/json"
    }
});

const getAll = () => {
    return http.get<Array<Product>>("/products");
}

const create = (data: Product) => {
    return http.post<Product>("/product/add", data);
}

const remove = (pId: string) => {
    return http.delete<string>("/product/remove/" + pId);
}

const getById = (pId: string) => {
    return http.get<Product>("/product/" + pId);
}

const productService = {
    getAll,
    create,
    remove,
    getById
};

export default productService;