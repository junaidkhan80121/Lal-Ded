require("dotenv").config();
const {MongoClient} = require("mongodb");

const authRequest = async (req, res, next) => {
    const header = req?.headers?.secret;
    if (!header) return res.status(403).send({ message: "Unauthorized User" });
  
    if (header == process.env.SECRET){ 
      try{
        const client = new MongoClient("mongodb://localhost:27017/");//process.env.MONGO_URI);
        await client.connect();
        const database = client.db("lalded");
        const collection = database.collection("queries");
        req.collection = collection;
        return next();
        }
        catch(err){
            console.log("Error",err);
            return res.status(500).send({ message: "Internal Server Error" });
        }
      }
      return res.status(401).send({ message: "Invalid Request" });
  };
  

  module.exports = authRequest;