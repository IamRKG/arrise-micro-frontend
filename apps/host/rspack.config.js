import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";

export default defineConfig({
    entry: "./src/index.js",
    output:{
        uniqueName: "host",
    },
    devServer:{
        port:3000,
        historyApiFallback:true
    },
    resolve:{
        extensions:[".js", ".jsx"]
    },
    module:{
        rules:[{
            test: /\.(js|jsx)$/,
            use:{
                loader:"builtin:swc-loader",
                options:{
                    jsc:{
                        parser:{syntax:"ecmascript", jsx:true},
                        transform: {react: {runtime: "automatic"}},
                    }
                }
            }
        }]
    },
    plugins:[
        new rspack.HtmlRspackPlugin({
            template:"./public/index.html"
        }),
        new rspack.container.ModuleFederationPlugin({
            name: "host",
            remotes: {
                product:`product@${process.env.PRODUCT_URL || "http://localhost:3001"}/remoteEntry.js`,
                checkout: `checkout@${process.env.CHECKOUT_URL || "http://localhost:3002"}/remoteEntry.js`,
                cart: `cart@${process.env.CART_URL || "http://localhost:3003"}/remoteEntry.js`
            },
            shared:{
                react:{ singleton:true, eager:true},
                "react-dom":{ singleton:true, eager:true},
                 "react-router-dom": { singleton: true, eager: true },
            }
        }),
    ]
})
