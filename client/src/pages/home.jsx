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
                            <h1>Homepage</h1>
                            <p><Link to={routes.about}>About Us</Link></p>
                        </div>
                    </div>
                </div>
            </main>
        </Client>
    );
}
 
export default Home;
