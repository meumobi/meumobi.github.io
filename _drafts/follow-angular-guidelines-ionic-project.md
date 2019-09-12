
- [x] Folders-by-feature structure

  - [How to define a highly scalable folder structure for your Angular project](https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7)
  - [angular.io - Folders-by-feature structure](https://angular.io/guide/styleguide#folders-by-feature-structure)



## Use ng schematics instead of @ionic/angular-toolkit
angular.json remove 

```
  "cli": {
    "defaultCollection": "@ionic/angular-toolkit"
  },
   "schematics": {
    "@ionic/angular-toolkit:component": {
      "styleext": "scss"
    },
    "@ionic/angular-toolkit:page": {
   }
	}
```

## Make ng components Ionic compliant
When create module imports IonicModule
When create component add update html to include `ion-content`

## Update ng default style extension
By default angular create component with css style file, if your Ionic project use scss run following cmd to update ng config

```
ng config schematics.@schematics/angular:component.styleext scss
```

[source](https://medium.com/@rageshchakkadath/migrate-your-existing-angular-6-application-from-css-to-scss-f555749d490e)

should add following lines on your `angular.json`

```
  "schematics": {
    "@schematics/angular:component": {
      "styleext": "scss"
    }
  }
```