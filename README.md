## Implementation of Google OAuth2.0 in a decoupled Frontend & Backend.

This project demonstrates on how to integrate Google OAuth2.0 authentication in a decoupled web application. I found it difficult pinpoint an article or a tutorial that demonstrates how to implement google authentication in an application such as this , so I figured I would try it out to save you the peril.

## Tech Stack

For the backend server, we use the following
* [Express](https://expressjs.com/)
* [NodeJS](https://nodejs.org/en/)
* [PassportJS](https://www.passportjs.org/)
* [MongoDB](https://docs.mongodb.com/)

For the frontend client , we are using [React](https://reactjs.org/docs/getting-started.html) with very basic minimal code to demonstrate the overall flow & how all modules come together in tandem.

## Architecture

Here is an overview of the architecture diagram / system design diagram

![image](https://user-images.githubusercontent.com/32787952/123545502-f797d380-d775-11eb-948d-a88d9521156a.png)

## Getting Started

React-client and Server logic has been defined in different folders to be clear and clean. My server is running on localhost:5000, whereas the client is running on localhost:3000. (Feel free to define your own port.)

```
|-- express-google-oauth2.0
|   |-- express-server
|   |   |-- server.js
|   |   |-- package.json
|   |-- react-client
|   |   |-- src
|   |   |   |-- index.js
|   |   |   |-- package.json
```

* ### Setting up Google OAuth Api's in Google Cloud Console
  * Log onto [Google Cloud Console](https://console.cloud.google.com/)

  * Click on Select a project & then New Project

    ![image](https://user-images.githubusercontent.com/32787952/123547659-3f6f2880-d77f-11eb-8e40-8e3039816a21.png)

    ![image](https://user-images.githubusercontent.com/32787952/123547770-adb3eb00-d77f-11eb-9bc3-4628bfaf8dbd.png)
    
  * Provide a suitable name for the Project & organisation if any :

    ![image](https://user-images.githubusercontent.com/32787952/123547833-f53a7700-d77f-11eb-8b50-723343e7e17b.png)

  * Navigate to API and Services by clicking on the Navigation Menu & then on API's & Services.
    
    ![image](https://user-images.githubusercontent.com/32787952/123547963-7eea4480-d780-11eb-8c49-a027bcc09b71.png)

  * Now enable Click on OAuth consent screen & provide your scope either as internal (Only available to users within your organisation.) or external

    ![image](https://user-images.githubusercontent.com/32787952/123548217-7ba38880-d781-11eb-81f2-06551a228f81.png)

  * Fill in all the requisite fields whichever applicable

    ![image](https://user-images.githubusercontent.com/32787952/123548255-a8f03680-d781-11eb-98aa-cfdb90a996cd.png)

  * On click of save & continue , you will be navigated to Scopes 
    
    ![image](https://user-images.githubusercontent.com/32787952/123548322-f2d91c80-d781-11eb-8c54-da2728f6ed4b.png)

  * As shown above , add the necessary scopes & in our case , its profile, email & openid & subsequently scroll down , click Update

  * Save & Continue to the last page

  * Click on Credentials

    ![image](https://user-images.githubusercontent.com/32787952/123548410-52cfc300-d782-11eb-9807-80cad9d64d44.png)

  * Click on Create Credentials & then on OAuthClientId as shown in the image provided below

    ![image](https://user-images.githubusercontent.com/32787952/123549057-020d9980-d785-11eb-9d73-b65548e47b68.png)

  * Select Web application

    ![image](https://user-images.githubusercontent.com/32787952/123549105-29fcfd00-d785-11eb-93ec-5578791c4dd2.png)
    
  * Add http://localhost:5000/api/v1/auth/google/callback as our **redirect URI** & then click Create

    ![image](https://user-images.githubusercontent.com/32787952/123549156-59ac0500-d785-11eb-8c02-9051580032a2.png)

    ![image](https://user-images.githubusercontent.com/32787952/123549243-c7583100-d785-11eb-8c61-7b6338acccd5.png)

   * Copy the above ClientId & ClientSecret into the file named **config.env** under *express-server/server/config/* path

    ![image](https://user-images.githubusercontent.com/32787952/123549313-19995200-d786-11eb-8ecd-72c2d4fed785.png)
    
* ### Setting up MongoDB in your local
  * Download MongoDB from their [Community Download Website](https://www.mongodb.com/try/download/community)

  * Post downloading , to setup MongoDB in your OS , Follow the instruction from this [website](https://docs.mongodb.com/guides/server/install/)

  * For setting up authentication for the mongoDB Instance , The following procedure first adds a user administrator to a MongoDB instance running without access control and then enables access control.

  * Start MongoDB without access control.

    Start a standalone mongod instance without access control.
    ```
     mongod --port 27017 --dbpath /var/lib/mongodb

    ```
  
  * Connect to the instance by using the following command
  
    ```
     mongo --port 27017 

    ```  

  * From the mongo shell, add a user with the userAdminAnyDatabase role in the admin database. 
For more info , check out the [db.createUser Doc](https://docs.mongodb.com/manual/reference/method/db.createUser/#mongodb-method-db.createUser)

    ```
     db.createUser({user: "myname", pwd: "mypass", roles: ["userAdminAnyDatabase"]})
    ```
 
  * Re-start the MongoDB instance with access control.
    
    Shut down the mongod instance. For example, from the mongo shell, issue the following command:
  
    ```
      db.adminCommand( { shutdown: 1 } )
    ``` 
 
    Exit the mongo shell & Start the mongod with access control enabled.

    If you start the mongod from the command line, add the --auth command line option:

    ```
      mongod --auth --dbpath /var/lib/mongodb
    ```

    Connect to mongod instance using the following command

    ```
      mongo --port 27017  --authenticationDatabase "admin" -u "myname" -p
    ```

    Instance will ask the user to input the password, so input the password set in db.createUser step

  * Now formulate the dbconnect MONGODB_URI to be set in the env config file for the express-app.

    ```
      mongodb://myname:mypass@127.0.0.1:27017/?authSource=admin
    ```


* ### Running the whole program
  * Clone the repo
  * After performing all the setups mentioned in the above setup
  * Change directory to the express-server & run the following command 

      Makesure your mongo instance is running in the background
     ```
       npm i
       npm run dev
     ```
      
      You can observer that the express-app will start working & the API's will be accessible through ``` http://localhost:5000```

   * Change directory to react-client & run the following command

     ```
       npm i
       npm run start
     ```

       You can see that react-client will start working & the page can be accessed through the following ```http://localhost:3000```


### Significance of Passport Serializer & Deserialiser

```
// used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id)
// where is this user.id going? Are we supposed to access this anywhere?
  })

// used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })

``` 

The user id (you provide as the second argument of the done function) is saved in the session and is later used to retrieve the whole object via the deserializeUser function.

serializeUser determines which data of the user object should be stored in the session. The result of the serializeUser method is attached to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide the user id as the key) req.session.passport.user = {id: 'xyz'}

The first argument of deserializeUser corresponds to the key of the user object that was given to the done function (see 1.). So your whole object is retrieved with help of that key. That key here is the user id (key can be any key of the user object i.e. name,email etc). In deserializeUser that key is matched with the in memory array / database or any data resource.

The fetched object is attached to the request object as req.user

#### Visual Flow

```
passport.serializeUser(function(user, done) {
    done(null, user.id);
});              │
                 │ 
                 │
                 └─────────────────┬──→ saved to session
                                   │    req.session.passport.user = {id: '..'}
                                   │
                                   ↓           
passport.deserializeUser(function(id, done) {
                   ┌───────────────┘
                   │
                   ↓ 
    User.findById(id, function(err, user) {
        done(err, user);
    });            └──────────────→ user object attaches to the request as req.user   
});
```
