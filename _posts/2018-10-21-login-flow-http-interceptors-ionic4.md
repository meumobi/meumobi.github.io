---
layout: post
title: 'Use HTTP Interceptor on Auth Based Token with Ionic 4'
categories: [Ionic]
tags: [ionic-v4]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

## Core: http interceptor

[Interceptors](https://angular.io/guide/http#intercepting-requests-and-responses) are sitting in between your application and the backend. By using interceptors you can transform a request coming from the application before it is actually submitted to the backend. The same is possible for responses.
We'll move the authentication from URL queryString to http header, and to achieve it we'll use `HttpInterceptor`.

### Write an interceptor
```
$ ng g class core/http-interceptors/auth-interceptor
CREATE src/app/core/http-interceptors/auth-interceptor.ts (33 bytes)
```

```
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { environment } from '@env/environment';

const API_KEY = environment.apiKey;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    /*
    * The verbose way:
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
    */
    // Clone the request and set the new header in one step.
    const authReq = req.clone({ setHeaders: { 'X-Api-Key': API_KEY } });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
```

### Provide the interceptor

```
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from '@core/services/api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CoreModule { }
```

If you don't append your API key correctly, or your API key is invalid, you will receive a 401 - Unauthorized HTTP error.