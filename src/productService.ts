import axios from "axios";
import IProduct from "./models/ProductFunctions";

const http = axios.create({
    baseURL: "http://localhost:3001/",
    headers: {
        "Content-type": "application/json"
    }
});

const getAll = () => {
    return http.get<Array<IProduct>>("/product/all");
}

const create = (data: IProduct) => {
    return http.put<IProduct>("/product/", data);
}

const remove = (pId: string) => {
    return http.delete<string>("/product/" + pId);
}

const getById = (pId: string) => {
    return http.get<IProduct>("/product/" + pId);
}

const productService = {
    getAll,
    create,
    remove,
    getById
};

export default productService;