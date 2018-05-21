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
Source: [http://www.gitguys.com/topics/temporarily-stashing-your-work/](http://www.gitguys.com/topics/temporarily-stashing-your-work/)

## Add Files to the Index

We first need to add the new files to the index.
No need to add updates to the index since that paths were already in the index: Git will notice that the working directory version is newer than the index and will stash them.

```sh
$ git add NEW_FILE
```

## Stash Time

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

# Changing an older commit message
You can use interactive rebase, then force push to change the commit history.

On the command line, navigate to the repository that contains the commit you want to amend.
Use the git rebase -i HEAD~n command to display a list of the last n commits in your default text editor.

1. Replace `pick` with `reword` before each commit message you want to change.
2. Save and close the commit list file.
3. In each resulting commit file, type the new commit message, save the file, and close it.
4. Force-push the amended commits.

```bash
$ git rebase -i HEAD~3
pick d575f9c ENHANCEMENT: Closes #73, add SANB aditional contact
reword caa46b3 FEATURE: Closes #183, add one-signal Push provider support
pick 7ef0ace Update release notes

...
$ git push --force
```

Source: [https://help.github.com/articles/changing-a-commit-message/](https://help.github.com/articles/changing-a-commit-message/)

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

Source: [https://nathanhoad.net/git-amend-your-last-commit](https://nathanhoad.net/git-amend-your-last-commit)

### Commit has been already pushed to your remote branch

If you've already pushed your commit up to your remote branch

1. Follow the steps above to amend the commit.
2. then you'll need to force push the commit with

```sh
$ git push <remote> <branch> --force
```

# How to modify a specified commit ?
Assume you have a history that looks like this:

```bash
$ git log --graph --oneline
* b42d293 Commit3
* e8adec4 Commit2
* faaf19f Commit1
```

I know that I can modify HEAD commit with `git commit --amend`, but how can I modify Commit2, given that it is not the HEAD commit?

Interactive rebase with `--autosquash` is something useful when you need to fixup previous commits deeper in the history. It's especially handy when you have more than one commit you need to edit.

From the man git-rebase page:

> `--autosquash`  
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

## Checkout a Specific Tag
`$ git clone` will give you the whole repository.

After the clone, you can list the tags with `$ git tag -l` and then checkout a specific tag:

`$ git checkout tags/<tag_name>`

Even better, checkout and create a branch (otherwise you will be on a branch named after the revision number of tag):

`$ git checkout tags/<tag_name> -b <branch_name>`

# Revert a file to a specific revision using Git?

Assuming the hash of the commit you want is c5f567:

```
$ git checkout c5f567 -- file1/to/restore file2/to/restore
```

# Rename a tag
Rename a tag old to new:

```sh
$ git tag new old
$ git tag -d old
$ git push origin :refs/tags/old
$ git push --tags
```

The colon in the push command removes the tag from the remote repository. If you don't do this, git will create the old tag on your machine when you pull.

Finally, make sure that the other users remove the deleted tag. Please tell them(co-workers) to run the following command:

`git pull --prune --tags`

[Source](https://stackoverflow.com/a/5719854/4982169)

# Automatically convert line endings correctly for your platform
In git-config, set core.autocrlf to true to make git automatically convert line endings correctly for your platform.

```sh
$ git config core.autocrlf true
```

# Undo a local commit
To restore everything back to the way it was prior to the last commit, we need to reset to the commit before HEAD:

```sh
git reset --hard HEAD^     # use --hard if you don't care about keeping the changes
```

You want to nuke to last commit and never see it again.

```sh
git reset HEAD^     # use --hard if you don't care about keeping the changes
```

You tell Git to move the HEAD pointer back one commit. But (unless you use --hard) you leave your files as they were. So now git status shows the changes you had checked into C. You haven't lost a thing!

```sh
git reset --soft HEAD^     # use --soft if you want to keep your changes
```

This not only leaves your files alone, it even leaves your index alone. When you do git status, you'll see that the same files are in the index as before. In fact, right after this command, you could do git commit and you'd be redoing the same commit you just had.

You also can *undo last n commits* using `git reset --soft HEAD~n`

# Undo a public commit
## Revert commit
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

Reverting a commit means to create a new commit that undoes all changes that were made in the bad commit. Just like above, the bad commit remains there, but it no longer affects the current master and any future commits on top of it.

## Rewrite history
If you want to rewrite the history, I recommend to read the post [Git HowTo: revert a commit already pushed to a remote repository](http://christoph.ruegg.name/blog/git-howto-revert-a-commit-already-pushed-to-a-remote-reposit.html) from [Christoph Rüegg](https://twitter.com/cdrnet)

```sh
git rewrite history vs revert commit
$ git rebase -i 56424e4^
Replace ‘pick’ by ‘remove’ on commit line to be removed
$ git rebase --continue
$ git push -f
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
- [http://stackoverflow.com/questions/348170/undo-git-add-before-commit](http://stackoverflow.com/questions/348170/undo-git-add-before-commit)
- [https://github.com/blog/2019-how-to-undo-almost-anything-with-git](https://github.com/blog/2019-how-to-undo-almost-anything-with-git)

# Copy working-tree (without .git files)
Checkout from remote repository

```bash
git checkout --work-tree=tmp/ --git-dir="https://github.com/meumobi/ConferenceTracker.git"
```

Checkout files of current git repository

```bash
path-to-repository$ git checkout --work-tree=../tmp/Employee checkout HEAD -- .
```

Source: [http://stackoverflow.com/a/16493707/4982169](http://stackoverflow.com/a/16493707/4982169)

# Git clone including submodules

```sh
git clone --recurse-submodules
```

Note that `--recurse-submodules` and `--recursive` are equivalent aliases.
Source: [http://stackoverflow.com/questions/3796927/how-to-git-clone-including-submodules](http://stackoverflow.com/questions/3796927/how-to-git-clone-including-submodules)

# Rollback to an old Git commit

you just want your working copy to reflect a specific commit? Use git checkout and the commit hash.
Use git checkout <commit> -b <branchname> to checkout into a branch, or git checkout <commit> . to checkout into the current branch.

```	
$ git checkout 1a9b1267d1c2d66b8ff668ee79a21fc261008d68 -b rel-05-apr
Switched to a new branch 'rel-05-apr'
$ git branch
  master
* rel-05-apr
$
```

Source: [http://stackoverflow.com/questions/2007662/rollback-to-an-old-git-commit-in-a-public-repo](http://stackoverflow.com/questions/2007662/rollback-to-an-old-git-commit-in-a-public-repo)

# Rename branch (locally and remotely)

```bash
git branch -m old_branch new_branch         # Rename branch locally    
git push origin :old_branch                 # Delete the old branch    
git push --set-upstream origin new_branch   # Push the new branch, set local branch to track the new remote
```

# How to release a patch for a previous version

> It seems that there is a concept of a "support" branch in git flow. This is used to add a hotfix to an earlier release

Source: [handle hotfix of an earlier release](http://stackoverflow.com/a/33052352/4982169)

````bash
git checkout 6.0
git checkout -b support/6.x
git checkout -b hotfix/6.0.1
```
... make your fix, then:

```bash
git checkout support/6.x
git merge hotfix/6.0.1
git branch -d hotfix/6.0.1
git push origin --delete hotfix/6.0.1 #If you need to remove remotely
git tag 6.0.1
```

How do we release a patch for a previous version
https://github.com/GitTools/GitVersion/issues/128

Support branches are not really covered in GitFlow, but are essential if you need to maintain multiple major versions at the same time. You could use support branches for supporting minor releases as well.
https://gitversion.readthedocs.io/en/latest/git-branching-strategies/gitflow-examples/

# Merge Pull Request
If your repo is https://github.com/johnsmith/hello-world.git

## Step 1: Check out a new branch and test the changes
From your project repository, check out a new branch and test the changes.

```
git checkout -b johnsmith-fix/ion2-calendar master
git pull https://github.com/johnsmith/hello-world.git fix/ion2-calendar
```

## Step 2: Merge the changes and update on GitHub.

```
git checkout master
git merge --no-ff johnsmith-fix/ion2-calendar
git push origin master
```

Source: [merging-a-pull-request](https://help.github.com/articles/merging-a-pull-request/)

# Merge branch into master

The usual approach while developing is

```
git checkout master
git pull
git checkout enhance/improve-events-display
git log master..
git merge origin/enhance/improve-events-display # to update your local enhance/improve-events-display from the fetch in the pull earlier
```

When you're ready to merge back into master

```
git checkout master
git log ..enhance/improve-events-display
git merge enhance/improve-events-display
git push
```

Source: http://stackoverflow.com/a/5608860

# Delete branch locally and remotely
After merge if you want to delete local branch,

```
$ git branch -d enhance/improve-events-display
```

and remote,

```
$ git push origin --delete enhance/improve-events-display
```

# Delete tag locally and remotely
If you want to delete local tag,

```
$ git tag -d v0.0.1
```

and remote,

```
$ git push origin --delete v0.0.1
```

# Fetch all git branches

When you clone a repository all the information of the branches is actually downloaded but the branches are hidden. With the command

```
$ git branch -a
```

you can show all the branches of the repository, and with the command

```
$ git checkout -b branchname origin/branchname
```
you can then "download" them manually one at a time.

Sources: 
- http://stackoverflow.com/questions/10312521/how-to-fetch-all-git-branches
- https://gist.github.com/tamtamchik/2869690

# Download a specific tag

`$ git clone` will give you the whole repository.

After the clone, you can list the tags with `$ git tag -l` and then checkout a specific tag:

`$ git checkout tags/<tag_name>`

Even better, checkout and create a branch (otherwise you will be on a branch named after the revision number of tag):

`$ git checkout tags/<tag_name> -b <branch_name>`

Source: [https://stackoverflow.com/a/792027/4982169](https://stackoverflow.com/a/792027/4982169)

# Checkout a specific revision

```
$ git checkout <sha1>
```

# Working on wrong branch - how to copy changes to existing topic branch

```
$ git stash
$ git checkout branch123
$ git stash apply
```

[Source](https://stackoverflow.com/questions/5964118/git-working-on-wrong-branch-how-to-copy-changes-to-existing-topic-branch)


# Overriding remote repository with mine local

If your remote repository contains a bad version, and you have the copy of a good version locally. Running [git push --force](https://www.kernel.org/pub/software/scm/git/docs/git-push.html) command you'll replace everything that's on the remote repository with your local:

```
$ git push --force
```

# Merge branch into master with just one commit 

Say your bug fix branch is called bugfix and you want to merge it into master:

```
$ git checkout master
$ git merge --squash bugfix
$ git commit
```

This will take all the commits from the bugfix branch, squash them into 1 commit, and merge it with your master branch.

[Source](https://stackoverflow.com/a/5309051/4982169)

# Links

- [http://rogerdudler.github.io/git-guide/](http://rogerdudler.github.io/git-guide/)
- [http://www.miximum.fr/enfin-comprendre-git.html](http://www.miximum.fr/enfin-comprendre-git.html)
- [Essential Git commands – Andy Walpole](https://andywalpole.me/blog/148397/essential-git-commands)
