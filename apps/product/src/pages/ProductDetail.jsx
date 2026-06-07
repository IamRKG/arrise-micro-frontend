  import React from "react";                                                               
  import { useParams, Link } from "react-router-dom";
                                                                                           
  const products = [                                                                     
    { id: 1, name: "Laptop", price: 999, description: "Powerful laptop" },
    { id: 2, name: "Phone", price: 699, description: "Latest smartphone" },                
    { id: 3, name: "Headphones", price: 199, description: "Noise cancelling" },
  ];                                                                                       
                                                                                         
  const ProductDetail = () => {                    
    const { id } = useParams();              
    const product = products.find((p) => p.id === Number(id));
                                             
    if (!product) return <p>Product not found</p>; 
                                              
    return (                                       
      <div>                                  
        <h2>{product.name}</h2>                                                            
        <p>{product.description}</p>          
        <p>Price: ${product.price}</p>                                                     
        <Link to="/product">Back to list</Link>                                          
      </div>                                                                               
    );                                 
  };                                                                                       
                                                                                         
  export default ProductDetail;