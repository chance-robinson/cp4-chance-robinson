const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/cp4', {
  useNewUrlParser: true
});

const multer = require('multer')
const upload = multer({
  dest: '/var/www/c4.chancerobinson.xyz//images/',
  limits: {
    fileSize: 10000000
  }
});

const itemSchema = new mongoose.Schema({
  title: String,
  desc: String,
  instr: String,
  path: String,
});

const Item = mongoose.model('Item', itemSchema);

app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    desc: req.body.desc,
    instr: req.body.instr,
    path: req.body.path,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    //console.log(error);
    res.sendStatus(504);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    //console.log(error);
    res.sendStatus(503);
  }
});

app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    console.log(items);
    res.send(items);
  } catch (error) {
    //console.log(error);
    res.sendStatus(502);
  }
}); 

app.put('/api/items/:id', async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id,
    });
    item.title = req.body.title;
    item.desc = req.body.desc;
    item.instr = req.body.instr;
    await item.save();
    res.sendStatus(200);
  } catch (error) {
    //console.log(error);
    res.sendStatus(501);
  }
}); 

app.listen(3001, () => console.log('Server listening on port 3001!'));
