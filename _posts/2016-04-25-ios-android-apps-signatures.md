---
layout: post
title: Check if my iOS and Android App Signatures are correct 
categories: [Tips and tricks]
tags: [iOS, Android]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

The certificates management is pretty annoying when you have a lot of Apps. I often face troubles due to bad password or wrong certificate to publish an App. To save time I used some commands, explained below, to check certificates and password before using them.

# check your iOS signature
run the openssl command `$ openssl pkcs12 -info -nodes -in <YOUR FILE>.p12`, there should be a big section that looks like:

```bash
-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----

-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----
```

# check your Android signature

## Understanding keystore, certificates and alias
The keystore file generated by [Keytool](http://docs.oracle.com/javase/1.5.0/docs/tooldocs/solaris/keytool.html) stores pairs of private and public keys. Each pair or entry stored in the keystore is refered by a unique alias. In brief:

> Keystore entry = private + public key pair = identified by an alias

The keystore protects each private key with its individual password, and also protects the integrity of the entire keystore with a (possibly different) password.
After providing the passwords for both the keystore and the chosen alias, the app is signed and the public key (the certificate) for that alias is embedded into the APK.

You can only release an update to an application that was signed with the alias 'foo' by signing the update again with the same alias. Losing the keystore where your alias is stored would prevent you from releasing an updated version of your app.

[Source](http://stackoverflow.com/questions/5724631/understanding-keystore-certificates-and-alias)

## Looking for alias and/or check password
```bash
$ keytool -v -list -keystore <YOUR FILE>.keystore
Enter keystore password:  

Keystore type: JKS
Keystore provider: SUN

Your keystore contains 1 entry

Alias name: <YOUR ALIAS>
Creation date: Apr 14, 2011
Entry type: PrivateKeyEntry
Certificate chain length: 1
Certificate[1]:
Owner: CN=Spring Wireless, OU=Spring Wireless, O=Spring Wireless, L=Sao Paulo, ST=SP, C=BR
Issuer: CN=Spring Wireless, OU=Spring Wireless, O=Spring Wireless, L=Sao Paulo, ST=SP, C=BR
Serial number: 4da7639c
Valid from: Thu Apr 14 18:14:04 BRT 2011 until: Mon Aug 30 18:14:04 BRT 2038
Certificate fingerprints:
	 MD5:  9E:10:74:D1:98:2B:1A:3A:BF:43:77:A9:5E:64:B4:49
	 SHA1: A5:0B:54:5B:00:BC:ED:5B:FE:FF:E2:C9:74:F3:65:F0:47:58:DB:29
	 SHA256: 7D:F7:C8:36:6F:BE:C7:7F:31:F2:B8:95:D3:94:B5:1C:3F:ED:8B:1A:40:A0:AD:18:E4:F9:10:E4:1B:8C:1E:0F
	 Signature algorithm name: SHA1withDSA
	 Version: 3
$
```

If you are looking for a specific alias, you can also specify it in the command:

`keytool -list -keystore .keystore -alias foo`

If the alias is not found, it will display an exception:

`keytool error: java.lang.Exception: Alias does not exist`

[Signing Your App Manually](http://developer.android.com/intl/pt-br/tools/publishing/app-signing.html#signing-manually)

## keystore-explorer
http://www.keystore-explorer.org/features.php