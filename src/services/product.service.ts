import axios from "axios";
import { ICreateProduct, IProduct } from "../models/ProductFunctions";

const http = axios.create({
    baseURL: "http://localhost:3001/products"
});

const getAll = () => {
    return http.get<Array<IProduct>>("");
}

const create = (data: ICreateProduct) => {
    return http.post<IProduct>("", data);
}

const remove = (pId: string) => {
    return http.delete<string>(pId);
}

const getById = (pId: string) => {
    return http.get<IProduct>(pId);
}

const productService = {
    getAll,
    create,
    remove,
    getById
};

export default productService;