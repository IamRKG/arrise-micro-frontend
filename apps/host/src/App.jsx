 import React, { lazy, Suspense, useState, useEffect } from "react";
  import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";           
  import { auth } from "@arrise/shared-auth";     
  import VueWrapper from "./VueWrapper.jsx";                                          
                                                                                      
  const ProductApp = lazy(() => import("product/App"));                               
  const CheckoutApp = lazy(() => import("checkout/App"));                             
  const CartApp = lazy(() =>                      
    import("cart/App").then((m) => {                                                  
      const VueComponent = m.default || m;                                            
      return {                                
        default: () => <VueWrapper vueComponent={VueComponent} />,
      };                                         
    })                                                                                
  );                                             
                                                                                      
  const App = () => {                                                                 
    const [user, setUser] = useState(auth.getUser());                                 
                                                                                      
    useEffect(() => {                                                                 
      return auth.subscribe(setUser);                                                 
    }, []);                                                                           
                                                                                      
    const handleLogin = () => {                                                       
      auth.login({ name: "John", role: "admin" });                                    
    };                                           
                                                                                      
    return (                                                                          
      <BrowserRouter>                                                                 
        <div>                                                                         
          <h1>App Shell (Host)</h1>    
          <div>                                                                       
            {user ? (                     
              <span>                                                                  
                Welcome, {user.name} ({user.role})                                    
                <button onClick={() => auth.logout()}>Logout</button>
              </span>                              
            ) : (                                                                     
              <button onClick={handleLogin}>Login</button>
            )}                                                                        
          </div>                                                                      
          <nav>                              
            <NavLink to="/product">Product</NavLink> |
            <NavLink to="/cart">Cart</NavLink> | 
            <NavLink to="/checkout">Checkout</NavLink>
          </nav>                                                                      
          <hr />                                   
          <Routes>                                                                    
            <Route path="/product/*" element={                                        
              <Suspense fallback="Loading...">                                        
                <ProductApp />               
              </Suspense>                                                             
            } />                                                                      
            <Route path="/cart/*" element={
              <Suspense fallback={<p>Loading Cart...</p>}>
                <CartApp />                                                           
              </Suspense>                          
            } />                                                                      
            <Route path="/checkout/*" element={                                       
              <Suspense fallback="Loading...">   
                <CheckoutApp />                                                       
              </Suspense>                    
            } />                                                                      
            <Route path="/" element={<p>Select a micro-frontend above</p>} />         
          </Routes>                       
        </div>                                                                        
      </BrowserRouter>                            
    );                                                                                
  };                                                                                  
                                                  
  export default App;  