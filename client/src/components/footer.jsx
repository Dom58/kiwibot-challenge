import React from 'react';

const Footer = () => {
    return (  
        <div className="bg-dark">
            <div className="container pt-4 pb-2">
                <div className="d-flex flex-wrap justify-content-between align-items-center mt-4">
                    <p>
                        <span style={{color: '#cacaca'}}>Copyright © 2020 - {new Date().getFullYear()} All rights reserved.</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
 
export default Footer;
