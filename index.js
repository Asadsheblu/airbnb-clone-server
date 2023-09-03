
const express=require("express")
const app=express()

require('dotenv').config()
const cors=require('cors');
const { MongoClient, ServerApiVersion} = require('mongodb');
const { query } = require('express')
app.use(cors())


const port = 5000;
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Hello Airbnb")
})
var uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.7auxx.mongodb.net:27017,cluster0-shard-00-01.7auxx.mongodb.net:27017,cluster0-shard-00-02.7auxx.mongodb.net:27017/?ssl=true&replicaSet=atlas-quc4tl-shard-0&authSource=admin&retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try {
    await client.connect();
        
    const products=client.db("Airbnb").collection("products")
    
    app.post("/product", async (req, res) => {
      const doc=req.body
       const result =await products.insertOne(doc);
      
       res.send(result);
     });
    
     app.get("/product",async(req,res)=>{
      const query={}
        const result=products.find(query)
        const post=await result.toArray()
        res.send(post)
        
     })
     
  
     
  } 
  finally {
    // await client.close();
  }
}
run().catch(console.dir);
app.listen(port,()=>{
  console.log(`Running server ${port}`);

})
