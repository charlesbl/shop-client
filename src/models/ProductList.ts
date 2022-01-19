import Product from "../models/Product";

export const getProductById = (productList: Array<Product>, id: string) => productList.find(p => p.id === id);