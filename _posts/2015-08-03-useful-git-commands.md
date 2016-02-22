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
![git-logo]({{ site.BASE_PATH }}/assets/media/git-logo@2x.png)

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
# Amend your last commit
If you ever find that you accidentally left something out of your last commit, be it a file, an extra change to a file that you just committed or a wrong comment,  don't worry. It can easily be fixed.
### Commit has not been pushed online
```sh
$ git commit --amend -m "New commit message"
```

or if you don't want to re-type the commit message (you'll prompted to edit and save it):

```sh
$ git commit --amend
```

…however, this can make multi-line commit messages or small corrections more cumbersome to enter.
Make sure you don't have any working copy changes before doing this or they can get committed too.

Source: https://nathanhoad.net/git-amend-your-last-commit
### Commit has been already pushed to your remote branch

If you've already pushed your commit up to your remote branch

1. Follow the steps above to amend the commit.
2. then you'll need to force push the commit with

```sh
$ git push <remote> <branch> --force
```

# How to modify a specified commit in git?
Assume you have a history that looks like this:

```bash
$ git log --graph --oneline
* b42d293 Commit3
* e8adec4 Commit2
* faaf19f Commit1
```

I know that I can modify HEAD commit with git commit --amend, but how can I modify Commit2, given that it is not the HEAD commit?

Interactive rebase with --autosquash is something useful when you need to fixup previous commits deeper in the history. It's especially handy when you have more than one commit you need to edit.

From the documentation:
> --autosquash  
  
When the commit log message begins with "squash! …​" (or "fixup! …​"), and there is a commit whose title begins with the same …​, automatically modify the todo list of rebase -i so that the commit marked for squashing comes right after the commit to be modified

If you have changes that you want to amend to Commit2 then commit your changes using:

```sh
$ git commit -m "fixup! e8adec4"
```

Then initiate an interactive rebase on the commit before

```sh
$ git rebase e8adec4^ -i --autosquash
```
Your editor will open with the commits already correctly ordered

```sh
pick e8adec4 Commit2
fixup 54e1a99 fixup! Commit2
pick b42d293 Commit3
```

All you need to do is save and exit
# How to have git log show filenames ?

```sh
$ git log --stat
```

# Mark Release Points with Tags
## Lightweight Tags
To create a lightweight tag, this is basically the commit checksum stored in a file – no other information is kept, use following command:

```sh
$ git tag rel-1.2.7
```

[Git-Basics-Tagging](http://git-scm.com/book/en/v2/Git-Basics-Tagging)

## Sharing Tags
By default, the git push command doesn’t transfer tags to remote servers. You will have to explicitly push tags to a shared server after you have created them. This process is just like sharing remote branches – you can run git push origin [tagname].

```sh
$ git push origin rel-1.2.7
```

# Automatically convert line endings correctly for your platform
In git-config, set core.autocrlf to true to make git automatically convert line endings correctly for your platform.

```sh
$ git config core.autocrlf true
```

# Undo a local commit
To restore everything back to the way it was prior to the last commit, we need to reset to the commit before HEAD:

```sh
git reset --soft HEAD^     # use --soft if you want to keep your changes
git reset --hard HEAD^     # use --hard if you don't care about keeping the changes
```

# Undo a public commit
If you have already made your commits public, you will want to create a new commit which will "revert" the changes you made in your previous commit (current HEAD).

```sh
git revert HEAD
```

Your changes will now be reverted and ready for you to commit:

```sh
git commit -m 'restoring the file I removed by accident'
git log
    commit 102: restoring the file I removed by accident
    commit 101: removing a file we dont need
    commit 100: adding a file that we need
```

# Undo 'git add' before commit
You can undo git add before commit with

```sh
git reset <file>
```

Which will remove it from the current index without changing anything else.

To unstage all due changes, use also reset command withour any file name.

```sh
git reset
```

Source: 
- http://stackoverflow.com/questions/348170/undo-git-add-before-commit
- https://github.com/blog/2019-how-to-undo-almost-anything-with-git

# Copy working-tree (without .git files)
Checkout from remote repository
git checkout --work-tree=tmp/ --git-dir="https://github.com/meumobi/ConferenceTracker.git"

Checkout files of current git repository
path-to-repository$ git checkout --work-tree=../tmp/Employee checkout HEAD -- .

Source: http://stackoverflow.com/a/16493707/4982169

# Git clone including submodules

```sh
git clone --recurse-submodules
```

Note that --recurse-submodules and --recursive
Source: http://stackoverflow.com/questions/3796927/how-to-git-clone-including-submodules

# Links

- http://rogerdudler.github.io/git-guide/
- http://www.miximum.fr/enfin-comprendre-git.html
