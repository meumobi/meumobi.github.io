---
layout: post
title: Keep SSH session alive
categories: [Tips & Tricks]
tags: [ssh]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---
sshd (the server) closes the connection if it doesn't hear anything from the client for a while. You can tell your client to send a sign-of-life signal to the server once in a while.

# User's configuration
The configuration for this is in the file "~/.ssh/config", create it if the configuration file does not exist. To send the signal every four minutes (240 seconds) to the remote host, put the following in your "~/.ssh/config" file.

```bash
Host *
ServerAliveInterval 240
```

Also make sure to run, to prevent config file to be world-readable:

```bash
chmod 600 ~/.ssh/config
```


# Global configuration
We can keep our ssh connection alive by having following Global configurations. Add the following line to the /etc/ssh/ssh_config file:

```bash
ServerAliveInterval 60
```

Source: http://stackoverflow.com/questions/25084288/keep-ssh-session-alive