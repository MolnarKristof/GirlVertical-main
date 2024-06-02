const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();

// Middleware for parsing JSON bodies with increased limit
app.use(express.json({ limit: '50mb' })); // Adjust the limit as needed

// Enable CORS for specific origin
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// MongoDB connection string and client initialization
const uri = 'mongodb+srv://vereshrikhardandrash:CW5TIAl0Kz72qKtD@girlvertical.dpsyhh2.mongodb.net/?retryWrites=true&w=majority&appName=girlvertical';

const client = new MongoClient(uri);

// Connect to MongoDB
let db;
async function connectToMongo() {
    try {
        await client.connect();
        db = client.db("girlvertical");
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
}
connectToMongo();

// GET endpoint to fetch all users
app.get('/api/users', async (req, res) => {
    try {
        const collection = db.collection('people');
        const results = await collection.find({}).toArray();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST endpoint to add a new user
app.post('/api/users', async (req, res) => {
    try {
        const { nev, kor, lakhely, instagram, images, leiras, singli, hajszin } = req.body;
        const collection = db.collection('people');
        const result = await collection.insertOne({ nev, kor, lakhely, instagram, images, leiras, singli, hajszin });
        res.status(201).json({ id: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Server start
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
