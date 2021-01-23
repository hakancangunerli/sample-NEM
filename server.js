const express = require('express');
const app = express();
const bodyparse = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var fs = require('fs');
var mongo_key= fs.readFileSync("./mongo_db.txt").toString('utf-8');
app.use(bodyparse.urlencoded({ extended: true }))

const connectionString= mongo_key
app.set('view engine', 'ejs')

MongoClient.connect(connectionString, (err,client) =>{

    if (err) return console.error(err)
    console.log('Connected to Database')
    const db = client.db('drugs')
    const quotesCollection = db.collection('idk')

    app.post('/quotes',(req,res) =>  {


        quotesCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
                console.log(result)

            })
            .catch(error => console.error(error))
    })

    app.get('/', (req, res) => {
        db.collection('idk').find().toArray()


    })

    })


app.listen(3000, function(){
    console.log('listening...')
})



app.get('/',  (req, res) => {

    res.render('index.ejs', { })
    })



// https://zellwk.com/blog/crud-express-mongodb/