<template>                                                                          
    <div :style="cartStyle">                      
      <h2>Cart App (Team B)</h2>             
      <p v-if="items.length === 0">Cart is empty</p>
      <ul>                                                                            
        <li v-for="item in items" :key="item.id">
          {{ item.name }} - ${{ item.price }}                                         
          <button @click="removeItem(item.id)">Remove</button>                        
        </li>                                                                         
      </ul>                               
      <p v-if="items.length > 0">                                                     
        <strong>Total: ${{ total }}</strong>                                          
      </p>                                       
    </div>                                                                            
  </template>                                                                         
                                             
  <script>                                                                            
  import { eventBus } from "@arrise/event-bus";                                       
                                             
  export default {                                                                    
    name: "CartApp",                      
    data() {                                                                          
      return {                                                                        
        items: [],                               
        cartStyle: {                                                                  
          border: "2px solid orange",
          padding: "16px",                                                            
          margin: "16px",                                                             
        },                                 
      };                                          
    },                                                                                
    computed: {                                    
      total() {                                                                       
        return this.items.reduce((sum, item) => sum + item.price, 0);                 
      },                               
    },                                           
    methods: {                            
      removeItem(id) {                     
        this.items = this.items.filter((item) => item.id !== id);
        eventBus.setStore("cart", this.items);
      },                                           
    },                                    
    mounted() {                                                                       
      // Load existing cart items      
      const existing = eventBus.getStore("cart") || [];                               
      this.items = [...existing];                                                     
                                                  
      // Listen for new additions            
      this.unsubscribe = eventBus.on("ADD_TO_CART", (product) => {
        this.items.push({ ...product });          
      });                                    
    },                                                                                
    beforeUnmount() {                            
      if (this.unsubscribe) {                                                         
        this.unsubscribe();                                                           
      }                                          
    },                                        
  };                                      
  </script>