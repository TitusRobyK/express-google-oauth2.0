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
  * 
  




    




    
    
