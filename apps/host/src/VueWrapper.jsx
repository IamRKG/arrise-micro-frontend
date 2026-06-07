  import React, { useRef, useEffect, memo } from "react";                                                
                                                                                                       
  const VueWrapper = memo(({ vueComponent }) => {                                                        
    const containerRef = useRef(null);
    const appRef = useRef(null);                                                                         
                                                                                                       
    useEffect(() => {
      if (containerRef.current && vueComponent) {                                                        
        import("vue").then(({ createApp }) => {
          appRef.current = createApp(vueComponent);                                                      
          appRef.current.mount(containerRef.current);                                                  
        });                                   
      }                                   

      return () => {                                                                                     
        if (appRef.current) {
          appRef.current.unmount();                                                                      
        }                                                                                              
      };
    }, [vueComponent]);                       
                                          
    return <div ref={containerRef} />;
  });                                                                                                    
   
  export default VueWrapper;  