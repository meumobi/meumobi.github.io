---
layout: post
title: Update own repository from forked source
categories: [Tips and tricks, Git]
tags: [fork, github]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---
If you've forked a repository to create a snapshot under your own repository, and it's time to update the code. If you didn't make changes (and commit them), then it's pretty straight forward, but if you have commited local changes...argg@#!!!
![rebase-fork]({{ site.BASE_PATH }}/assets/media/git/rebase-fork.png)

We use [The PhoneGap App Developer](http://app.phonegap.com/) to test our PhoneGap projects on devices. In order to test all plugins we use, we need to update this project as recommended and explained on documentation: [custom build](http://docs.phonegap.com/references/developer-app/custom-build/ios/). Then, we've forked the [github repo of phonegap-app-developer](https://github.com/phonegap/phonegap-app-developer) and built it locally. With our own build running successfully, we can modify it at any time to add custom plugins or other settings as desired. But now it's time to update our build to follow new releases!

# Updating a Forked Repository from Upstream Source
The way we do this is by syncing up our repositories here locally, and then pushing the changes back up to our forked repository. First, let’s check our remote source by typing git remote to see what’s happening locally:

```bash
$ git remote
origin
$
```
We have one source called origin which is our forked repository. We are going to add one more source called upstream to point to the original repo using the command `git remote add upstream https://github.com/phonegap/phonegap-app-developer.git`, and then run our git remote again to confirm the change:

```bash
$ git remote
origin
upstream
$
```

NB: We are assuming that you are using the master branch of your repo, but just in case, you can also do a git checkout master first for safety.

## Commit or stash unstaged changes
If you have unstaged changes, you must commit or stash them, or the rebase will failed with error message: "Cannot rebase: You have unstaged changes."

# Fetch and rebase upstream
Now it's time to fetch the upstream and rebase our local repo. This is done by using the `git fetch upstream` command followed by the `git rebase upstream/master` to sync them up:

```bash
$ git fetch upstream
$ git rebase upstream/master
First, rewinding head to replay your work on top of it...
Applying: Update config.xml to add all necessaries plugins
Using index info to reconstruct a base tree...
M	config.xml
M	www/index.html
.git/rebase-apply/patch:30: trailing whitespace.
		
.git/rebase-apply/patch:41: trailing whitespace.
		<plugin name="cordova-plugin-file" spec="~3.0.0" />	
.git/rebase-apply/patch:51: trailing whitespace.
		<plugin name="cordova-plugin-x-socialsharing" spec="~5.0.2" />	
.git/rebase-apply/patch:54: trailing whitespace.
		
warning: 4 lines add whitespace errors.
Falling back to patching base and 3-way merge...
Auto-merging www/index.html
Auto-merging config.xml
CONFLICT (content): Merge conflict in config.xml
error: Failed to merge in the changes.
Patch failed at 0001 Update config.xml to add all necessaries plugins
The copy of the patch that failed is found in: .git/rebase-apply/patch

When you have resolved this problem, run "git rebase --continue".
If you prefer to skip this patch, run "git rebase --skip" instead.
To check out the original branch and stop rebasing, run "git rebase --abort".
```

## Merge conflicts
Because of our local changes we need to merge them with upstream. This part is very annoying. It's a loop of `git add` (resolve conflict) and `git rebase --continue` till patch local repo with all upstream commits.

## Push updates to forked repo
Now it’s time to push all the updates! This will commit the changes to the Github forked repo for you and then we are up to date with the upstream source. We will use the `git push origin master `which pushes the local changes to the master branch of our origin source.

[Source](http://discoposse.com/2015/07/23/updating-forked-git-repository-from-upstream-source-aka-rebase-all-the-things/)