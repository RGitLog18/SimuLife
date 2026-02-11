const cors = require('cors');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios'); // Add this at the top of your server file

const { MongoClient } = require('mongodb');

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let url = "mongodb+srv://rajeedandge444_db_user:9tfO7Z639un07P7v@cluster0.fy4qqzp.mongodb.net/?appName=Cluster0";
const client = new MongoClient(url);

// Ensure uploads directory exists
const dir = './uploads';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

async function getCollection() {
    await client.connect();
    return client.db("Dt1").collection("User");
}

// --- 1. MongoDB Connection Setup for Patients ---
const dbName = 'Dt1';
let patientsCollection;

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
        const db = client.db(dbName);
        patientsCollection = db.collection('Patients');
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}
connectDB();

// --- 2. Multer Storage Config ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });
app.use('/uploads', express.static('uploads'));

// --- ROUTES ---

// SIGN UP ROUTE
app.post("/add", async (req, res) => {
    try {
        let collec = await getCollection();
        let obj = {
            firstname: req.body.firstName, 
            lastname: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        };
        let result = await collec.insertOne(obj);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// LOGIN ROUTE
app.post("/login", async (req, res) => {
    try {
        let collec = await getCollection();
        let user = await collec.findOne({ 
            email: req.body.email, 
            password: req.body.password 
        });

        if (user) {
            res.status(200).send({ message: "Login success", user });
        } else {
            res.status(401).send({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// CREATE PROFILE
app.post('/add-profile', upload.single('profilePhoto'), async (req, res) => {
    try {
        if (!patientsCollection) return res.status(500).json({ error: 'Database connection missing' });

        const patientData = { ...req.body, createdAt: new Date() };
        if (req.file) {
            patientData.profilePhotoUrl = `http://localhost:9000/uploads/${req.file.filename}`;
        }

        const result = await patientsCollection.insertOne(patientData);
        res.status(200).json({ message: 'Saved!', id: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// *NEW* UPDATE PROFILE ROUTE
app.post('/update-profile', upload.single('profilePhoto'), async (req, res) => {
    try {
        if (!patientsCollection) return res.status(500).json({ error: 'Database connection missing' });

        const { email } = req.body; // Anchor for the update
        if (!email) return res.status(400).json({ error: "Email is required to update profile" });

        const updatedData = { ...req.body };
        
        // If a new photo is uploaded, update the URL
        if (req.file) {
            updatedData.profilePhotoUrl = `http://localhost:9000/uploads/${req.file.filename}`;
        }

        // Remove the MongoDB ID from the update object if it exists to prevent errors
        delete updatedData._id;

        const result = await patientsCollection.updateOne(
            { email: email },
            { $set: updatedData }
        );

        if (result.matchedCount > 0) {
            res.status(200).json({ message: 'Digital Twin Updated Successfully!' });
        } else {
            res.status(404).json({ message: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET PROFILE BY EMAIL (Used by ExitUser to fetch data)
app.get('/get-profile/:email', async (req, res) => {
    try {
        if (!patientsCollection) return res.status(500).json({ error: 'Database not connected' });

        const patient = await patientsCollection.findOne({ email: req.params.email });
        if (patient) {
            res.status(200).json(patient);
        } else {
            res.status(404).json({ message: "Patient profile not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET ALL PATIENTS (For the list view)
app.get('/get-all-patients', async (req, res) => {
    try {
        if (!patientsCollection) return res.status(500).json({ error: 'Database not connected' });
        const patients = await patientsCollection.find({}).toArray();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/get-prediction', async (req, res) => {
    try {
        // 1. Log exactly what is arriving to debug
        console.log("Incoming Request Body:", req.body);

        let email = req.body.email;
        let disease = req.body.disease;

        // 2. FIX: If email is an object {email: '...'}, extract the string
        if (typeof email === 'object' && email !== null) {
            email = email.email; 
        }

        // 3. Validation
        if (!email) {
            return res.status(400).json({ error: "Email is missing from the request" });
        }

        const cleanEmail = String(email).trim();
        
        if (!patientsCollection) return res.status(500).json({ error: 'DB not connected' });
        
        const user = await patientsCollection.findOne({ 
            email: { $regex: new RegExp(`^${cleanEmail}$`, 'i') } 
        });

        if (!user) {
            return res.status(404).json({ error: `User profile with email "${cleanEmail}" not found.` });
        }

        // 4. Map data to Python
        const pythonPayload = {
            disease: disease,
            age: parseInt(user.age) || 25,
            weight: parseFloat(user.weight) || 70,
            bp: parseInt(user.bp?.toString().split('/')[0]) || 120, 
            alcohol: user.alcoholConsumption || 'Low',
            pregnant: user.pregnancy || 'No',
            blood: user.bloodGroup || 'O+'
        };

        const pythonResponse = await axios.post('http://localhost:5000/predict', pythonPayload);
        
        res.json({
            prediction: pythonResponse.data,
            patientName: user.fullName || "Patient"
        });

    } catch (error) {
        console.error("Route Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(9000, () => { console.log("Server running on port 9000") });