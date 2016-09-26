---
layout: post
title: Contribute to a Github Project 
categories: [Git]
tags: [github]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

If you use on your own project shareable code from github, you could need to suggest fix or feature. On Github this could be achieved by [submitting a pull request](https://guides.github.com/activities/contributing-to-open-source/#contributing) (PR).

# Fork the repository

# Clone it locally

```bash
$ git clone https://github.com/mcasimir/mobile-angular-ui.git
Cloning into 'mobile-angular-ui'...
remote: Counting objects: 5165, done.
remote: Total 5165 (delta 0), reused 0 (delta 0), pack-reused 5165
Receiving objects: 100% (5165/5165), 23.55 MiB | 292.00 KiB/s, done.
Resolving deltas: 100% (2897/2897), done.
Checking connectivity... done.
$
```

# Add upstream source
Add one more source called upstream to point to the original repo using the command `git remote add upstream`

```bash
$ git remote
origin
$ git remote add upstream https://github.com/mcasimir/mobile-angular-ui.git
$ git remote
origin
upstream
```

You now have two remotes for this project on disk:

- origin which points to your GitHub fork of the project. You can read and write to this remote.
- upstream which points to the main project's GitHub repository. You can only read from this remote.

# Sync fork from upstream
Ensure you have an up-to-date version of code by [syncing fork](https://help.github.com/articles/syncing-a-fork/).

```bash
$ git fetch upstream
...
$ git checkout master
...
$ git merge upstream/master
```

# Create a branch for your edits
When you [create a branch](https://guides.github.com/introduction/flow/) in your project, you're creating an environment where you can work on a feature or a fix.
Your branch name should be descriptive (e.g., refactor-authentication, user-content-cache-key, make-retina-avatars). Including the issue number is usually helpful.

```bash
$ git checkout -b fix/active-class-missing-on-links
Switched to a new branch 'fix/active-class-missing-on-links'
$
```

If the project uses git-flow we recommend using a specific naming conventions where the branch is prefixed with "fix/", or "feature/".

# Commit your work
Ensure that you only fix the thing you're working on. Do not be tempted to fix some other things that you see along the way as your PR will probably be rejected. Make sure that you commit in logical blocks. Each commit message should be sane. Read Tim Pope's [A Note About Git Commit Messages](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

# Create the Pull Request
To create a PR you need to push your branch to the origin remote and then press some buttons on GitHub.

To push a new branch:

```bash
$ git push -u origin fix/active-class-missing-on-links
```

This will create the branch on your GitHub project. The -u flag links this branch with the remote one, so that in the future, you can simply type `git push origin`.

Swap back to the browser and navigate to your fork of the project ([https://github.com/meumobi/mobile-angular-ui](https://github.com/meumobi/mobile-angular-ui) in my case) and you'll see that your new branch is listed at the top with a handy "Compare & pull request" button, Go ahead and press the button!

# Review by the maintainers
Once you’ve opened a pull request a discussion will start around your proposed changes. Other contributors and users may chime in, but ultimately the decision is made by the maintainer(s). You may be asked to make some changes to your pull request, if so, add more commits to your branch and push them – they’ll automatically go into the existing pull request.

# Thanks
... to great [post of Rob allen's](https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/)
