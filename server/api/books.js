const express = require('express');
const path = require('path')
const multer = require("multer");
require('dotenv').config();
const fs = require('fs')
// const ext = require('./fs-extractor');
const router = express.Router()


const { MongoClient, ObjectId} = require('mongodb');

const MONGO_URI = process.env.MongoDB;
const DATABASE_NAME = 'library';
const COLLECTION_NAME = 'bookdata';



let invoke = (fn) => {
    return (req, res, next) => {
        fn(req, res)
        .then((rval) => (req.rval = rval) ? next("route") : next())   //  single = is intentional here!
        .catch(next);
    }
}



let dataentry = async (req, res) => {
    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect();

        const database = client.db(DATABASE_NAME);
        const collection = database.collection(COLLECTION_NAME);

        const extractorData = req.body;

        const existingBook = await collection.findOne({ title: extractorData.title });

        if (existingBook) {
    // Book already present, send JSON response
            console.log("Book already present!");
            return { statusCode: 201, body: JSON.stringify({data: "0"}) };
       }

       const result = await collection.insertOne(extractorData);
       console.log("Book inserted successfully!");


        await client.close();

        if (result && result.insertedId) {
            console.log('Document inserted into MongoDB:', result.insertedId);
            return { statusCode: 201, body: JSON.stringify({data: "1"}) };
        } else {
            console.error('Error inserting data into MongoDB. Result:', result);
            return { statusCode: 500, body: 'Internal Server Error' };
        }
        
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        return { statusCode: 500, body: 'Internal Server Error' };
    }
};

let allbooks = async (req, res) => {
    try {
        // Connect to MongoDB
        const client = new MongoClient(MONGO_URI);
        await client.connect();

        // Access the database and collection
        const database = client.db(DATABASE_NAME);
        const collection = database.collection(COLLECTION_NAME);

        // Fetch all documents from the collection
        const documents = await collection.find({}).toArray();

        // Close the MongoDB connection
        await client.close();

        // Return the data
        return { statusCode: 200, body: documents };
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        return { statusCode: 500, body: 'Internal Server Error' };
    }
}

let update=async(req,res)=>{
    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect();

        const database = client.db(DATABASE_NAME);
        const collection = database.collection(COLLECTION_NAME);

        const id = req.params.id;
        const updatedInfo = req.body;

        // Create an ObjectId from the provided id string
        const objectId = new ObjectId(id);

        // Update the document based on the provided id
        const result = await collection.updateOne(
            { _id: objectId },
            { $set: updatedInfo }
        );

        await client.close();

        if (result.matchedCount > 0) {
            console.log(`Document with ID ${id} updated successfully.`);
            return { statusCode: 200, body: JSON.stringify({data: "1"}) };
        } else {
            console.error(`No document found with ID ${id} for update.`);
            return { statusCode: 404, body: 'Document not found for update' };
        }
    } catch (error) {
        console.error('Error updating document in MongoDB:', error);
        return { statusCode: 500, body: 'Internal Server Error' };
    }

}




router.post("/", invoke(dataentry));
router.get ("/", invoke(allbooks));
router.post("/:id",invoke(update));
module.exports = router