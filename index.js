const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId= require('mongodb').ObjectId;
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8s3t0.mongodb.net/myFirstDatabase?retryWrites=true&w=majorit`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//console.log(uri);
async function run () {
 try {
    await client.connect ();
    console.log('DB Connected')
    const database = client.db('tripTravels')
    const destinationCollection = database.collection("destination")
    const bookingCollection = database.collection('booking');
    
    // Get APi
    app.get('/destination', async(req, res) =>{
        const query = destinationCollection.find({});
        const destination = await query.toArray();
        res.send(destination);
    })

    //Get Single Destination API

    app.get('/destination/:id', async (req, res) =>{
        const id = req.params.id;
        console.log('Geting Id', id);
        const query = { _id : ObjectId(id)};
        const destination = await destinationCollection.findOne(query);
        res.json(destination);
    })

    // Destination Post
    app.post('/destination', async (req, res)=>{
        const destination = req.body ;
        console.log('Api Hitted', destination)
        const result = await destinationCollection.insertOne(destination);
        //console.log(result);
        res.send(result)
    });
    app.post('/booking', async (req, res) => {
        const booking = req.body;
        order.createdAt = new Date();
        const result = await bookingCollection.insertOne(booking);
        res.json(result);
    })

 }
 finally{
    //    await client.close();
    }
} 
run().catch(console.dir);

//     client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
   
//   });




app.get('/', (req, res)=>{
    res.send('Running Genius Server');
})
app.listen(port, () =>{
    console.log('Running Genius Server on Port', port)
})

// DB_USER=tripTravel
// DB_PASS=pX3vXBTFb3V2nE6b