---
layout: post
title: Getting started with Vagrant
categories: [Vagrant]
tags: [tutorial]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

[Vagrant](https://www.vagrantup.com) provides easy to configure, reproducible, and portable work environments. It's main objective is to make the "works on my machine" excuse a relic of the past ;-)
![vagrant]({{ site.BASE_PATH }}/assets/media/vagrant/logo-vagrant.png)


# Setup
You should first [Download Vagrant](https://www.vagrantup.com/downloads.html) and any supported [provider](https://www.vagrantup.com/docs/providers/), for example [docker](https://www.docker.com/) or [virtualBox](https://www.virtualbox.org/wiki/Downloads).

Then verify your installation:

```bash
$ vagrant -v
```

# Up and Running

```bash
$ vagrant init hashicorp/precise64
$ vagrant up
```

After running the above two commands, you will have a fully running virtual machine in VirtualBox running Ubuntu 12.04 LTS 64-bit. You can SSH into this machine with `vagrant ssh`, and when you are done playing around, you can terminate the virtual machine with `vagrant destroy`.


## List downloaded boxes.

```bash
$ vagrant box list
```

# Control virtual machine state

## Status

`$ vagrant status`

## Start

`$ vagrant up`

## Stop

`$ vagrant halt`

## Restart

`$ vagrant reload`

## Teardown

With Vagrant, you **suspend, halt, or destroy** the guest machine. Each of these options have pros and cons. Choose the method that works best for you.

For more details see on official doc [Getting started / teardown](https://www.vagrantup.com/intro/getting-started/teardown.html)


# Furthermore

- [How to get started with Vagrant](https://blog.sleeplessbeastie.eu/2016/08/01/how-to-get-started-with-vagrant/)
- [How to build Vagrant Debian base box using VirtualBox](https://blog.sleeplessbeastie.eu/2016/09/26/how-to-build-vagrant-debian-base-box-using-virtualbox/)