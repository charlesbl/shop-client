import axios, { AxiosResponse } from 'axios'
import { ICreateProduct, IProduct } from '../models/ProductFunctions'

const http = axios.create({
    baseURL: 'http://localhost:3001/products'
})

const getAll = async (): Promise<AxiosResponse<IProduct[], any>> => {
    return await http.get<IProduct[]>('')
}

const create = async (data: ICreateProduct, accessToken: string): Promise<AxiosResponse<IProduct, any>> => {
    return await http.post<IProduct>('', data, { headers: { Authorization: 'Bearer ' + accessToken } })
}

const remove = async (pId: string, accessToken: string): Promise<AxiosResponse<string, any>> => {
    return await http.delete<string>(pId, { headers: { Authorization: 'Bearer ' + accessToken } })
}

const getById = async (pId: string): Promise<AxiosResponse<IProduct, any>> => {
    return await http.get<IProduct>(pId)
}

const productService = {
    getAll,
    create,
    remove,
    getById
}

export default productService
