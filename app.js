const express = require("express");
const path = require("path");
const app = express();

const mongoose = require('mongoose');
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/contactEducate", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const port = 800;
  
const contactSchema = new mongoose.Schema({
      name: String,
      email: String,
      phone: String,
      text: String
    });

const Contact = mongoose.model('Contact', contactSchema);  

app.use('/static', express.static('static')) // For serving static files

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

app.post('/con', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("Your data has been saved successfully!")
        console.log(myData);
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
   
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});