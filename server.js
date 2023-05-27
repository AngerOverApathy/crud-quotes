const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://angeroverapathy:acesHigh35@crud-quotes.8rloutg.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
.then(client => { // put our express request handlers into the MongoClient’s then call
  console.log('Connected to Database')
  const db = client.db('crud-quotes')//We need the db variable from the connection to access MongoDB
  const quotesCollection = db.collection('quotes')

  // Make sure you place body-parser before your CRUD handlers!
  //The urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object
  //extended:true makes it so the object will contain key-value pairs where the value can be any type of data
  app.use(bodyParser.urlencoded({ extended: true })) 

  app.listen(3001, function(){
    console.log('listening on 3001')
  })

  app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html')
  })

  app.post('/quotes', (req,res)=>{
    quotesCollection
      .insertOne(req.body) //use the insertOne method to add items into a MongoDB collection
      .then(result => {
        res.redirect('/')
    })
    .catch(error => console.error(error))
  })
})
.catch(error => console.error(error))

