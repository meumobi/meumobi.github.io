---
layout: post
title: Keep a secure backup of your Apple public-private key pair
categories: [Tips and tricks]
tags: [iOS]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

All apps must be code signed and provisioned to launch on a device. You create signing identities—stored in your keychain—and certificates—stored in your developer account—to sign and provision your app. These assets uniquely identify you or your team, so it’s important to keep them safe.
![keychain]({{ site.BASE_PATH }}/assets/media/keychain/certificates_2x.png)

**If the private key is lost, you’ll have to create an entirely new identity** to sign code. Private keys are stored only in the keychain and can’t be retrieved if lost.
Without the private keys, you can’t sign apps using the certificates, **so you'll not be able to update anymore an already published App!**

If you want to code sign your app using another Mac, you export your Xcode developer profile on the Mac you used to create your certificates and import it on the other Mac. You can also share distribution certificates among multiple team agents using this feature.

# Exporting Your Developer Profile

- Choose Xcode > Preferences.
- Click Accounts at the top of the window.
- Click the Action button (the gear icon to the right of the Delete button) in the lower-left corner, and choose Export Developer Accounts from the pop-up menu.

![keychain]({{ site.BASE_PATH }}/assets/media/xcode/exportdeveloperprofile_2x.png)

Xcode encrypts and password-protects the exported file and save it to the location you specified with a .developerprofile extension. 

# Importing Your Developer Profile
- Choose Xcode > Preferences.
- Click Accounts at the top of the window.
- Click the Action button (the gear icon) in the lower-left corner, and choose Import Developer Accounts from the pop-up menu.

# Going further
 For more details check the offical doc "[Maintaining Your Signing Identities and Certificates](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/MaintainingCertificates/MaintainingCertificates.html)"