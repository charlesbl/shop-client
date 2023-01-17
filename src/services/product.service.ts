import axios, { AxiosResponse } from 'axios'
import { ICreateProduct, Product } from '../models/ProductFunctions'

const http = axios.create({
    baseURL: 'http://localhost:3001/products'
})

const getAll = async (): Promise<AxiosResponse<Product[], any>> => {
    return await http.get<Product[]>('')
}

const create = async (data: ICreateProduct, accessToken: string): Promise<AxiosResponse<Product, any>> => {
    return await http.post<Product>('', data, { headers: { Authorization: 'Bearer ' + accessToken } })
}

const remove = async (pId: string, accessToken: string): Promise<AxiosResponse<string, any>> => {
    return await http.delete<string>(pId, { headers: { Authorization: 'Bearer ' + accessToken } })
}

const getById = async (pId: string): Promise<AxiosResponse<Product, any>> => {
    return await http.get<Product>(pId)
}

const productService = {
    getAll,
    create,
    remove,
    getById
}

export default productService
