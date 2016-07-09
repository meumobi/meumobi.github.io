---
layout: post
title: How do I stop my emails being flagged as spam ?
categories: [Sendmail]
tags: [SPF, DKIM]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---
How do I stop my emails being flagged as spam ? The response should be:
Setup your DNS to Authorize your Server to Send Mail using your Domain and not be considered as Spam.

When recipients receive your emails, their spam filters automatically poke your domain to see if email sender is not forged. In order to do that filters check 3 effective email signatures:

- [Sender Policy Framework (SPF)](http://www.openspf.org/) records allow domain owners to publish a list of IP addresses or subnets that are authorized to send email on their behalf.
- [DomainKeys Identified Mail (DKIM)](http://opendkim.org) Internet standard enables your server to cryptographically sign your email messages. Sending organization uses private key to sign a hash or fingerprint of the message and receiver can retrieve the corresponding public key via DNS to verify the signature.
- [Domain-based Message Authentication (DMARC)](https://dmarc.org)

[Google Authentication & Identification Guidelines](https://support.google.com/mail/answer/81126?hl=en#authentication) also recommends to keep valid reverse DNS records for  the IP address(es) from which you send mail, pointing to your domain. 


authenticate your email messages with DKIM and SPF
DKIM and SPF? They're 2 effective email signatures against spoofing, phishing or impersonation

The main requeriments are:
reverse DNS configured correctly
configure SPF (Sender Policy Framework)
 
The "meumobi.com" domain failed on both checks
 
1. reverse DNS configured correctly
     nslookup 91.121.156.68
     returns:  68.156.121.91.in-addr.arpa	name = ks359225.kimsufi.com.
 
2. configure SPF (Sender Policy Framework)
    nslookup -q=txt meumobi.com
 
updated to works with RIMOBI, I've didn't tested yet, only add the ip6, mail sender should use meumobi.com domain
 
I've added SPF entry on OVH DNS Management. OVH provide a form to generate the SPF:
IN TXT "v=spf1 a mx ip6:fe80::250:56ff:fea0:88be ip6:2001:41d0:a:3a1b::1 ip6:2001:41d0:8:a4f::1 ~all"
 
I've updated following reverses:
elefante 176.31.249.79	from ks387594.kimsufi.com to meumobi.com
arpoador 37.187.106.27	from [EMPTY] to int-meumobi.com.

## X-Authentication-Warning
If you change the sender of e-mail, you should see "X-Authentication-Warning" header on Original email Source, see below an example

`X-Authentication-Warning: host.domain.com: www-data set sender to no-reply@domain.com using -f`

### Configure trusted-users in sendmail
You can stop that header appearing by configuring user (www-data on example above) as a trusted user in [sendmail], allowed to change the sender on an e-mail. Assuming your sendmail is standard and version is > 8.13, the simplest way is usually to add www-data to /etc/mail/trusted-users (one username per line). And add the optional FEATURE named use_ct_file in submit.mc. 

### Alternative solution: Use a SMTP client/library in your application
Use a SMTP client/library in your application and send your mails directly to the SMTP gateway. You will not send them thru sendmail, which add this line.

[sendmail](http://www.sendmail.com/sm/open_source/docs/configuration_readme/) 
http://www.kitterman.com/getspf2.py
http://mxtoolbox.com/dkim.aspx
https://dmarc.org/presentations/Email-Authentication-Basics-2015Q2.pdf
http://support.postmarkapp.com/customer/portal/articles/64736-how-can-i-check-if-my-dkim-and-spf-records-are-valid-

https://www.mail-tester.com/spf-dkim-check
https://support.google.com/mail/answer/81126
http://dkimvalidator.com/
http://opensourcehacker.com/2014/02/19/checking-your-domains-dkim-spf-and-spam-record-status-for-outgoing-smtp-mail/
http://www.computerhope.com/unix/usendmai.htm
http://www.dkim.org/deploy/index.html