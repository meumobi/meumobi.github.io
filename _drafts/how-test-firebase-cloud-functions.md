## How to test Firebase Cloud functions

[Cloud Functions for Firebase](https://firebase.google.com/docs/functions) let you automatically run backend code in response to [events triggered by Firebase features](https://firebase.google.com/docs/functions#key_capabilities) and [HTTPS requests](https://firebase.google.com/docs/functions/http-events). Your code (JavaScript or TypeScript) is stored in Google's cloud and runs in a managed environment. There's no need to manage and scale your own servers.

There are two types of functions that get triggered, functions that trigger on [HTTPS requests](https://firebase.google.com/docs/functions/http-events) and functions that get triggered on various firebase events(like database write/delete, etc)

Firebase provides [cloud functions samples](https://github.com/firebase/functions-samples) for [common use cases](https://firebase.google.com/docs/functions/use-cases) like:

- [Notify users when something interesting happens](https://firebase.google.com/docs/functions/use-cases#notify_users_when_something_interesting_happens).
- [Perform database sanitization and maintenance](https://firebase.google.com/docs/functions/use-cases#perform_database_sanitization_and_maintenance).
- [Execute intensive tasks in the cloud instead of in your app](Execute intensive tasks in the cloud instead of in your app).
- [Integrate with third-party services and APIs](https://firebase.google.com/docs/functions/use-cases#integrate_with_third-party_services_and_apis).
- [Generate thumbnail](https://github.com/firebase/functions-samples/tree/master/generate-thumbnail).
- [Sync data to a Google Sheet](https://github.com/firebase/functions-samples/tree/master/google-sheet-sync).

I assume the reader is already aware of how to create a firebase project and other basic stuff in order to keep this post specific.

## What you’ll need

### Dev tools

### Setup

Install Firebase cli and sign in:

$ npm -g install firebase-tools
$ firebase login

Set up the Firebase CLI to use your Firebase Project:

$ firebase use --add

Then select your Project ID and follow the instructions. 


## Call function via HTTP requests

## Callable functions

## Run functions locally

## Cloud functions shell