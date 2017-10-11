---
layout: post
title: Cloud Functions for Firebase
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
As probably you know, Google Firebase provides very interesting resources. Of course, hosting and database are useful but in this time we will talk about **Cloud Functions**.
![Cloud Functions for Firebase]({{ site.BASE_PATH}}/assets/media/firebase/firebase-cloud-functions-logo.png)

Using these we can produce some back-end server behaviors easily. You could be think: *“Ok but I can use a back-end server to do this”*. Actually, you can. But Cloud Functions has a lot of native stuff to work with another Firebase resources, as realtime database or authentication.

In this sample we will construct a Cloud Function who monitores the User node on realtime database and if the firstName or lastName changes it contatenate to displayName and create/update in the same User node.

So, all together now!

# Setup
Before start, you have to create a Firebase Project on [Firebase Console](https://console.firebase.google.com/), just click in **Add Project**, set the **Project Name** then click in **Create**.
You need install [Node.js](https://nodejs.org/en/download/) too.

Ok, we have node. More commands, now to install the **Firebase CLI**:
```bash
$ npm install -g firebase-tools
```

Then verify your installation:
```bash
$ firebase --version
```

Once you have firebase-tools installed run the following command. This command will open a browser to login with your Google Account (same project account):
```bash
$ firebase login
```

# Project
## Setup
Go to your project directory and start a new project:
```bash
$ firebase init functions
```
It will ask you which Firebase project you are working, just follow the screen instructions. If you are not sure, don't worry you can easily change running `firebase use --add`. It also asks if you wanna download the dependeces, for this sample, say y/yes.

The project structure will be created, don't worry in this moment.

## Code 
`index.js` Where ~~the magic happens~~ your functions must be written ;
```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.setDisplayName = functions.database.ref('/users/{id}')
.onWrite(event => {
  const userData = event.data;
  const firstName = userData.child("firstName");
  const lastName = userData.child("lastName");
  if (firstName.changed() || lastName.changed()){
    const displayName = `${firstName.val()} ${lastName.val()}`;
    const id = event.params.id;
    admin.database().ref(`/users/${id}`).update({displayName: displayName})
    .then(snapshot => {
      console.log("Ok");
    })
    .catch(function(error) {
      console.log("Error:", error);   
    });
  }
});
```

`package.json` Where your dependences must be listed;
```json
{
  "name": "functions",
  "description": "Cloud Functions for Firebase",
  "dependencies": {
    "firebase-admin": "~5.2.1",
    "firebase-functions": "^0.6.2"
  },
  "private": true
}
```

## Deploy
To submit you functions use:
```bash
$ firebase deploy --only functions
```
Optionally you can deploy only a specific function (setDisplayName in this case):
```bash
$ firebase deploy --only functions:setDisplayName
```

## Test
To test our function we need some data:
```json
{
  "users" : {
    "1" : {
      "firstName" : "John",
      "lastName" : "Due"
    },
    "2" : {
      "firstName" : "Jane",
      "lastName" : "Due"
    }
  }
}
```

You can upload this json on firebase database through the console:
![Import json firebase]({{ site.BASE_PATH}}/assets/media/firebase/import_json-Firebase_console.png)

## Results
After you upload this file, the function will be triggered and set automatically the displayName. If you manually edit firstName or lastName, the displayName will be updated.  
On [Firebase Console](https://console.firebase.google.com/) in your project/functions you can see the log among another nerd statistics.
If you have some question just do id.

# Furthermore
- [Get Started with Cloud Functions](https://firebase.google.com/docs/functions/get-started);
- [Cloud Functions Database Events](https://firebase.google.com/docs/functions/database-events);
- [Create a Ionic 2 App with Firebase database and angularfire](http://127.0.0.1:4000/ionic/firebase/2017/08/28/create-ionic-app-firebase-database-angularfire.html);



