This demo demonstrates two important concepts of modern application development in the cloud.

1. Application Modularization
2. Application Resiliency 

While maintaining an appearance of a single application this application actually consist of 3 independent modules (3 WARs) where each module is responsible to perform a particular task. 
1. location-finder-home - just like the front door to your office building this module represents the entry point into this application.
2. location-finder-form - just like a department within your business, this module supplies the application with the search form to be used to perform a location search
3. location-finder - just like another department within your business, this module is responsible to perform the actual location search

The main point of this demo is that just like in the real business if one department is not available the overall business still operates. In other words the application will run successfully with only location-finder-home module being deployed since it truly represents the core of your business, but just like in real business unless a particular department is open and operates the part of the business such department is responsible for will not be available available. In this demo you will simply see a friendly message urging you to try again later.


To communicate with one another modules utilize RabbitMQ and Spring Integration AMQP support allowing for a seamless integration of modules. 
When you are at the front page there and you click on the 'Begin' link the request will be sent via RabbitMQ to a consumer which is responsible to provide HTML code for a 'Search Form'. In our case the 'location-finder-form' module is that consumer. However if its not deployed you will see a friendly message asking you to try again later. If it is deployed it will render the HTML Search Form. When you enter search criteria the same thing happens again. The Message will be routed via RabbitMQ to a consumer which is responsible to perform the actual search. In our case it is the responsibility of the location-finder module.

But what would happen if all 3 modules are deployed but for whatever reason your messaging system is down (RabbitMQ), similar to the way your email server or phone service could be temporarily unavailable. In a typical corporate environment such an event would never mean anything catastrophic, but rather a minor inconvenience. IN other words your business would keep on running since there are other mediums to communicate information. Well the same thing happens here. Using auto-fail-over feature of Spring Integration if AMQP Inbound Gateway results in exception and attempt will be made to communicate via backup subscriber (nothing more than a second subscriber to a Direct Channel). The second subscriber is HTTP Inbound Gateway. Since each module is a WAR file it is only natural to expose them via HTTP as a default. So if AMQP request fails it will fall back on HTTP and only fail if HTTP request fails as well, but it should not fail for as long as the server is up and the module is deployed. However if it does fail for some reason, than all you need to do is un-deploy that particular module, fix the problem and redeploy it when ready without bringing down your entire business when only one part of it malfunctions.
