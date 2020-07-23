# meanRetails

A Simple MEAN.js Todo Application 

## Table of Contents
- [Dependencies](README.md#dependencies)
- [Features](README.md#features)
- [Frontend to Backend Connection](README.md#frontend-to-backend-connection)
- [MongoDB connection](README.md#mongodb-connection)
- [Development server](README.md#development-server)
- [Demo](README.md#demo)

##Dependencies
 > ##### Frontend
 * Angular-Cli: 8.2.14
 * Typescript: 3.5.3
 * Node: 11.15.0
 * bootstrap: 4.5.0
 * [Angular Material: 8.2.3](https://www.npmjs.com/package/@angular/material)
 * [ngx-translate: 12.1.2](https://www.npmjs.com/package/@ngx-translate/core)
 * [ngx-toaster: 11.3.3](https://www.npmjs.com/package/ngx-toastr)
 
 > ##### Backend
  * Node: 12.16.2
  * [body-parser: 1.19.0](https://www.npmjs.com/package/body-parser)
  * [express: 4.17.1](https://www.npmjs.com/package/express)
  * [mongoose: 5.9.22](https://www.npmjs.com/package/mongoose)
  * [morgan: 1.10.0](https://www.npmjs.com/package/morgan) - For logging HTTP requests
  * [jsonwebtoken: ^8.5.1](https://www.npmjs.com/package/jsonwebtoken) - For token generation and validation
  * [bcryptjs: ^2.4.3](https://www.npmjs.com/package/bcryptjs) - To encrypt the password and store in Database
  
##Features

> ##### Frontend
  * Sign-up/ register new user
  * Login 
  * View the task which are entitled to only logged in user 
  * Update the details of the task
  * Add, Delete the Task
  * Mark task as complete
  * Rearrange the order
  * Edit the task (By clicking on the name) 
  * Data persists after refresh
  * Mark task as important
  * Schedule the task
  * State is maintained after the refresh.
  * Auth.guard to activate the route
  * Auth-interceptor to add bearer token to http requests
  
> ##### Backend
  * Todo Management modules - User, Tasks
  * User module :-
  
        * Endpoint : /user/signup 
        * method:  `POST`
        * Operations: Create/ Register the user with a check for already registered email
        * Note: Password is encrypted using bcrypt and stored in db
        
        * Endpoint : /user/login 
        * method:  `POST`
        * Operations: Authenticate the user and generate the token for authentication purpose for crud operation
  
  * Task module :-
  
        * Endpoint : /tasks 
        * Method: `GET`, `POST` , `DELETE`, `Patch`
        * Operations: Add, Fetch all, Fetch One, Update, Delete Task
  
  *AuthCheck Middleware :-
  
        * To validate the jwt token and extract the user data of logged in user
        
         Add "JWT_KEY": "uniquelongkey" in the env of `\server\config\config.json`

        
  * All the operations can be done by using API from this [Postman collection](https://documenter.getpostman.com/view/11998783/T1DpBGvM) 

  * Todo App can be viewed in Frontend Application [meanTodo](https://samyajithm.github.io/meanTodo/login) developed using Angular.
   
  > **Note**: Product is fetched by making actual api call to endpoint `/tasks` and the placing orders are just a mock in Frontend App


## Frontend to Backend Connection
  * Navigate to `environment.ts | environment.prod.ts` accordingly
  * Change the value of the server to instance uri of backend application
      * To run the backend app locally, goto section - [Development server](README.md#development-server)
      
      Sample server value in `environment` file
      ```typescript
        export const environment = {
          production: false,
          server: "http://localhost:3000"
        };         
      ```  
      * To connect to backend app hoisted in glitch online server (http://meanTodo.glitch.me/)
      
      Sample server value in `environment` file
      ```typescript
        export const environment = {
          production: false,
          server: "https://meanTodo.glitch.me"
        };         
      ```  
      
## MongoDB connection 
* MongoDB Hoisted in MongoDB Atlas 
    * Connect to Application URI -(mongodb+srv://ngShop:ngShop@ngshop.0h5cq.mongodb.net/meanTodo?retryWrites=true&w=majority)
    * Connect using Mongodb compass - (mongodb+srv://ngShop:ngShop@ngshop.0h5cq.mongodb.net/test) 
    * Connect with Mongo Shell - (mongo "mongodb+srv://ngshop.0h5cq.mongodb.net/meanTodo" --username ngShop)

* Config.json is used to provide db connection details
* Open `\server\config\config.json` and

> Sample Connection details for local db instance
```json
{
  "env": {
    "remoteDb": false,
    "dbHost": "127.0.0.1:27017/meanTodo?retryWrites=true&w=majority",
    "dbUserName": "",
    "dbPassword": "",
    "JWT_KEY": "uniquelongkey"
  }
}
```
> Sample Connection details for remote db instance
```json
{
  "env": {
    "remoteDb": true,
    "dbHost": "@ngshop.0h5cq.mongodb.net/meanTodo?retryWrites=true&w=majority",
    "dbUserName": "ngShop",
    "dbPassword": "ngShop",
    "JWT_KEY": "uniquelongkey"
  }
}
```  
>*Note:* Above `"JWT_KEY": "uniquelongkey"` key:value pair is related to Auth jwt token.
## Development server

* Navigate to project base folder in your local system and Run `npm install`.
* `npm run start` to start the angular and node.js application. This will start the angular application on port 4200 and node.js application on port 3000


## Demo 

* [Demo](https://samyajithm.github.io/meanTodo/login)
* [Postman Collection](https://documenter.getpostman.com/view/11998783/T1DpBGvM)

  > **# Note:** [Demo](https://samyajithm.github.io/meanTodo/login) instance is connected to node.js app hoisted in (http://meanTodo.glitch.me) and MongoDb hoisted in MongoDB atlas.
