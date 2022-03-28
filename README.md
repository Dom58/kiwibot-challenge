# kiwibot-challenge
Kiwibot Technical Test

## Prerequisites
* Node
* Postman
* Firebase account
* Github account

## Technology used

### Frontend
* ReactJs
* JavaScript
* HTML
* CSS
* Bootstrap
* Firebase

### Backend 
  * Node
  * Express
  * Firebase

### Version 1 Endpoints

| Method         | Endpoint             | Description  |
| ---         |     ---      |          --- |
| POST   | /api/v1/deliveries/create    | Create a delivery   |
| GET   | /api/v1/deliveries    | Get all deliveries    |
| GET   | /api/v1/deliveries/:id    | Get single delivery    |
| PUT   | /api/v1/deliveries/update/:id   | Update single delivery    |
| DELETE   | /api/v1/deliveries/delete/:id   | Delete a single delivery    |
| POST     | /api/v1/deliveries/assign/:deriveryId/bot/:botId | Assign Bot to delivery   |
| PATCH     | /api/v1/deliveries/update/in_transit/:id | Make a delivery to in_transit   |
| PATCH     | /api/v1/deliveries/update/delivered/:id| Make a delivery delivered   |
| POST   | /api/v1/bots/create    | Create a bot   |
| GET   | /api/v1/bots    | Get all bots    |
| GET   | /api/v1/bots/:id    | Get single bot    |
| PUT   | /api/v1/bots/update/:id   | Update single bot    |
| DELETE   | /api/v1/bots/delete/:id   | Delete a single bot    |

## Setup 

### 1. Backend
  1. Clone the repository
     ```https://github.com/Dom58/kiwibot-challenge.git```
     
  2. on root folder 
  
    Run ``` yarn install```or  ```npm run yarn install```

   3. Install dependencies
  
    ```yarn install```
     
   4. Start the server of development
  
     ```yarn run dev```

    5. Start the server of production
  
    ```yarn start```
  
    6. Open postman to test Kiwibot challenge APIs ```localhost:5001/api/v1```

    * For more information read well `.env.example` to add the environment variables for the backend

### 2. Frontend
  1. Clone the repository
     ```https://github.com/Dom58/kiwibot-challenge.git```
     
  2. Access the client directory
     ```cd client```

  3. Install dependencies
  
     ```npm install``` or ```yarn install```
     
  4. Start the application
  
     ```npm run start``` or ```yarn start```
  
  * For more information read well `.env.example` to add the environment variables for the frontend
  * Wait the browser to be openned its-self

## Hosted application on Firebase
[Kiwibot Challenge Frontend](https://technical-test-apis.web.app/) and make sure local server for API is running correctly on port ```5001``` or your port added on ``.env`` file.

## Author
Dominique Ndahimana
