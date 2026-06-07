 import React from "react";                                                               
                                                                                           
  const App = () => {                                                                      
    return (                                  
      <div style={{ border: "2px solid green", padding: "16px", margin: "16px" }}>         
        <h2>Checkout App (Team C)</h2>            
        <p>This is the Checkout micro-frontend</p>                                         
        <ul>                               
          <li>Subtotal: $179.97</li>                                                       
          <li>Shipping: $5.00</li>            
          <li>Total: $184.97</li>                                                          
        </ul>                                     
        <button>Place Order</button>                                                       
      </div>                                       
    );                                                                                     
  };                                              
                                             
  export default App;