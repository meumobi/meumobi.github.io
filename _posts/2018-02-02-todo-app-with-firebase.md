---
layout: post
title: To-do app with Firebase Cloud Functions and Database
categories: [Firebase]
tags: [tutorial]
author:
  name: Daniel Antonio Conte
  email: danconte72@gmail.com
  github: danconte72
  twitter: danielconte
  bio: Life, Universe, Everything
  email_md5: 8200df29874231d4d8c2c7beae170b31
---

Hi, today we will make a to-do app using just Firebase Database and Firebase Cloud Functions, accessing functions through URL requests.

# Recipe
## Ingredients
- 1 [Firebase Project](https://console.firebase.google.com/) (We showed how to [here](http://meumobi.github.io/firebase/2017/10/11/cloud-functions-for-firebase.html))
- A little bit of enthusiasm and patience

## Directions
We will have 3 cloud functions:
- Add: To add a new item;
- List: To list all items;
- Remove: To remove an item;

All following code must be written on ```index.js``` file.
### Header
```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
```
### List Function
```javascript
exports.list = functions.https.onRequest(
  (req,res) => {            
    //get all data in todo node on Firebase Database
    admin.database().ref().child('todo').once('value')
    .then(data => {
      //send data to whom requested
      res.send(data);
    });                   
  }
);
```
### Add Function
```javascript
exports.add = functions.https.onRequest(
	(req,res) => {
    //getting latestId
    admin.database().ref(`/settings`).once('value')
    .then(snapshot => {
      //incrementing id - this is not the best option but it works for our example
      let id = snapshot.val().latestId + 1;  
      //getting TEXT parameter    
      if (req.query.text) {
        item = `${id} - ${req.query.text}`;
        //adding item to todo node
        admin.database().ref(`/todo/${id}`).set({item})
        .then(snapshot => {
          //updating latestId
          admin.database().ref(`/settings`).set({latestId: id});        
        });        
      }      
    } 
  }
);
```
In order to control the itemId, you must to add a ```/settings/latestId``` node with initial Id. Or Import the following json
```json
{
  "settings" : {
    "latestId" : 0
  }
}
```
You can upload this json on firebase database through the console:
![Import json firebase]({{ site.BASE_PATH}}/assets/media/firebase/import_json-Firebase_console.png)

### Remove Function
```javascript
exports.remove = functions.https.onRequest(
  (req,res) => {   
    //getting text parameter     
    if (req.query.text) {
      id = req.query.text;
      //removing node by id 
      admin.database().ref(`/todo/${id}`).remove()
      .then(snapshot => {
        res.send("Remove Item Ok");           
      });         
    }     
  }
);
```

## Deploy
Don´t forget to install all dependencies on functions dir: `npm install`.
On console:
```bash
$ firebase deploy --only functions
```
You will receive the URLS to call.
```bash
✔  functions[add]: Successful create operation. 
Function URL (add): https://us-central1-todo-cf.cloudfunctions.net/add
✔  functions[list]: Successful create operation. 
Function URL (list): https://us-central1-todo-cf.cloudfunctions.net/list
✔  functions[remove]: Successful create operation. 
Function URL (remove): https://us-central1-todo-cf.cloudfunctions.net/remove
```

### Tests
We use an unique parameter text to make easy. 
To test you can use our URL [https://us-central1-todo-cf.cloudfunctions.net](https://us-central1-todo-cf.cloudfunctions.net)

[url]/add?text=Finish Blog Post 
[url]/list
[url]/remove?text=1

## Atention
- In this case we don't catch errors neihter logs. So go deep and improve your project.
- List command provides a JSON response;

# Furthermore
- [Cloud Functions for Firebase](http://meumobi.github.io/firebase/2017/10/11/cloud-functions-for-firebase.html);






