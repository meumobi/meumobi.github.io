How to integrate firebase OAuth on your project ?


OAuth is an authentication protocol that allows you to approve one application interacting with another on your behalf without giving away your password.

Facebook apps are a good OAuth use case example. Say you’re using an app on Facebook, and it asks you to share your profile and pictures. Facebook is, in this case, the service provider: it has your login data and your pictures. The app is the consumer, and as the user, you want to use the app to do something with your pictures. You specifically gave this app access to your pictures, which OAuth is managing in the background.

OAuth is about authorization and not authentication. Authorization is asking for permission to do stuff. Authentication is about proving you are the correct person because you know things. OAuth doesn’t pass authentication data between consumers and service providers – but instead acts as an authorization token of sorts.

> Now whenever we want to access their data, all we need to do is grab the refresh token, pass it to the Google api client, and call the api endpoint the token is scoped to.

[Source](https://blog.quid.works/serverless-oauth2-flows/)


https://medium.com/@jwngr/demystifying-firebase-auth-tokens-e0c533ed330c
https://www.varonis.com/blog/what-is-oauth/

AngularFireAuth.user provides an Observable<User|null> to monitor the application's authentication State.


firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // ...
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


[Authenticate Using OAuth Providers with Cordova](https://firebase.google.com/docs/auth/web/cordova)


login.component

  signInWithOAuth(providerId: string, domain: string) {
    this.authService.signInWithOAuth(providerId, domain)
    .then( () => this.router.navigate(['/authentication/success']))
    .catch( error => {
      this.mmbToastService.present(error);
    });
  }
  
auth.service

  public signInWithOAuth(providerId: string, domain: string): Promise<void> {
    const provider = new auth.OAuthProvider(providerId);
    if (providerId === Organizations.FirebaseAuthByEmailProviderId.MICROSOFT) {
      provider.setCustomParameters({tenant: domain});
    } else if (providerId === Organizations.FirebaseAuthByEmailProviderId.GOOGLE) {
      provider.setCustomParameters({hd: domain});
    }
    return this.afAuth.auth.signInWithRedirect(provider);
  }
  
  
$ ionic start mmb-demos.angularfire-google-oauth --type=angular -cordova --package=com.meumobi.angularfire-google-oauth

$ ng generate service auth

$ ng g class --type=model shared/user

$ ng g component user-profile



https://www.googleapis.com/admin/directory/v1/users/userKey/photos/thumbnail
https://www.googleapis.com/auth/userinfo.profile


auth.user.refreshToken
auth.user.providerData[].providerId=='google.com'
auth.user.providerData[index].uid

auth.credential.idToken
https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=...

Set up your project's [Consent Screen page in the Google API Console](https://console.developers.google.com/apis/credentials/consent)

[Create your client_id and client_secret in the Google API Console](https://developers.google.com/adwords/api/docs/guides/authentication#create_a_client_id_and_client_secret)

Use refresh tokens to get new access tokens
https://dev.to/risafj/beginner-s-guide-to-oauth-understanding-access-tokens-and-authorization-codes-2988


Refresh access token
POST /oauth2/v4/token HTTP/1.1
Host: www.googleapis.com
Content-length: 223
content-type: application/x-www-form-urlencoded
user-agent: google-oauth-playground

client_secret=************&grant_type=refresh_token&refresh_token=1%2F%2F04Fh43vr3H6v0CgYIARAAGAQSNwF-L9IrGJYaK5pK31EmoC2njb4xRrj17d1AqkEETlz0inSuV42fF0SkudzbsVcV7YnhL3f8aeY&client_id=407408718192.apps.googleusercontent.com

## Google OAuth 2.0 Playground
https://developers.google.com/oauthplayground/
Select Google OAuth2 API v2
- https://www.googleapis.com/auth/userinfo.email
- https://www.googleapis.com/auth/userinfo.profile"

GET /oauth2/v2/userinfo HTTP/1.1
Host: www.googleapis.com
Content-length: 0
Authorization: Bearer ya29.ImCvB2-ya9g3y8WEivuDO1QxAsgJ_G2r0l8r0NnV57kLCTtKdLAVg_OvxFm_4f8FT8V12DdDPXmE_EoKiq37b8apHvLjayPyvThrzg24wq-ZwdNKGdBFpWgFedcbWCyajJ0


AngularFireAuth.auth returns an initialized [firebase.auth.Auth instance](https://firebase.google.com/docs/reference/js/firebase.auth.Auth), means firebase.auth(). === this.afAuth.auth.

## Google Sign-In

const provider = new auth.GoogleAuthProvider();
this.afAuth.auth.signInWithRedirect(provider);

====> this.afAuth.auth.languageCode = 'pt'; 

localize the provider's OAuth flow to the user's preferred language

provider.setCustomParameters({
  'login_hint': 'user@example.com'
});

## Replace signInWithPopup by signInWithRedirect

Authenticate with Firebase using the Google provider object. You can prompt your users to sign in with their Google Accounts either by opening a pop-up window or by redirecting to the sign-in page. **The redirect method is preferred on mobile devices**.

canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin
  