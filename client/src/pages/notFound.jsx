import React from 'react';
import { Link } from 'react-router-dom';
import Client from '../layout/client';
import { generatePageTitle } from '../utils/generatePageTitle';

const NotFound = () => {
    generatePageTitle('404-Page Not Found');

    return ( 
        <Client navbar={true}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <h2>404 Not Found</h2>
                        <p>Oops. Something went wrong! <br/> we couldn't find what you are looking for!</p>
                        <Link to="/" className="btn btn-primary">
                            Go Back Home
                        </Link>
                    </div>
                </div>
            </div>
        </Client>
    );
}
 
export default NotFound;
