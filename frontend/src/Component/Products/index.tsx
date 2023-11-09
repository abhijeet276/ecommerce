import React from 'react'
import {  IProducts,} from '../../types/Products'
import { Link } from 'react-router-dom'
import { productData } from '../Home/data'
//  
// const options:IProductOptions={
//   edit:false,
//  color:"rgba(20,20,20)",
//  activeColor:'tomato',
//  value:'2.5',
//  isHalf:true,
//  size:window.innerWidth < 600 ? 20 : 25,
// }
const Product:React.FC<IProducts> = () => {
  return (
   <Link className='productCard' to ={productData.id}>
    <img src={productData.images[0].url} alt={productData.name}/>
       <p>{productData.name}</p>  
       <div>
        {/* <ReactStars {...options}/> */}
        {/* <span {...options}/> */}
        <span>(256 Reviews)</span>
        <div>

        </div>
       <span>{productData.price}</span>
       </div>

   </Link>
  )
}



export default Product