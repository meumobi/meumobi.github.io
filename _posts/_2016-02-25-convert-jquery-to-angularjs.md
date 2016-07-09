Convert following jQuery to an Angular way:  
```javascript
$(document).on('click', '[data-in-app-browser] a[href^=http],[data-in-app-browser] a[href^=https]', function(e){
  e.preventDefault();
  e.stopPropagation();
  var $this = $(this);
  var parent = $this.parents('[data-in-app-browser]:first');
  openAppBrowser(this.href, parent.data('inAppBrowser'), parent.data('location'),
  parent.data('gdoc'));
});
```

Angular way is to use angular.element instead of jQuery and accessing window.document via the $document service
Binding an event to $(document) inside an angular directive
Actually you write directives when you want to play with /manipulate DOM. So I guess attaching above event handler in your directive is the correct way or rather Angular way of doing such things
http://stackoverflow.com/questions/24363550/binding-an-event-to-document-inside-an-angular-directive

# jQuery find() method not working in AngularJS directive
You can easily solve that in 2 steps:

1. Reach the child element using querySelector like that: var target = element[0].querySelector('tbody tr:first-child td')
2. Transform it to an angular.element object again by doing: var targetElement = angular.element(target)

You will then have access to all expected methods on the targetElement variable.
Source: http://stackoverflow.com/questions/14865965/jquery-find-method-not-working-in-angularjs-directive
# jQlite (angular's "jQuery" port) doesn't support lookup by classes.
One solution would be to include jQuery in your app.

Another is using QuerySelector or QuerySelectorAll:

`link: function(scope, element, attrs) {
   console.log(element[0].querySelector('.list-scrollable'))
}`
We use the first item in the element array, which is the HTML element. element.eq(0) would yield the same.
Source: http://stackoverflow.com/questions/24620128/find-child-element-in-angularjs-directive

`angular.element(element[0].querySelector('.list-scrollable'));` When should I use [angular.element](https://docs.angularjs.org/api/ng/function/angular.element) ??

# AngularJS - get element attributes values
## with pure angularjs and the jqlite
with pure angularjs and the jqlite you can achieve the goal like [this](http://jsfiddle.net/fXdqj/):

`function doStuff(item) {
  var id = angular.element(item).data('id');
}`
You must not access the element with [] because then you get the pure DOM element without all the jQuery or jqlite extra methods.

## DOM

`function doStuff(item){
    var id = item.attributes['data-id'].value; // 345
}`

This approach is not angular specific, it's part of DOM and then couldn't bu used with ng-click.
Source: http://stackoverflow.com/questions/24673418/angularjs-get-element-attributes-values

http://stackoverflow.com/questions/32125666/convert-jquery-code-to-angularjs
http://stackoverflow.com/questions/30332945/jquery-click-events-not-working-with-angularjs
http://stackoverflow.com/questions/24628410/how-can-i-trigger-the-click-event-of-another-element-in-ng-click-using-angularjs
https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector
http://plnkr.co/edit/cUCJRetsqKmSbpI0iNoJ?p=preview
http://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_document_queryselector_attribute