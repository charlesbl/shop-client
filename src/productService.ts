import axios, { AxiosResponse } from "axios";
import Product from "./models/Product";

const http = axios.create({
    baseURL: "http://localhost:3001/",
    headers: {
        "Content-type": "application/json"
    }
});

export function getAll(): Promise<AxiosResponse<Array<Product>, any>> {
    return http.get<Array<Product>>("/products");
}

export function create(data: Product): Promise<AxiosResponse<Product, any>> {
    return http.post<Product>("/product/add", data);
}

export function remove(pId: string): Promise<AxiosResponse<string, any>> {
    return http.delete<string>("/product/remove/" + pId);
}