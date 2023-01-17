import '../../css/ProductList.css'
import { Navigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import productService from '../../services/product.service'
import { useProducts } from '../../contexts/ProductsProvider'
import { useCart } from '../../contexts/CartProvider'
import { useIsMounted } from '../../utils'
import { formatProductPrice, getProductById } from '../../models/ProductFunctions'
import ProductCartQuantity from '../shared/ProductCartQuantity'
import { useAuth } from '../../contexts/AuthProvider'

enum DisplayStates {
    DISPLAY,
    ERROR,
    REMOVING,
    REMOVED,
    REDIRECT
}

interface ComponentParams extends Record<string, string> {
    productId: string
}

const ProductView: React.FC = () => {
    const { productId } = useParams<ComponentParams>()
    const [displayState, setDisplayState] = useState(DisplayStates.DISPLAY)
    const [products, , updateProducts] = useProducts()
    const cart = useCart()
    const isMounted = useIsMounted()
    const [token] = useAuth()

    const product = productId !== undefined ? getProductById(products, productId) : undefined

    useEffect(() => {
        if (productId === undefined) {
            setDisplayState(DisplayStates.ERROR)
        }
    }, [productId])

    const removeProduct = (): void => {
        if (product == null) {
            return
        }
        if (token === undefined) {
            setDisplayState(DisplayStates.ERROR)
            return
        }
        setDisplayState(DisplayStates.REMOVING)
        void productService.remove(product._id, token).then(() => {
            updateProducts()
            if (!isMounted.current) return
            setDisplayState(DisplayStates.REMOVED)
            setTimeout((): void => {
                if (!isMounted.current) return
                setDisplayState(DisplayStates.REDIRECT)
            }, 500)
        })
    }

    const addProductDiv = (pid: string): JSX.Element => {
        if (cart.getCartQuantity(pid) !== undefined) { return <ProductCartQuantity productId={pid} /> } else {
            return (
                <button onClick={() => cart.addToCart(pid)}>
Add to cart
                </button>
            )
        }
    }

    const productDiv = (): JSX.Element | undefined => {
        return (product != null)
            ? (
                <div>
                    <div>
                        {product._id}
                    </div>

                    <div>
                        {product.name}
                    </div>

                    <div>
                        {product.desc}
                    </div>

                    <div>
                        {formatProductPrice(product.price)}
                    </div>

                    {addProductDiv(product._id)}

                    <div>
                        <button onClick={removeProduct}>
                        Remove from database
                        </button>
                    </div>
                </div>
            )
            : undefined
    }

    const displayDiv = (): JSX.Element => {
        switch (displayState) {
            case DisplayStates.DISPLAY:
                return productDiv() ?? <Navigate to="/NotFound" />
            case DisplayStates.ERROR:
                return (
                    <div>
                        Removing error...
                    </div>
                )
            case DisplayStates.REMOVING:
                return (
                    <div>
                        Removing...
                    </div>
                )
            case DisplayStates.REMOVED:
                return (
                    <div>
                        Removed
                    </div>
                )
            case DisplayStates.REDIRECT:
                return <Navigate to="/products" />
        }
    }

    return (
        <div>
            {displayDiv()}
        </div>
    )
}
export default ProductView
