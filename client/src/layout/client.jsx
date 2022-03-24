import React, { useEffect } from 'react';
import Navbar from '../components/navbar';
// import Footer from '../components/footer';

const Client = ({children, navbar = false }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (  
        <>
            <Navbar navbar={navbar} />
                {children}
            {/* <Footer /> */}
        </>
    );
}
 
export default Client;
