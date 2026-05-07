const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRequest = require('./middleware')
const rateLimit = require('express-rate-limit');
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

app.use(cors())
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: {
        status: 429,
        message: "Too many requests from this IP, please try again after 15 minutes"
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);
app.use(express.json());

// Setup MongoDB connection
let db;
const initDb = async () => {
    try {
        const client = new MongoClient("mongodb://localhost:27017/");
        await client.connect();
        db = client.db("lalded");
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }
};

// Middleware to inject db into request
app.use((req, res, next) => {
    if (!db) {
        return res.status(500).send({ message: "Database not initialized" });
    }
    req.db = db;
    next();
});

app.use(authRequest);

const verifyFields = (req,res,next) => {
    const fields = ["fname","lname","email","phone","query"]
    for(const i of fields){
        if(!req.body[i] || req.body[i].trim()==""){
            return res.status(401).send({"message":"Bad Input"})
        }
    }
    next();
}

app.post("/queries", async (req, res) => {
    try{
        const collection = req.db.collection("queries");
        const {fname, lname, query, email, phone} = req.body;
        await collection.insertOne({"fname":fname,"lname":lname,"query":query,"email":email,"phone":phone});
        return res.status(200).send({"message":"Your Query has been received. We will respond to you r query as soon as possible"})
    }
    catch(err){
        return res.status(500).send({ message: "Internal Server Error." });    
    }
});

// Tours Endpoints
app.get("/tours", async (req, res) => {
    try {
        const collection = req.db.collection("tours");
        const tours = await collection.find({}).toArray();
        return res.status(200).send(tours);
    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
});

app.get("/tours/:id", async (req, res) => {
    try {
        const collection = req.db.collection("tours");
        const tour = await collection.findOne({ _id: new ObjectId(req.params.id) });
        if (!tour) {
            return res.status(404).send({ message: "Tour not found" });
        }
        return res.status(200).send(tour);
    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
});

app.post("/tours", async (req, res) => {
    try {
        const collection = req.db.collection("tours");
        // Example payload: { title: "Pahalgam Trip", description: "...", price: 1500, duration: "3 Days" }
        const { title, description, price, duration, imageUrl } = req.body;
        
        if (!title || !description || !price) {
            return res.status(400).send({ message: "Missing required fields" });
        }
        
        const newTour = { title, description, price, duration, imageUrl, createdAt: new Date() };
        const result = await collection.insertOne(newTour);
        
        return res.status(201).send({ message: "Tour added successfully", tourId: result.insertedId });
    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
});

// Bookings Endpoint
app.post("/bookings", async (req, res) => {
    try {
        const collection = req.db.collection("bookings");
        const { tourId, fname, lname, email, phone, date, numberOfPeople } = req.body;
        
        if (!tourId || !fname || !email || !date || !numberOfPeople) {
            return res.status(400).send({ message: "Missing required fields" });
        }
        
        const newBooking = {
            tourId: new ObjectId(tourId),
            fname,
            lname,
            email,
            phone,
            date,
            numberOfPeople,
            createdAt: new Date(),
            status: "Pending"
        };
        
        const result = await collection.insertOne(newBooking);
        
        return res.status(201).send({ message: "Booking created successfully", bookingId: result.insertedId });
    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
});

app.get("/bookings", async (req, res) => {
    try {
        const collection = req.db.collection("bookings");
        const bookings = await collection.find({}).sort({ createdAt: -1 }).toArray();
        return res.status(200).send(bookings);
    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
});

app.get("/queries", async (req, res) => {
    try {
        const collection = req.db.collection("queries");
        // For queries, let's sort by insertion order (usually default but assuming no createdAt since it wasn't added before)
        const queries = await collection.find({}).toArray();
        return res.status(200).send(queries);
    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
});
const startServer = async () => {
    await initDb();
    app.listen(8000, () => {
        console.log("Running on 8000");
    });
};

startServer();
