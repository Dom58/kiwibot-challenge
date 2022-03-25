import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import axios from 'axios';
import routes from '../../config/names';
import Client from '../../layout/client';
import { generatePageTitle } from '../../utils/generatePageTitle';
import backendAPI from '../../constants';

const GetDelivery = () => {
    const url = window.location.toString();
    let slugData = new URL(url).pathname.match(/[^\/]+/g);
    generatePageTitle(slugData&&slugData[1]);

    const [data, setData ] = useState({});

    const fetchDeliveryData = async () => {
        return await axios.get(`${backendAPI}/deliveries/${slugData&&slugData[1]}`);
    }

    useEffect(() => {
        fetchDeliveryData().then((res) => {
            setData(res.data.data)
        });
    }, []);

    return (  
        <Client navbar={true}>
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Breadcrumb>
                                <Breadcrumb.Item className='text-primary'>
                                    <Link to={routes.deliveries}>Deliveries</Link>
                                </Breadcrumb.Item>
                                
                                <Breadcrumb.Item active>{ slugData&&slugData[1] }</Breadcrumb.Item>
                            </Breadcrumb>
                            <h1>Delivery</h1>
                            <hr />
                            <div className="panel panel-default mb-5">
                                <div className="panel-body">
                                    <p>Delivery ID: { slugData&&slugData[1] }</p>
                                    <p>Zone ID: {data&&data.zone_id }</p>
                                    <p>Creation Date ID: {data&&data.creation_date }</p>
                                    <p>State: {data&&data.state }</p>

                                    <h5>Pickup</h5>
                                    <p>Latitude: {data&&data.pickup ? data.pickup.pickup_lat: '-' }</p>
                                    <p>Longitude: {data&&data.pickup ? data.pickup.pickup_lon : '-' }</p>

                                    <h5>Drop Off</h5>
                                    <p>Latitude: {data&&data.dropoff ? data.dropoff.dropoff_lat : '-' }</p>
                                    <p>Longitude: {data&&data.dropoff ? data.dropoff.dropoff_lon: '-' }</p>
                                </div>
                            </div>
                            <p><Link to={routes.home}>Return to Homepage</Link></p>
                        </div>
                    </div>
                </div>
            </main>
        </Client>
    );
}
 
export default GetDelivery;
