let express = require("express");
let cors = require("cors");
let { MongoClient } = require("mongodb");

let app = express();
app.use(cors());
app.use(express.json());

let url = "mongodb+srv://rajeedandge444_db_user:9tfO7Z639un07P7v@cluster0.fy4qqzp.mongodb.net/?appName=Cluster0";
const client = new MongoClient(url);

async function getCollection() {
    await client.connect();
    return client.db("Dt1").collection("User");
}

// SIGN UP ROUTE
app.post("/add", async (req, res) => {
    try {
        let collec = await getCollection();
        // Matching the frontend names (firstName, lastName)
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
        // Check if user exists with this email and password
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

app.listen(9000, () => { console.log("Server running on port 9000") });