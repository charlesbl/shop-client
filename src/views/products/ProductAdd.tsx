import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthProvider'
import { useProducts } from '../../contexts/ProductsProvider'
import { ICreateProduct } from '../../models/ProductFunctions'
import productService from '../../services/product.service'
import { useIsMounted, regexPrice } from '../../utils'
import PriceInput from '../shared/PriceInput'

interface ComponentState {
    name: string
    desc: string
    price: string
}

const ProjectAdd = (): JSX.Element => {
    const defaultState: ComponentState = {
        name: 'Product name',
        desc: 'Description',
        price: '20.00'
    }
    const [state, setState] = useState(defaultState)
    const [actionText, setActionText] = useState<string | undefined>(undefined)
    const isMounted = useIsMounted()
    const [, , updateProducts] = useProducts()
    const [token] = useAuth()

    const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault()

        const product: ICreateProduct = {
            name: state.name,
            desc: state.desc,
            price: state.price.replaceAll('.', '').replaceAll(',', '')
        }

        if (token === undefined) {
            setActionText('Error: Unauthorized')
            return
        }
        setActionText('Adding...')
        await productService.create(product, token)
        updateProducts()
        if (!isMounted.current) return
        setActionText('Added !')
        setTimeout(() => {
            if (!isMounted.current) return
            setActionText(undefined)
        }, 500)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newState: ComponentState = { ...state, [e.target.name]: e.target.value }
        setState(newState)
    }

    const verifyForm = (): boolean => regexPrice.test(state.price)

    return (
        <form id="Add" onSubmit={(e) => { void handleSubmit(e) }}>
            <div>
                Name:
                {' '}

                <input
                    name="name"
                    onChange={handleChange}
                    type="text"
                    value={state.name} />
            </div>

            <div>
                Description:
                {' '}

                <input
                    name="desc"
                    onChange={handleChange}
                    type="text"
                    value={state.desc} />
            </div>

            <div>
                Price:
                {' '}

                <PriceInput
                    name="price"
                    onChange={handleChange}
                    value={state.price} />
            </div>

            <div>
                <input
                    disabled={!verifyForm() || actionText !== undefined}
                    type="submit"
                    value="Add product" />
            </div>

            {actionText !== undefined
                ? (
                    <div>
                        {actionText}
                    </div>
                )
                : ''}
        </form>
    )
}
export default ProjectAdd
