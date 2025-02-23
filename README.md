# covalis

Create a NestJS RestAPI method that accepts 3 parameters:

* Company ticker name
* Data point name
* Table name

Based on these 3 parameters you need to decide which data point the method needs to
return. Company ticker name defines which row to look at, data point name defines the
column name, and the table name defines from which table to take the data from.

In this example, please create 3 separate data tables anywhere you want and query data
using TypeORM.

The decision from which table to query data from should be made in any selected rules
engine or BPMN engine – ‘if’, ‘switch’ statements should be avoided.

Bonus points:

* Unit tests
* Dockerfiles
* Caching implementation