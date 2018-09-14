console.log('node js ran this code');

// let's install some helpful packages

// express and body-parser

// express is a very helpful package for running http servers

// body-parser is a package for parsing http requests

// to sound smart in interviews, say this.

// node just runs javascript

// express is a node framework for writing server code

// we're always going to send post requests using JSON

const express = require('express');
const bodyParser = require('body-parser');
const service = require('./service');
const app = express();

app.use(bodyParser.json());

// middleware is a function that is to be run in every single endpoint.

// so, now body parser will run everytime we hit any endpoint.

// now we need a fake database mockup, saved in memory

// disk databases are things like sql

// memory databases are things like redis

const db = {
  default: null
};



const top = '<!DOCTYPE html><html><head>';
const hometitle = '<title>my-first-api</title>';
const link = '<link rel="stylesheet" type="text/css" href="./style.css">';
const heading = '</head><body><h1>my first api</h1>'
const healthlink = '<a href="./health">health</a>';
const homelink = '<a href="./health">health</a>';
const end = "</body></html>"
app.listen(8080, function() {
  console.log(`server listening on port ${this.address().port}`)
})

app.get('/health', (req,res) => {
  // console.log(req); // pretty big object
  console.log('/health');
  return res.send('ok');
})

app.get('/', (req,res) => {
  res.send(top+hometitle+link+heading+healthlink+end);
})
app.post('/chair', (req,res) => {
  console.log(req.body);
  res.send('got the stuff');
})
app.get('/style.css', (req,res) => {
  res.type('text/css');
  res.send('body {font-family: Georgia;}h1 {border: solid green;}');
})

app.get('/record', (req,res) => {
  console.log('get record');
  res.send(db);
})
app.post('/record', (req,res) => {
  console.log('post record');
  Object.keys(req.body).map(e => {
    db[e] = req.body[e];
  })
  res.send(db);
})
app.put('/record', (req,res) => {
  console.log('put record');
  Object.keys(req.body).map(e => {
    if (e in db){
      db[e] = req.body[e];
    }else{
      res.status(404);
      res.send('not found');
    }
  })
  res.send(db);
})
app.delete('/record', (req,res) => {
  console.log('delete record');
  Object.keys(req.body).map(e => {
    if (e in db){
      delete db[e];
    }else{
      res.status(404);
      res.send('not found');
    }
  })
  res.send(db);
})

app.get('/item', (req,res) => {
  const memoryStore = service.getMemoryStore();
  return res.send(memoryStore);
})

app.post('/item', (req,res) => {
  Object.keys(req.body).forEach(key => service.addToMemoryStore(key,req.body[key]));
  const memoryStore = service.getMemoryStore();
  return res.send(memoryStore);
})

app.put('/item', (req,res) => {
  Object.keys(req.body).forEach(key => service.updateMemoryStore(key, req.body[key]));
  const memoryStore = service.getMemoryStore();
  return res.send(memoryStore);
})

app.delete('/item', (req,res) => {
  Object.keys(req.body).forEach(key => service.deleteFromMemoryStore[key]);
  const memoryStore = service.getMemoryStore();
  return res.send(memoryStore);
})