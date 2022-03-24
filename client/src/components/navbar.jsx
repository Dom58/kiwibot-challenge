import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../config/names';
import './index.css';

const Navbar = ({ navbar }) => {
    const [scrool, setScrool] = useState(navbar);

    const changeBackground = () => {
        if(window.scrollY >= 50) return setScrool(true);

        return setScrool(false);
    }

    !navbar && window.addEventListener('scroll', changeBackground);

    return (  
        <nav className={`navbar navbar-expand-lg sticky-top mb-3 ${scrool ? `scrool` : ``}`}>
            <div className="container">
                <a className="navbar-brand" href="/">
                    <img src='https://global-uploads.webflow.com/5ddc307f68536f623db8c772/60b93129188d32f49610b1a1_Kiwibot%20for%20business.svg' className="img-fluid" alt='Logo'/>
                </a>
                <button className="btn" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">
                        <i className={`fa fa-bars fa-2x ${scrool ? `text-black-50` : `text-white`} border px-1 rounded d-lg-none`} />
                    </span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className='nav-link' to={routes.home}><small>HOME</small></Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className='nav-link' to={routes.about}><small>ABOUT US</small></Link>
                        </li>

                        <li className="nav-item">
                            <Link className='nav-link' to={routes.bots}><small>Bots</small></Link>
                        </li>

                        <li className="nav-item">
                            <Link className='nav-link' to={routes.deliveries}><small>Deliveries</small></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
 
export default Navbar;
