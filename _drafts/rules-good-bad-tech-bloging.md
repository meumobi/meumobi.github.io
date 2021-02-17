## Good practices

## Write descriptive hyperlinks

[Writing Hyperlinks: Salient, Descriptive, Start with Keyword](https://www.nngroup.com/articles/writing-links/)
Poor Link Text Hurts Usability, Accessibility, and SEO
To help users quickly find what they need, anchor text should stand out from the body content and accurately describe the page that it refers to.

**Avoid**
For this tutorial we used a web master-detail. You can found it [here](https://github.com/meumobi/meu-starter.master-detail.ionic-v4).
**Prefer**
Clone the [web master-detail sample project](https://github.com/meumobi/meu-starter.master-detail.ionic-v4) from the command line.

**Avoid**
Set required permissions to Service Account [How To](https://firebase.google.com/docs/auth/admin/create-custom-tokens#service_account_does_not_have_required_permissions)
**Prefer**
The service account's default permissions do not allow the account to perform certain actions, such as creating tokens. You can [enable your service account to perform token creation](https://firebase.google.com/docs/auth/admin/create-custom-tokens#service_account_does_not_have_required_permissions) by granting the account additional [IAM roles](https://cloud.google.com/iam/docs/).

## Filename matter
Image file names do affect SEO. Google even state this in their [image publishing guidelines](https://support.google.com/webmasters/answer/114016?hl=en):
The filename can give Google clues about the subject matter of the image. Try to make your filename a good description of the subject matter of the image.

**Avoid**
![Prompt]({{ site.BASE_PATH}}/assets/media/deep/2.png)
**Prefer**
![Android universal-link intent prompt]({{ site.BASE_PATH}}/assets/media/deep/…...png)

## Cloud APIs for mockup

https://api.chucknorris.io/
https://randomuser.me/
https://jsonplaceholder.typicode.com/
