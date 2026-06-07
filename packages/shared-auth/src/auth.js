  const GLOBAL_KEY = "__ARRISE_AUTH__";                                               
                                                                                      
  if (!window[GLOBAL_KEY]) {                                                          
    window[GLOBAL_KEY] = {                                                            
      currentUser: null,                                                              
      listeners: new Set(),                      
    };                                                                                
  }                                                                                   
                                                                                      
  const state = window[GLOBAL_KEY];           
                                                                                      
  export const auth = {                                                               
    login(user) {                                                                     
      state.currentUser = user;                                                       
      state.listeners.forEach((fn) => fn(state.currentUser));                         
    },                                                                                
                                                                                      
    logout() {                                                                        
      state.currentUser = null;                                                       
      state.listeners.forEach((fn) => fn(null));  
    },                                                                                
                                                                                      
    getUser() {                               
      return state.currentUser;           
    },                                           
                                                                                      
    isLoggedIn() {                        
      return state.currentUser !== null;                                              
    },                                                                                
                                             
    subscribe(fn) {                                
      state.listeners.add(fn);                                                        
      return () => state.listeners.delete(fn);
    },                                                                                
  };                                                                                  
          