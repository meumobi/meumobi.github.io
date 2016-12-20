

Onsen UI with ui-router
https://onsen.io/blog/onsen-ui-router-app/


Onsen UI uses its own route system and was not meant to be used with an external router, but definitely it is compatible with a router such as ui-router.

Unlike the [$route service](https://docs.angularjs.org/api/ngRoute/service/$route) in Angular core, which is organized around URL routes, UI-Router is organized around states



# What is AngularUI Router?
The [UI-Router](https://github.com/angular-ui/ui-router) is a routing framework for AngularJS built by the AngularUI team. It provides a different approach than ngRoute in that it changes your application views based on state of the application and not just the route URL.


https://scotch.io/tutorials/angular-routing-using-ui-router

# Benefits of UI-Router vs ngRoute
Nested States & Views
Multiple & Named Views

# Using URL Parameters with States
https://scotch.io/tutorials/3-simple-tips-for-using-ui-router#using-url-parameters-with-states

# Edit style of tabbar
:checked + .tab-bar__button {
  color: rgba(24,103,194,0.81);
  background-color: #f7f7f7;
}
:checked + .tab-bar__button > .tab-bar__icon {
  color: rgba(24,103,194,0.81);
}