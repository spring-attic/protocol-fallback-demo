# This repository is no longer actively maintained by VMware, Inc.


This demo demonstrates 2 important concepts of modern application development in the cloud.

1. Application Modularization including cross-platform modularization
2. Application Resiliency 


While maintaining an appearance of a single application this application actually consist of 4 independent modules (3 WARs and one Node.js based application) where each module is responsible to perform a particular task. 
The analogy that I'll use fro the rest of this readme file is "Corporation with multiple departments". While different departments meant to support the business, they are still considered independent entities within such business and any changes to these departments (i.e., reorganizations, new hires etc.) should not affect the overall health of the business. In other words the business should not stop its overall operations while a particular department is going through changes, the same way your modularized application should not become unavailable as a whole while a particular module needs to be updated.

The use case behind the application is very simple. Enter location description (e.g., Boston, 1600 Pennsylvania av, DC, Area 51) and the application will attempt to render a Map image of this location using Google Maps API.

Description of Modules:

1. location-finder-home - just like the front door to your office building this module represents the entry point into this application (Spring, Java)
2. location-finder-form - just like a department within your business, this module supplies the application with the Search Form to be used to perform a location search (Spring, Java)
3. location-finder-node - Node.js version of the 'location-finder-form'
4. location-finder - just like another department within your business, this module is responsible to perform the actual location search by communication with Google Maps API, getting an image and sending it back to the caller for rendering

As mentioned earlier the first goal of modularization is to modularize your application in such way that the application as a whole is never fully un-available. In other words while some modules might not be available at the given time, the application as a whole is always functioning displaying friendly messages informing you that a particular part of the system is not available asking you to try again later.
Another goal of modularization is more obvious and that is to make sure that each module could be managed independently. That includes updates, changes, deployment and re-deployment.

To communicate with one another modules utilize Messaging via RabbitMQ and Spring Integration AMQP support. 
When you are at the front page you'll see two links:

 - Java Front End
 - Node.js Front End

The only difference is that one will link to Spring MVC based implementation of the Search Form while another is Node.js based. However both of them will communicate with Java based 'location-finder' module via RabbitMQ, thus demonstrating an important part of modern application development in the cloud where Enterprise Application is no longer tied to a single platform. In this case we use Java/Spring and Node.js to implement two different modules in a single application.

Another minor difference is the implementation itself. Node.js based implementation will render the whole new Search Page while Java-based implementation is actually a service call (via AMQP) to 'location-finder-form' module  to request an HTML which represents a Search Form that will be displayed on the front page of the calling module (location-finder-home) 
And although this particular functionality would probably be easier to be implemented using modern web frameworks (e.g., Apache Tiles), the main point here is to show how Messaging could be leveraged for intra-module communication where one modules requires a services of another module and in this particular case the result of such service call happens to be HTML code that represents the Search Form.

As stated earlier, when you click on the 'Java Front End' link the request will be sent via RabbitMQ to a consumer which is responsible to provide HTML code for a 'Search Form'. In our case the 'location-finder-form' module is that consumer. However if its not deployed the application will not crash and instead you will see a friendly message asking you to try again later. If it is deployed it will send the HTML code representing the Search Form and the form will be rendered in the home page. This particular request is initiated via AJAX call using JQuery framework.  Once in the Search Form and you enter search criteria the same thing will happen again. The Message will be routed via RabbitMQ to a consumer which is responsible to perform the actual search. In this case it is the responsibility of the 'location-finder' module.


Application Resiliency

But what would happen if all 3 modules are deployed but for whatever reason your messaging system is down (RabbitMQ), similar to the way your email server or phone service could be temporarily unavailable. In a typical corporate environment such an event would never mean anything catastrophic, but rather a minor inconvenience. In other words your business would keep on running since other protocols could be used to communicate information and this demo demonstrates precisely that. Using auto-fail-over feature of Spring Integration (registering more than one subscriber to a DirectChannel) if AMQP Outbound Gateway results in exception an attempt will be made to communicate via backup subscriber (the second subscriber to a Direct Channel). The second subscriber is HTTP Outbound Gateway. Since each module (with the exception of Node.js) is a WAR file it is only natural to expose them via HTTP as a default. So if AMQP request fails it will fall back on HTTP and only fail if HTTP request fails as well, but it should not fail for as long as the server is up and the particular module is deployed. However if it does fail for some reason, the user will see a friendly error message while you have all the time in the world fix the problem and redeploy it when ready without bringing down your entire business when only one part of it malfunctions.

Deployment

Cloud Foundry
1. Build each Java project with Maven - 'mvn clean install'
2. Navigate to target directory of each module and run 'vmc push' (follow promts)
   Make sure bind RabbitMQ service to each application (use the same instance for each module)
When modules are deployed go to its url and test it. It is currently deployed in CF under http://location-finder-home.cloudfoundry.com

Tomcat/Jetty/JBoss - follow typical WAR deployment procedure. Make sure RabbitMQ is installed and Running. However as I mentioned before it will still work without it.

IMPORTANT
To achieve transparency when it comes to configuration differences while deploying in the cloud vs locally this application is utilizing the new feature of Spring Framework such as Profiles - http://blog.springsource.com/2011/02/14/spring-3-1-m1-introducing-profile/
When starting your local server set the following System property:

-Dspring.profiles.active=local

Things to try

1. Deploy only 'location-finder-home' and click on Java Front End. You should see a friendly message informing you that Search system is temporarily unavailable.
2. Deploy other modules later on and retry the same functionality
3. Un-deploy other modules
4. Make changes and redeploy other modules so you can see the results of your updates
5. While application is running shut down RabbitMQ (emulating a crash). Although you will see exception messages in the server console, the application will continue to function as if nothing happened. This really demonstrates Application Resiliency where applications will fall back on different communication protocol - HTTP in this case. All that by simply registering another subscriber
