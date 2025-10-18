import { createServer } from "miragejs";
import products from "./electronics.json"

export function makeServer(){
    const server=createServer({
        routes() {
            this.namespace="api";
            this.get("/homeItems",()=>{
                return products;
            })
        }
    })
    return server
}