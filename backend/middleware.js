require("dotenv").config();

const authRequest = async (req, res, next) => {
    const header = req?.headers?.secret;
    if (!header) return res.status(403).send({ message: "Unauthorized User" });
  
    if (header === process.env.SECRET) { 
        return next();
    }
    
    return res.status(401).send({ message: "Invalid Request" });
};

module.exports = authRequest;