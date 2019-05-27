---
layout: post
title: Manage Integration Environment with Firebase Hosting
categories: [firebase]
tags: []
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

If your project use firebase hosting and database, you probably need a developement and/or integration environment. These environments will use different host and db, but are reachable form your local server 

[firebase-tools](https://www.npmjs.com/package/firebase-tools)

[Firebase cli](https://firebase.google.com/docs/cli/): multi-projects
Adding a project alias
Firebase use --add, create

To switch between aliases, run:
$ firebase use <alias_or_project_id>

You can view a list of currently defined aliases for your project directory by running firebase use
$ firebase use


remove an alias by running firebase use --unalias <alias>.

$ firebase list
$ firebase deploy --only hosting
$ firebase deploy --only functions:function1

## Firebase code pull

There is no method available to grab your Firebase code. You should be utilizing your own version control (e.g. git) to manage your revisions and backups.

Since all your files are static assets, you could always scrape them using wget:

`wget -r -np https://<YOURAPPNAME>.firebaseapp.com`
	
	
## Can I cleanly delete firebase project using cli ?
> You should delete firebase.json and .firebaserc if it exists. Once those files are deleted you should be good to go.

[Source](https://stackoverflow.com/a/43057069)

## Customize Hosting Behavior
 
 Redirects, Headers, Rewrites, etc.
 https://firebase.google.com/docs/hosting/url-redirects-rewrites