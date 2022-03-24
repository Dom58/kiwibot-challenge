import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../config/names';
import Client from '../layout/client';
import { generatePageTitle } from '../utils/generatePageTitle';

const About = () => {
    generatePageTitle('About us');

    return (  
        <Client navbar={true}>
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>About Us</h1>
                            <p><Link to={routes.home}>Return to Homepage</Link></p>
                        </div>
                    </div>
                </div>
            </main>
        </Client>
    );
}
 
export default About;
