
## Firebase authentication by email link with whitelist
### How it works?
Whitelist allows you to control who can access your App. The authentication process is responsible to verify user identity, when succeed should check if user is autorized. The authorization could be granted by checking email domain or if email exists in a "whitelist".

Technically Firebase provide all required resources to achieve it:

- **Authentication** is handled by firebase, we've choosen for this post [Email Link Authentication](https://firebase.google.com/docs/auth/web/email-link-auth).
- **authorization** is checked on backend via a [cloud function](https://firebase.google.com/docs/functions) and as result when succeed create a user profile on [firestore](https://firebase.google.com/docs/firestore) `profiles/${auth.user.uid}`

I use Angular and AngularFire on this tutorial but the idea could be adapted for any framework.

### AuthService
An Authservice on our app is listening states of Authentication and authorization, and return an user$ observable, when null means user is not allowed to access App, else returns user profile.

```ts
// omitted

export class AuthService {

  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    // Get the auth state (Authentication), then fetch the Firestore user document or return null (authorization)
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
          console.log('authState user: ', user);
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
    
    getCurrentUser() {
      return this.afAuth.auth.currentUser;
    }
  }
}
```
### Authentication
#### Enable Email link 
Firebase console

#### Send an authentication link
##### Construct the ActionCodeSettings object

```
const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: `${environment.domain}/auth/landing-email-link`,
  // This must be true.
  handleCodeInApp: true
};
```

##### Send sign-in link to email

```
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
  ) {
    this.afAuth.auth.useDeviceLanguage();
    console.log('Language code: ', this.afAuth.auth.languageCode);
  }
  
  public sendSignInLinkToEmail(email: string): Promise<void> {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: `${environment.domain}/auth/landing-email-link`,
      // This must be true.
      handleCodeInApp: true
    };
    return this.afAuth.auth.sendSignInLinkToEmail(email, actionCodeSettings);
  }
```

You can localize the email by updating the language code on the Auth instance:

- `firebase.auth().languageCode = 'fr';` // explicitly set language
- `firebase.auth().useDeviceLanguage();` // apply the default browser preference


##### Inform the user
On login page, inform the user the link was successfully sent, and Save the email locally so you don't need to ask the user for it again if they open the link on the same device.

```
authService.sendSignInLinkToEmail(email)
  .then(function() {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
  })
  .catch(function(error) {
    // Some error occurred, you can inspect the code: error.code
  });
```
#### Complete sign in

```
export class LandingEmailLinkComponent {
  email: string;


  constructor() { }	  constructor(
    private authService: AuthService,
    private router: Router,
  ) { 
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    email = window.localStorage.getItem('emailForSignIn');
  }

  signInWithEmailLink() {
    this.authService.signInWithEmailLink(this.email, this.router.url)
    .then( (result) => this.router.navigate(['/authorization-check']))
    .catch( error => {
      console.log(error.message);
    });
```

### authorization
#### Cloud function
fb.auth.onCreate

invite = invites.getByEmail()

1. if email exists create `profiles/${auth.user.id}`
2. fb.auth.setCustomClaims(auth.user.id, {organizationId: invite.organizationId})
3. create `metadatas/${auth.user.uid}`

#### authorization check

  user:firebase.authUser; // <-- to confirm model
  
  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

  this.afs.doc(`metadata/${user.uid}`).valueChanges().subscribe(
      () => {
        this.authService.getIdTokenResult(true)
        .then( user => {
          if (user.claims.organizationId) {
            this.router.navigate(['/home']);
          } else {
            console.log('User not allowed to access app');
          }
        });
      }
    )

## Guards

const redirectAuthorizedToHome = () => hasCustomClaim('organizationId');;

  { path: 'authorization-check', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectAuthorizedToHome },

=====================================================================================

## Firebase authentication by multi-providers OAuth with whitelist
### How it works?
Whitelist allows you to control who can access your App. The authentication process is responsible to verify user identity, when succeed should check if user is autorized. The authorization could be granted by checking email domain or if email exists in a "whitelist".

Technically Firebase provide all required resources to achieve it:

- **Authentication** is handled by firebase, we've choosen for this post [Email Link Authentication](https://firebase.google.com/docs/auth/web/email-link-auth).
- **authorization** is checked on backend via a [cloud function](https://firebase.google.com/docs/functions) and as result when succeed create a user profile on [firestore](https://firebase.google.com/docs/firestore) `profiles/${auth.user.uid}`

I use Angular and AngularFire on this tutorial but the idea could be adapted for any framework.

### Get providerId of user
#### Extract domain from email

#### Get providerId form organizations
organizations.getByDomain()

### Redirect to 'oauth-redirect'
If organization exists then redirect to 'oauth-redirect' page
Else alert for email belongs to none known organization

loginForm.onSubmit().then( _ => 
if organization.getByDomain() then this.router.navigate(['oauth-redirect'], { data: {email: this.email, organization: this.organization}}))


### AuthService
An Authservice on our app is listening states of Authentication and authorization, and return an user$ observable, when null means user is not allowed to access App, else returns user profile.

```ts
// omitted

export class AuthService {

  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    // Get the auth state (Authentication), then fetch the Firestore user document or return null (authorization)
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
          console.log('authState user: ', user);
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
    
    getCurrentUser() {
      return this.afAuth.auth.currentUser;
    }
  }
}
```

### Send redirect
oauth-redirect page

advice user he will be redirected.

disclaimer to resume email and providerId, click to continue (this.afAuth.signInWithOAuth(providerId: this.organization.providerId, domain: this.organization.domain)).then( _ => {
  
})


### Complete sign-in

```
firebase.auth().getRedirectResult().then(function(result) {

  // Redirect to authorization-check

  }
  // The signed-in user info.
  var user = result.user;
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
```

### Authentication
#### Enable Providers to Sign-In
Firebase console, google.com, microsoft.com, etc.

#### Config OAuth provider

```
 public signInWithOAuth(email: string, providerId: string, domain: string): Promise<void> {
    const provider = new auth.OAuthProvider(providerId);

    if (providerId === 'microsoft.com') {
      provider.setCustomParameters({tenant: domain, login_hint: email});
    } else if (providerId === 'google.com') {
      provider.setCustomParameters({hd: domain, login_hint: email});
    }
    return this.afAuth.auth.signInWithRedirect(provider);
  }
```

##### Redirecting to the sign-in page
this.afAuth.auth.signInWithRedirect(provider);

```
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
  ) {
    this.afAuth.auth.useDeviceLanguage();
    console.log('Language code: ', this.afAuth.auth.languageCode);
  }
  
  public sendSignInLinkToEmail(email: string): Promise<void> {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: `${environment.domain}/auth/landing-email-link`,
      // This must be true.
      handleCodeInApp: true
    };
    return this.afAuth.auth.sendSignInLinkToEmail(email, actionCodeSettings);
  }
```

You can localize the email by updating the language code on the Auth instance:

- `firebase.auth().languageCode = 'fr';` // explicitly set language
- `firebase.auth().useDeviceLanguage();` // apply the default browser preference


##### Inform the user
On login page, inform the user the link was successfully sent, and Save the email locally so you don't need to ask the user for it again if they open the link on the same device.

```
authService.sendSignInLinkToEmail(email)
  .then(function() {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
  })
  .catch(function(error) {
    // Some error occurred, you can inspect the code: error.code
  });
```
#### Complete sign in

```
export class LandingEmailLinkComponent {
  email: string;


  constructor() { }	  constructor(
    private authService: AuthService,
    private router: Router,
  ) { 
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    email = window.localStorage.getItem('emailForSignIn');
  }

  signInWithEmailLink() {
    this.authService.signInWithEmailLink(this.email, this.router.url)
    .then( (result) => this.router.navigate(['/authorization-check']))
    .catch( error => {
      console.log(error.message);
    });
```

### Authorization
#### Cloud function
fb.auth.onCreate

check providerData.signinmethod if google.com or microsoft.com then 
organization = organization.getByDomain()

1. if organization exists create `profiles/${auth.user.id}`
2. fb.auth.setCustomClaims(auth.user.id, {organizationId: organization.organizationId})
3. create `metadatas/${auth.user.uid}`

#### authorization check

  user:firebase.authUser; // <-- to confirm model
  
  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

  this.afs.doc(`metadata/${user.uid}`).valueChanges().subscribe(
      () => {
        this.authService.getIdTokenResult(true)
        .then( user => {
          if (user.claims.organizationId) {
            this.router.navigate(['/home']);
          } else {
            console.log('User not allowed to access app');
          }
        });
      }
    )

## Guards

const redirectAuthorizedToHome = () => hasCustomClaim('organizationId');;

  { path: 'authorization-check', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectAuthorizedToHome },

