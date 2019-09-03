## Goal
Create an web app with two pages, login and home. 
Home is only accessible after login.
User could login by a link sent to his email or by SMS both through Firebase Auth

## Ingredients
- AngularFire
- Firebase Project

## Steps
1. Create Ionic/Angular App
2. Establish Auth Service 
3. Create CloudFunction who creates a AuthUser by Phone Number
4. Create CloudFunction who creates a AuthUser by Email Address
4. Login by Email link
5. Login by SMS

## Create Ionic/Angular App && Establish Auth Service 
We've already done [here](http://meumobi.github.io/how%20to/2019/07/03/login-flow-with-custom-auth.html)
so just
```bash
$ git clone https://github.com/meumobi/meu-starter.firestore-custom-auth.angular meu-auth
$ cd meu-auth
$ npm i
$ ionic serve
```
But if want do by yourself
```bash
$ npm install ionic typescript -g
$ ionic start login-flow blank --type=angular
$ cd login-flow
```
Then follow the steps on [Ionic Angular Project](http://meumobi.github.io/how%20to/2019/07/03/login-flow-with-custom-auth.html#ionic-angular-project)

## Create CloudFunction who creates a AuthUser by Phone Number
