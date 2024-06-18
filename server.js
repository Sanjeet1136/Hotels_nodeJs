// function add (a,b){
//     return a+b;
// }

// var add = function(a,b){
//     return a+b;
// }

// var add = (a,b) => {return a+b;}

// var add = (a,b) => a+b;

// var result = add(33,7);
// console.log(result);

// (function(){
//     console.log("Sanjeet is King");
// })()

// function callback() {
//     console.log("Now adding is successfully completed");
// }

// const add = function(a,b,callback) {
//     var result = a+b;
//     console.log('result:'+result);
//     callback();
// }
// add(2.67,55.5,callback);

// const add = function(a,b,Sanjeet) {
//         var result = a+b;
//         console.log('result:'+result);
//         Sanjeet();
// }
// add(2,5,function(){
//     console.log("added is successfully completed");
// })
// add(2,4, () => console.log("added is successfully completed"));

// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo();
// console.log(user);
// console.log(user.username);


// fs.appendFile('greeting.txt','Hi '+ user.username + '!', ()=>{
// console.log('file is created');
// });

// const notes = require('./notes.js');
// console.log('server file is created');

// var age= notes.age;
// var result = notes.addNumbers(age+18, 10);
// console.log(age);
// console.log(result);

// const jsonString = '{"name":"John","age": 30, "city":"New York"}';
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject.name);

// const objectToConvert = {name:"John",age: 27};
// const json = JSON.stringify(objectToConvert);
// console.log(json);

const express = require('express')
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Welcome to our Hotel');
})
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const MenuItem = require('./models/menuItem');

app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
})
