  import { defineConfig } from "@rspack/cli";                                              
  import { rspack } from "@rspack/core";                                                 
                                             
  export default defineConfig({                   
    entry: "./src/index.js",                  
    output: {                                      
      uniqueName: "product",
      publicPath: "auto"

    },                                                                                     
    devServer: {                                                                           
      port: 3001,                                                                          
      historyApiFallback: true,
      headers:{
        "Access-Control-Allow-Origin": "*"
      }                                                            
    },                                                                                   
    resolve: {                             
      extensions: [".js", ".jsx"],                                                         
    },                                        
    module: {                                                                              
      rules: [                                                                           
        {                                                                                  
          test: /\.jsx?$/,                
          use: {                                                                           
            loader: "builtin:swc-loader",                                                
            options: {                     
              jsc: {                              
                parser: { syntax: "ecmascript", jsx: true },                               
                transform: { react: { runtime: "automatic" } },
              },                                                                           
            },                                                                           
          },                                      
        },                                   
      ],                                           
    },                                            
    plugins: [                               
      new rspack.HtmlRspackPlugin({                                                        
        template: "./public/index.html",
      }),
      new rspack.container.ModuleFederationPlugin({
        name:"product",
        filename:"remoteEntry.js",
        exposes:{
          "./App":"./src/App.jsx",
        },
        shared: {
          react:{singleton:true, eager: true},
          "react-dom":{singleton:true, eager: true},
           "react-router-dom": { singleton: true, eager: true },
        }
      })                                                                                  
    ],                                                                                   
  });