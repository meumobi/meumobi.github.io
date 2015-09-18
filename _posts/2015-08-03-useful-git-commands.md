---
layout: post
title: My Useful Git Commands
categories: [Git]
tags: []
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---
If, like me, you are lost in git command's world, here my ultimate cheatsheet I need and I often forget, c'est la vie, c'est la vie...

# Stashing your Work

So there you are, working on a new feature, modifying files in the working directory and/or index and you find out you need to fix a bug on a different branch. You can’t just switch to a different branch and lose all your work.
http://www.gitguys.com/topics/temporarily-stashing-your-work/

### Add Files to the Index

We first need to add the new files to the index.
No need to add updates to the index since that paths were already in the index: Git will notice that the working directory version is newer than the index and will stash them.

```sh
$ git add NEW_FILE
```

### Stash Time

Now we’re ready for the stashing:

```sh
$ git stash
Saved working directory and index state WIP on master: 8d8b865 Initial commit
HEAD is now at 8d8b865 Initial commit
```

### Work on Another Branch or Two

Now we can do anything we want, such as git checkout other-branch, make modifications, fix bugs, and commit the fix to that branch.


### Stash pop and Working Directory is Back

When we’re ready to continue where we left off, above, we simply type git stash pop and our “stashed” working directory is back where it was when we had typed git stash:

```sh
$ git stash pop
```


# How to clone git repository with specific revision/changeset ?

```sh
$ git clone $URL
$ git reset --hard $SHA1
```

To again go back to the most recent commit

```sh
$ git checkout master
```
# How do I revert all local changes in Git
```sh
$ git checkout .
```
# To create a branch
...and switch to it at the same time, you can run the git checkout command with the -b switch:

```sh
$ git checkout -b iss53
```
Switched to a new branch "iss53"

This is shorthand for:

```sh
$ git branch iss53 // Create a branch iss53
$ git checkout iss53 // Switch to branch iss53
```
# Edit an incorrect commit message
### Commit has not been pushed online
```sh
$ git commit --amend -m "New commit message"
```
…however, this can make multi-line commit messages or small corrections more cumbersome to enter.

Make sure you don't have any working copy changes before doing this or they can get committed too.

### Commit has been already pushed to your remote branch

If you've already pushed your commit up to your remote branch

1. Follow the steps above to amend the commit message.
2. then you'll need to force push the commit with

```sh
$ git push <remote> <branch> --force
```
