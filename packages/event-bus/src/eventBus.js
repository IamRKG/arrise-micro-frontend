const GLOBAL_KEY = "__ARRISE_EVENT_BUS__";                                          
                                                                                      
  if (!window[GLOBAL_KEY]) {                                                          
    window[GLOBAL_KEY] = {                                                            
      events: {},                                                                     
      store: {},                                                                      
    };                                                                                
  }                                              
                                                                                      
  const state = window[GLOBAL_KEY];                                                   
                                                                                      
  export const eventBus = {                                                           
    on(event, callback) {                                                             
      if (!state.events[event]) {                                                     
        state.events[event] = new Set();                                              
      }                                          
      state.events[event].add(callback);                                              
                                                                                      
      return () => state.events[event].delete(callback);
    },                                                                                
                                                                                      
    emit(event, data) {                           
      if (state.events[event]) {                                                      
        state.events[event].forEach((callback) => callback(data));
      }                                                                               
    },                                                                                
                                       
    off(event, callback) {                       
      if (state.events[event]) {           
        state.events[event].delete(callback);     
      }                                                                               
    },                                             
                                                                                      
    // Persistent store for cross-route data                                          
    setStore(key, value) {                                                            
      state.store[key] = value;                  
    },                                                                                
                                                                                      
    getStore(key) {                                
      return state.store[key];                    
    },                                       
  };   