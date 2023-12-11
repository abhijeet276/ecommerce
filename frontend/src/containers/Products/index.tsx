import { Product } from "../../../types/IProduct";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useAlert } from "react-alert";
import { fetchProducts } from "../../redux/services/productService";
import "./products.scss"
const Products = () => {
    const dispatch = useAppDispatch();
    const alert = useAlert()
    const { isFetching, isError, error } = useAppSelector(state => state.product)
    const [products, setProducts] = useState<Product[]>([])
    useEffect(() => {
        if (isError) alert.error(error.message)
    }, [error])
    useEffect(() => {
        dispatch(fetchProducts()).unwrap().then(d => {
            if (d && Array.isArray(d.results)) setProducts(d.results)
        })
    }, [])
    return (
        <>
            <h2 className="productsHeading">Products</h2>
            <div className="products">
                {products &&
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
            </div>
        </>
    )
}

export default Products