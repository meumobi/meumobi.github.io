---
layout: post
title: Update own repository from forked source
categories: [Tips and Tricks, Git]
tags: [fork, github]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---
If you've forked a repository to create a snapshot under your own repository...

If like us you use [The PhoneGap Developer App](http://app.phonegap.com/) to test your PhoneGap projects you may [have created your own build](http://docs.phonegap.com/references/developer-app/custom-build/ios/).
Once you have your own build running successfully, you can modify it at any time to add custom plugins or other settings as desired. But how to update your build to follow new releases ?


https://github.com/phonegap/phonegap-app-developer

http://discoposse.com/2015/07/23/updating-forked-git-repository-from-upstream-source-aka-rebase-all-the-things/

$ git pull
Already up-to-date.

# Add source, upstream
$ git remote
origin
upstream

# Fetch and rebase upstream
## Commit or stash unstaged changes
Should not have unstaged changes, Commit or stash them.
$ git fetch upstream
$ git rebase upstream/master
Cannot rebase: You have unstaged changes.
Please commit or stash them.

## Merge conflicts
$ git rebase upstream/master