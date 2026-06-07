  import React from "react";                                                          
  import { Link } from "react-router-dom";    
  import { Card, Button } from "@arrise/shared-ui";                                   
  import { eventBus } from "@arrise/event-bus";   
                                                                                      
  const products = [                                                                  
    { id: 1, name: "Laptop", price: 999 },                                            
    { id: 2, name: "Phone", price: 699 },                                             
    { id: 3, name: "Headphones", price: 199 },   
  ];                                                                                  
                                                                                      
  const ProductList = () => {              
     const addToCart = (product) => {                                                    
    const cart = eventBus.getStore("cart") || []; 
    cart.push(product);                      
    eventBus.setStore("cart", cart);               
    eventBus.emit("ADD_TO_CART", product);                                            
    alert(`${product.name} added to cart!`);      
  };                                                                              
                                              
    return (                                                                          
      <div>                                                                           
        <h2>Product List</h2>                                                         
        {products.map((p) => (             
          <Card key={p.id} title={p.name}>                                            
            <p>${p.price}</p>                                                         
            <Button onClick={() => addToCart(p)}>Add to Cart</Button>
            <Link to={`/product/${p.id}`}>                                            
              <Button variant="secondary">View Details</Button>
            </Link>                                                                   
          </Card>                                                                     
        ))}                                       
      </div>                                                                          
    );                                             
  };                                                                                  
                                                                                      
  export default ProductList;  