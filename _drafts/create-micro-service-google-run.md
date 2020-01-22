Install [Docker](https://docs.docker.com/v17.12/install/)
Install [Google Clould SDK](https://cloud.google.com/sdk/)

$ which gcloud
/Users/vdias/Downloads/google-cloud-sdk/bin/gcloud

$ gcloud init

You are logged in as: [victor.dias@meumobi.com].

Pick cloud project to use: 
 [1] ams-publishers
 [2] ams-report
 ...
 [30] Create a new project
Please enter numeric choice or text value (must exactly match list 
item):  30


## Write the sample application
$ mkdir nfmb-xml
$ cd nfmb-xml

```js
{
  "name": "nfmb-xml",
  "version": "0.0.1",
  "description": "XML export of firebase collection",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "",
  "license": "Apache-2.0",
  "dependencies": {
    "express": "^4.16.4"
  }
}
```


```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log('Hello world received a request.');

  const target = process.env.TARGET || 'World';
  res.send(`Hello ${target}!`);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Hello world listening on port', port);
});
```

ERROR: (gcloud.builds.submit) HTTPError 403: The account for bucket "nfmb-xml_cloudbuild" has not enabled billing.

https://cloud.google.com/billing/docs/how-to/modify-project#change_the_billing_account_for_a_project


ERROR: (gcloud.builds.submit) User [daniel.conte@meumobi.com] does not have permission to access project [nfmb-xml] (or it may not exist): Cloud Build API has not been used in project 23918287612 before
or it is disabled. Enable it by visiting https://console.cloud.google.com/apis/api/cloudbuild.google
apis.com/overview?project=23918287612 then retry. If you enabled this API recently, wait a few minute
s for the action to propagate to our systems and retry. 


https://fireship.io/lessons/firebase-microservices-with-cloud-run/
https://codelabs.developers.google.com/codelabs/cloud-run-hello/#2