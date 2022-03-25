import React from 'react';
import { Link } from 'react-router-dom';
import { generatePageTitle } from '../utils/generatePageTitle';
import routes from '../config/names';
import Client from '../layout/client';

const Home = () => {
    generatePageTitle('HomePage');

    return ( 
        <Client navbar={true}>
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>How to test this app ~Readme</h1>
                            <h5>Kiwibot Technical Test</h5>

                            <h1>## Prerequisites</h1>
                            * Node <br />
                            * Postman <br />
                            * Firebase account <br />
                            * Github account

                            <h1>## Technology used</h1>

                            <h2>### Frontend</h2>
                            * ReactJs <br />
                            * JavaScript <br />
                            * HTML <br />
                            * CSS <br />
                            * Bootstrap <br />
                            * Firebase

                            <h2>### Backend</h2>
                            * Node <br />
                            * Express <br />
                            * Firebase 

                            <h1>## Setup</h1> 

                            <h2>### 1. Backend</h2>
                            1. Clone the repository
                                ```https://github.com/Dom58/kiwibot-challenge.git``` <br />
                                
                            2. on root folder <br />
                            
                                Run ``` yarn install```or  ```npm run yarn install``` <br />

                            3. Install dependencies <br />
                            
                                ```yarn install``` <br />
                                
                            4. Start the server of development <br />
                            
                                ```yarn run dev``` <br />

                                5. Start the server of production <br />
                            
                                ```yarn start``` <br />
                            
                                6. Open postman to test Kiwibot challenge APIs ```localhost:5001/api/v1``` <br />

                                * For more information read well `.env.example` to add the environment variables for the backend

                            <h2>### 2. Frontend</h2>
                            1. Clone the repository <br />
                                ```https://github.com/Dom58/kiwibot-challenge.git```  <br />
                                
                            2. Access the client directory <br />
                                ```cd client``` <br />

                            3. Install dependencies <br />
                            
                                ```npm install``` or ```yarn install``` <br />
                                
                            4. Start the application <br />
                            
                                ```npm run start``` or ```yarn start``` <br />
                            
                            * For more information read well `.env.example` to add the environment variables for the frontend
                            * Wait the browser to be openned its-self

                            <h1>## Hosted application on Firebase</h1>
                            <a href='https://technical-test-apis.web.app'>https://technical-test-apis.web.app</a>

                            <h1>## Author</h1>
                            Dominique Ndahimana

                        </div>
                    </div>
                </div>
            </main>
        </Client>
    );
}
 
export default Home;
