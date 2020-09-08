How to check if Firebase push notification is working fine ?
topics
tokens
Notification messages (aka “display messages”)

## How to find out if user is subscribed to a topic?
FCM topic subscriptions are based on an application's Instance ID, so when you subscribe or unsubscribe to or from a topic the IID is used.
You can use the Instance ID API to get information about a particular IID, this information includes the topics that the IID is currently subscribed to. See the [reference](https://developers.google.com/instance-id/reference/server#get_information_about_app_instances)

Source: https://stackoverflow.com/a/38959390/4982169

https://iid.googleapis.com/iid/info/IID_TOKEN
API key (accessToken) can be found under: (gear-next-to-project-name) > Project Settings > Cloud Messaging -> Server Key is the API key.

Example of response:

```json
{
    "applicationVersion": "40009",
    "application": "com.meumobi.infomobi2",
    "scope": "*",
    "authorizedEntity": "807678202190",
    "rel": {
        "topics": {
            "NSQJRipCSvxbhpPEc6lM": {
                "addDate": "2020-03-31"
            }
        }
    },
    "appSigner": "d95487aa0f53defb483331ee91b8aa8b0f56ede8",
    "platform": "ANDROID"
}

```
## How many users have subscribed a topic?
There is no available API to check how many subscribers a topic has. You'll have to implement the mapping on your server-side.
Source: https://stackoverflow.com/a/40861417/4982169

## How many instances have received the push?
FCM provides comprehensive data export to Google BigQuery.
https://firebase.google.com/docs/cloud-messaging/understand-delivery

## How many messages sent to topic
```sql
SELECT *
FROM `infomobi-v4.firebase_messaging.data`
WHERE
message_type = 'TOPIC'
```

Browser instance token of victor.dias@meumobi.com
{
   "token":"fTigycBwNrm6jXS4KkadRZ:APA91bHJz9bms-wl6QdLYUH7fGC2UGBMppF3xz8tyH3v-8ZN6dZf_q4S11IqEJ4SyxkFkVEMq84eotbWVEMCFdWBjH2NmAzVd8qJpvwEhC18o4Bsf0PDHyLAXf11-Y7QQD4uPMJ2H3Ms",
   "topic":"NSQJRipCSvxbhpPEc6lM"
}


## Create a relation mapping for an app instance
https://iid.googleapis.com/iid/v1/IID_TOKEN/rel/topics/TOPIC_NAME
 
https://iid.googleapis.com/iid/v1/fTigycBwNrm6jXS4KkadRZ:APA91bHJz9bms-wl6QdLYUH7fGC2UGBMppF3xz8tyH3v-8ZN6dZf_q4S11IqEJ4SyxkFkVEMq84eotbWVEMCFdWBjH2NmAzVd8qJpvwEhC18o4Bsf0PDHyLAXf11-Y7QQD4uPMJ2H3Ms/rel/topics/NSQJRipCSvxbhpPEc6lM

Not works. Return 200 {} But if I check with https://iid.googleapis.com/iid/info/IID_TOKEN no rels are setted


