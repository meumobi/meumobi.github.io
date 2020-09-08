## Overview

[Cloud Functions for Firebase](https://firebase.google.com/docs/functions)(CF) let you automatically run backend code in response to events triggered by Firebase features and HTTPS requests. Your code (JavaScript or TypeScript) is stored in Google's cloud and runs in a managed Node.js environment. There's no need to manage and scale your own servers.

To have an idea of what could be done with cloud functions I recommend to have a look on [Cloud Functions for Firebase use cases](https://firebase.google.com/docs/functions/use-cases) or [Cloud Functions for Firebase samples](Collection of sample apps showcasing popular use cases using Cloud Functions for Firebase).


## Use Email messaging
### Sendgrid
Pricing
Free: 40,000 emails for your first 30 days, then send 100/day, forever
Essentials: Starting at $14.95/mo plus $10/mo per 10,000 contacts

### Mandrill
Pricing
Free: 2K subscribers and 12K emails/m
Grow: $75.00 /month for 10K subscribers, unlimited emails

### Mailgun
Pricing
Free: first 10,000 emails free, first 100 validations free
Production: 79 US$/m 100,000 emails, 1,000 validations

### Mailjet
Pricing
Free: 6,000 emails per month, 200 emails per day
Basic: $9.65/mo for 30,000 emails per month, No daily sending limit
## Repository & demo

All source code can be found on GitHub: [https://github.com/meumobi/mmb-demos.firebase-function-sendgrid-email](https://github.com/meumobi/mmb-demos.firebase-function-sendgrid-email)

## What you'll build

This tutorial demonstrates using Cloud Functions to send emails through the [SendGrid] platform.

## What you'll need
### Dev tools
We need to have [Node.js] installed in order to install both [Firebase CLI] and project dependencies.

Install the Firebase CLI via npm by running the following command:

```bash
$ npm install -g firebase-tools
+ firebase-tools@8.2.0
```

### Firebase account

## Implementation path

- Setup a Firebase project
- run locally a function triggered on https request
- run locally a function triggered on Firebase event (??)
- deploy
- config

https://firebase.google.com/docs/cli

## Setup a Firebase project

$ firebase login
$ mkdir mmb-demos.firebase-function-sendgrid-email
$ cd mmb-demos.firebase-function-sendgrid-email
$ firebase init

## Example of function triggered on https request

`functions/index.ts`

```typescript
import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
```

```bash
$ npm --prefix=functions install
$ npm --prefix=functions run serve
> functions@ serve /Users/vdias/Dvpt/PROJECTS/mmb-demos.firebase-function-sendgrid-email/functions
> npm run build && firebase emulators:start --only functions


> functions@ build /Users/vdias/Dvpt/PROJECTS/mmb-demos.firebase-function-sendgrid-email/functions
> tsc

i  emulators: Starting emulators: functions
✔  hub: emulator hub started at http://localhost:4400
⚠  Your requested "node" version "8" doesn't match your global version "12"
✔  functions: functions emulator started at http://localhost:5001
i  functions: Watching "/Users/vdias/Dvpt/PROJECTS/mmb-demos.firebase-function-sendgrid-email/functions" for Cloud Functions...
✔  functions[helloWorld]: http function initialized (http://localhost:5001/meu-starter/us-central1/helloWorld).
✔  emulators: All emulators started, it is now safe to connect.
```

## Example of function triggered on Firestore event

## Manage functions deployment

### Deploy functions

To deploy functions, run this Firebase CLI command:

$ firebase deploy --only functions

If you encounter permissions errors when deploying functions, make sure that the appropriate [IAM roles](https://firebase.google.com/docs/projects/iam/permissions#functions) are assigned to the user running the deployment commands.

### Deploy specific functions
When deploying functions, you can target specific functions. For example:

firebase deploy --only functions:function1

firebase deploy --only functions:function1,functions:function2

## Monitoring cloud functions
https://cloud.google.com/functions/docs/monitoring
https://console.cloud.google.com/errors


## CORS issue with onCall cloud function

Could happens if we edit cf on Google cloud console. Should [update permissions to allow allUsers](https://github.com/firebase/firebase-functions/issues/645#issuecomment-605835353).

## Throw an error within onCall cloud function

https://firebase.google.com/docs/functions/callable#handle_errors
https://stackoverflow.com/a/60214499/4982169

## Furthermore

- [Cloud Firestore triggers](https://firebase.google.com/docs/functions/firestore-events)
- [Google Cloud tutorials: Send Emails from Cloud Functions with SendGrid Tutorial](https://cloud.google.com/functions/docs/tutorials/sendgrid)
- [Testing firebase cloud functions locally using cloud functions shell](https://medium.com/@moki298/test-your-firebase-cloud-functions-locally-using-cloud-functions-shell-32c821f8a5ce)
- [Understanding Firebase Cloud Functions and Triggers](https://fullstackgcp.com/understanding-firebase-cloud-functions-and-triggers-cloud-high-voltage-cjyju2w9x000heds15ex7b4bq)

[SendGrid]: <https://sendgrid.com/>
[Node.js]: <https://nodejs.org/en/download/>
[Git]: <http://git-scm.com/download>
[Firebase]: <https://firebase.google.com/>
[Firebase CLI]: <https://firebase.google.com/docs/cli>
[Firestore]: <https://firebase.google.com/products/firestore/>
