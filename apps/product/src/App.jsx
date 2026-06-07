  import React, { useState, useEffect } from "react";
  import { Routes, Route } from "react-router-dom";                                   
  import { auth } from "@arrise/shared-auth";                                         
  import ProductList from "./pages/ProductList.jsx";                                  
  import ProductDetail from "./pages/ProductDetail.jsx";                              
                                                                                      
  const App = () => {                                                                 
    const [user, setUser] = useState(auth.getUser());                                 
                                                                                      
    useEffect(() => {                                                               
      return auth.subscribe(setUser);                                                 
    }, []);                                                                         
                                                                                      
    return (                                                                          
      <div style={{ border: "2px solid blue", padding: "16px", margin: "16px" }}>     
        <h1>Product App (Team A)</h1>                                                 
        <p>{user ? `Logged in as: ${user.name}` : "Not logged in"}</p>              
        <Routes>                                                                      
          <Route path="/" element={<ProductList />} />                                
          <Route path="/:id" element={<ProductDetail />} />
        </Routes>                                                                     
      </div>                                                                        
    );                                                                                
  };                                                                                
                                                                                      
  export default App; 