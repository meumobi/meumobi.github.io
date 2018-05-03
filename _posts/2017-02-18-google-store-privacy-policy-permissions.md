---
layout: post
title: Your App has been removed from Google Play because it violates information policy
categories: [Android, GooglePlay]
tags: [policy]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

This morning I received following scary email to inform me one of my Apps has been removed from Google Play because it **violates our personal and sensitive information policy**. Well...
![Your App has been removed from Google Play because it violates information policy]({{ site.BASE_PATH }}/assets/media/android/Google_Play_policy_violation-2.png)

# Request to sensitive permissions or data

If I open Google developers console I can have more details about this decision. In my case it's because I listen Phone state, that is considered a sensitive information.

![Google_Play_Developer_Console Warning Permission - Email]({{ site.BASE_PATH }}/assets/media/android/APK_-_RI_Brasil_-_Google_Play_Developer_Console.png)

All sensitive informations are flagged on [Manifest.permission](https://developer.android.com/reference/android/Manifest.permission#read_phone_state) with `Protection level: dangerous`.

I've already seen this warning on Store listing section of Google developer console. But to be honest, as I didn't know wat to fill I prefered to check "Not submitting at this time".

![Google_Play_Developer_Console Warning Permission - Store Listing]({{ site.BASE_PATH }}/assets/media/android/Store_listing_Google_Play_Developer_Console.png)

# Add a privacy policy to your store listing

## Why ?
Adding a privacy policy to your app's store listing helps provide transparency about how you treat sensitive user and device data.

The privacy policy must, together with any in-app disclosures, comprehensively disclose how your app collects, uses and shares user data, including the types of parties with whom it’s shared. Google is unable to provide you with legal advice and you should consult your own legal representative.

- **For apps that request access to sensitive permissions or data** (as defined in the user data policies): You must link to a privacy policy on your app's store listing page and within your app. Make sure your privacy policy is available on an active URL, applies to your app, and specifically covers user privacy.
- **For apps in the Designed for Families program**: You must link to a privacy policy on your app's store listing page and within your app, regardless of your app's access to sensitive permissions or data. Make sure your privacy policy is available on an active URL, applies to your app, and specifically covers user privacy.
- **For other apps**: You're not required to post a privacy policy.

Source: [https://support.google.com/googleplay/android-developer/answer/113469#privacy](https://support.google.com/googleplay/android-developer/answer/113469#privacy)

The 

## What model ?
I've compiled below few models:
- Mobile Marketing Association: [Mobile Application Privacy Policy Framework](http://www.mmaglobal.com/documents/mma-mobile-application-privacy-policy-framework)
	- The intent of this privacy policy is to provide the mobile application developer with policy language that can be quickly and completely understood by the consumer.
- [iubenda](http://www.iubenda.com/en/mobile)
	- Generate your app's privacy policy with just a few clicks
- [Docracy](http://www.docracy.com/doc/search?query=mobile+privacy+policy)
	- Branch an existing, update and share (https://www.docracy.com/pdf/0d1rts5twq3/1)

## Submit update

1. Go to your Google Play Developer Console.
2. Select an app.
3. Select Store Listing.
4. Under "Privacy Policy," enter the URL where you have the privacy policy hosted online.
5. Select Save draft (new apps) or Submit update (existing apps).

# Furthermore
- [Android M and Privacy](http://www.applicationprivacy.org/2015/06/23/android-m-and-privacy-giving-users-control-over-app-permissions/)
- [termsfeed](https://termsfeed.com/blog/google-play-store-violation-policy-issue-2017/)

