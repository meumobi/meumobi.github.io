You create signing identities—stored in your keychain—and certificates—stored in your developer account—to sign and provision your app. These assets uniquely identify you or your team, so it’s important to keep them safe. 

Code signing your app allows the operating system to identify who signed your app and to verify that your app hasn’t been modified since you signed it. Your app’s executable code is protected by its signature because the signature becomes invalid if any of the executable code in the app bundle changes. 

Code signing also allows your app’s signature to be removed and re-signed by a trusted source.

Xcode uses your signing identity to sign your app during the build process. This signing identity consists of a public-private key pair that Apple issues. The public-private key pair is stored in your keychain, and used by cryptographic functions to generate the signature. The certificate stored in your developer account contains just the public key. An intermediate certificate is also required to be in your keychain to ensure that your certificate is issued by a certificate authority.

Signing requires that you have both the signing identity and the intermediate certificate installed in your keychain. When you install Xcode, Apple’s intermediate certificates are added to your keychain for you. You use Xcode to create your signing identity and sign your app. Your signing identity is added to your keychain, and the corresponding certificate is added to your developer account.

Because the private key is stored locally on your Mac, protect it as you would an account password. Keep a secure backup of your public-private key pair. If the private key is lost, you’ll have to create an entirely new identity to sign code.

If you want to code sign your app using another Mac, you export your developer profile on the Mac you used to create your certificates and import it on the other Mac. You can also share distribution certificates among multiple team agents using this feature. (Team members should not share development certificates.)


== Push certificate

when your existing APNS certificate expired, if your server still uses it - existing iOS applications will not be able to receive any notifications from your server. But as soon as you regenerate certificate and update your server to use it - everything will be normal again without any changes to already installed apps. You won't need to resubmit your app.


Source: https://stackoverflow.com/a/46420295/4982169

https://www.lifewire.com/renew-apple-developers-certificate-1994289

https://support.magplus.com/hc/en-us/articles/204967377-iOS-Renewing-a-Distribution-Certificate
http://stackoverflow.com/questions/10759973/proper-way-to-renew-distribution-certificate-for-ios