copy @ionic/app-scripts/config/copy.config.js to ./config/.

Add on package.json

```
  "config": {
    "ionic_copy": "./config/copy.config.js"
  }
````

`npm install -S react-pivot`

Append on copy.config.js

```
  copyReactPivot: {
    src: ['{{ROOT}}/node_modules/react-pivot/dist/react-pivot-standalone-2.0.0.min.js'],
    dest: '{{BUILD}}'
  },
```

Open your project’s src/index.html and include the script tag

```
  <!-- React-Pivot is used for report -->
  <script src="build/react-pivot-standalone-2.0.0.min.js"></script>
```


using external libraries with ionic2
https://www.thepolyglotdeveloper.com/2016/01/include-external-javascript-libraries-in-an-angular-2-typescript-project/
https://mhartington.io/post/ionic2-external-libraries/
https://www.joshmorony.com/how-to-install-3rd-party-libraries-in-ionic-2/
https://stackoverflow.com/a/37084553

Video React-Pivot
https://vimeo.com/124191178