<#assign project_id="gs-consuming-rest-restjs">
This guide walks you through the process of consuming a simple Sencha Touch
client that consumes a Spring MVC-based [RESTful web service][u-rest].

What you'll build
-----------------

You will build a Sencha Touch client that consumes a Spring-based RESTful
web service. Specifically, the client will consume the service created in
[Building a RESTful Web Servce][gs-rest-service].

The Sencha Touch client will be accessed by opening the `index.html` file in
your browser, and will consume the service accepting requests at:

    http://rest-service.guides.spring.io/greeting

The service will respond with a [JSON][u-json] representation of a greeting:

```json
{"id":1,"content":"Hello, World!"}
```

The client will render the ID and content into the DOM.

You can customize the greeting with an optional *query string* in the url:

    http://localhost:8080/?User

The code will send a parameter to the REST endpoint and
render a custom greeting into the DOM.


What you'll need
----------------

 - About 15 minutes
 - A favorite text editor
 - A modern web browser (mobile or desktop)
 - An internet connection

<a name="scratch"></a>
<a name="initial"></a>
Create an Ext model
---

First, create an Ext model.  Following Sencha's convention's, place this
model in the `app/model` directory.

<@snippet path="public/app/model/GreetingModel.js" prefix="complete"/>

All Ext models extend `Ext.data.Model`.  This model defines two fields:
'id' and 'content'.


Create a view
---

Sencha's `Ext.Panel` works great as the base for a simple view,
which should also be placed in Sencha's conventional location:

<@snippet path="public/app/view/GreetingView.js" prefix="complete"/>

The contents of the view are defined by the template described in
the `tpl` config option.  The tokens delineated by the curly braces
(e.g. {id}) will be replaced by the model fields when the view is
rendered.


Create an Ext store
---

Next, create an Ext store that will load the `GreetingModel` model.

<@snippet path="public/app/store/GreetingStore.js" prefix="complete"/>

The store extends `Ext.data.Store` and references our `GreetingModel` model
in the config options. To instruct the store to use the REST proxy,
we configure it with a proxy definition with `type:"rest"` and point
it at our REST endpoint url.

To customize the greeting, create a `beforeload` listener that sets
an extra parameter on the proxy's url.


Create an Ext application
---

Next, create an `Ext.app.Application` object using Sencha's `Ext.application`
convenience function:

<@snippet path="public/hello.js" prefix="complete"/>

The application object automatically resolves the location of the models,
views, and stores if you follow the directory conventions and give the
application a name.  Name the application "Hello" and specify the model,
view, and store in the `models`, `views`, and `stores` arrays and they
will be downloaded when the page loads.

Create a `launch` callback where the application will be composed after
all of the files have loaded.  Inside this callback, create an instance
of the view and an instance of the store.  By configuring the store to
autoload, it will immediately fetch the models at the endpoint url.


Configure a load listener to move the fetched data into the view.


Create the application page
---

Finally, create an `index.html` file and add the following HTML:

<@snippet path="public/index.html" prefix="complete"/>

The first `script` element loads Sencha Touch off Sencha's CDN.  The second
script loads the application object.


<a name="run"></a>
Run the client
--------------

You can now run the app using the Spring Boot CLI (Command Line Interface). Spring Boot includes an embedded Tomcat server, which offers a simple approach to serving web content. See [Building an Application with Spring Boot][gs-spring-boot] for more information about installing and using the CLI.

```sh
$ spring run app.groovy
```

Once the app starts, open http://localhost:8080 in your browser, where you see:

![Model data retrieved from the REST service is rendered into the DOM.](images/hello.png)

The ID value will increment each time you refresh the page.


Summary
-------

Congratulations! You've just developed a rest.js client that consumes a
Spring-based RESTful web service.

[gs-rest-service]: /guides/gs/rest-service/
[gs-spring-boot]: /guides/gs/spring-boot/
[zip]: https://github.com/spring-guides/${project_id}/archive/master.zip
<@u_rest/>
<@u_json/>
<@u_git/>
