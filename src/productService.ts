import axios, { AxiosResponse } from "axios";
import Product from "./models/Product";
import ProductList from "./models/ProductList";

const http = axios.create({
    baseURL: "http://localhost:3001/",
    headers: {
        "Content-type": "application/json"
    }
});

export function getAll(): Promise<AxiosResponse<ProductList, any>> {
    return http.get<ProductList>("/products");
}

export function create(data: Product): Promise<AxiosResponse<Product, any>> {
    return http.post<Product>("/product/add", data);
}