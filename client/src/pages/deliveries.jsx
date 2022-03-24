import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';
import { generatePageTitle } from '../utils/generatePageTitle';
import Client from '../layout/client';
import backendAPI from '../constants';

const fetchDeliveriesData = async () => {
    return await axios.get(`${backendAPI}/deliveries`);
}

const Delivery = () => {
    generatePageTitle('Deliveries');
    const [data, setData ] = useState([]);
    const [error, setError ] = useState('');
    const [validated, setValidated] = useState(false);
    const [credentialsValid, setCredentialsValid] = useState(true);
    const [loading, setLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deliveryId, setDeliveryId] = useState('');
    const [sortingOrder, setSortingOrder] = useState('desc');

    const [delivery, setDelivery] = useState({ 
        zone_id: '', 
        state: '',
        creation_date: new Date(),
        pickup_lat: 0.0,
        pickup_lon: 0.0,
        dropoff_lat: 0.0,
        dropoff_lon: 0.0
    });
    
    const handleChange = e => {
        const { name, value } = e.target;
        setCredentialsValid(true);
        setDelivery(delivery => ({ ...delivery, [name]: value }));
    };

    const submitData = {
        ...delivery,
        pickup: {
            pickup_lat: delivery.pickup_lat,
            pickup_lon: delivery.pickup_lon
        },
        dropoff: {
            dropoff_lat: delivery.dropoff_lat,
		    dropoff_lon: delivery.dropoff_lon
        },
    }

    const handleSubmit = e => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        e.preventDefault();
        setValidated(true);
        setLoading(true);

        if(submitData.zone_id === '' || submitData.state === '' ){
            toast.error('Delivery state and Zone ID are required!');
            setLoading(false);
        } else {
            axios
            .post(`${backendAPI}/deliveries/create`, submitData)
            .then(res => {
                setLoading(false);
                toast.success(res.data.message);
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
            })
            .catch(err => {
                setLoading(false);
                if(err.response.data) {
                    setError(err.response.data.error);
                } else {
                    console.log('=====error===', err.response);
                }
            });
        }
    };

    const toggleDelete = (id) => {
        setDeleteModal(!deleteModal);
        setDeliveryId(id);
    };

	const closeDelete = () => {
		setDeleteModal(false);
	};

    const deleteADelivery= () => {
		axios
		.delete(`${backendAPI}/deliveries/delete/${deliveryId}`)
		.then(res => {
			toast.success(res.data.message);
            setTimeout(function () {
                window.location.reload();
            }, 1000);
		})
		.catch(error => {
			console.log(error);
            toast.error(error.response.data.error)
		});
		setDeleteModal(false);
	};

    const handleDataSorting = (order) => {
        const sortedData = data&&data.sort((a, b) => order === 'desc' ? (new Date(b.creation_date) - new Date(a.creation_date)) :  (new Date(a.creation_date) - new Date(b.creation_date)));
        setData(sortedData);
        setSortingOrder(order);
    }

    useEffect(() => {
        if(data.length === 0) {
            fetchDeliveriesData().then((res) => {
            setData(res.data.data)});
        }
    }, [data])

    return ( 
        <Client navbar={true}>
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <h5 className="font-weight-bold mt-5">List of Deliveries</h5>
                            <hr />
                            <h2>Sort {' '}
                               {
                                sortingOrder === 'desc' ? (<Button className='btn-primary' onClick={()=> handleDataSorting('asc')}> <i className="fa fa-sort-numeric-asc"></i> </Button>): 
                                ( <Button className='btn-info'  onClick={()=> handleDataSorting('desc')}> <i className="fa fa-sort-numeric-desc"></i> </Button>)
                               } 
                               
                            </h2>
                            <div className="table-responsive mt-3" id="tableContainer">
                                <table className="table" id="tableItems">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            {/* <th scope="col">Res. Identity</th> */}
                                            <th scope="col">Id</th>
                                            <th scope="col">Creation Date</th>
                                            <th scope="col">State</th>
                                            <th scope="col">Pickup</th>
                                            <th scope="col">Drop Off</th>
                                            <th scope="col">Zone Id</th>
                                            {/* <th scope="col">Created By</th>
                                            <th scope="col">Created At</th> */}
                                            <th scope="col">Options</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {data&&data.map((delivery, index) => (
                                            <tr key={index+1}>
                                                <th scope="row">{index+1}</th>
                                                <td>{delivery.id}</td>
                                                <td>{moment(delivery.creation_date).format('DD/MM/YYYY')}</td>
                                                <td>{delivery.state}</td>
                                                <td>
                                                    {delivery.pickup.pickup_lat}(Lat) <br />
                                                    {delivery.pickup.pickup_lon}(Lon)
                                                </td>
                                                <td>
                                                    {delivery.dropoff.dropoff_lat ? delivery.dropoff.dropoff_lat: 0}(Lat) <br />
                                                    {delivery.dropoff.dropoff_lon ? delivery.dropoff.dropoff_lon: 0}(Lon)
                                                </td>
                                                <td>{delivery.zone_id}</td>
                                                <td>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-danger" 
                                                        style={{padding: '1px 5px', fontSize: '12px', lineHeight: 1.5, borderRadius: '3px'}}
                                                        onClick={() => toggleDelete(delivery.id)}
                                                    >
                                                        Delete
                                                    </button>  
                                                </td>

                                                {deleteModal && (
                                                    <Modal show={deleteModal} onHide={() => closeDelete()} className="mt-5" key={delivery.id}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title id='contained-modal-title-vcenter'>
                                                                Are you sure you want to detete this Delivery?
                                                            </Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Footer>
                                                            <Button
                                                                className='btn btn-sm'
                                                                style={{ backgroundColor: '#c3c3c3', border: 'none' }}
                                                                onClick={() => closeDelete()}
                                                            >
                                                                No
                                                            </Button>{' '}
                                                            <Button
                                                                className='btn btn-primary btn-sm'
                                                                onClick={() => deleteADelivery()}
                                                            >
                                                                Yes
                                                            </Button>{' '}
                                                        </Modal.Footer>
                                                    </Modal>
                                                )}
                                            </tr>
                                        ))}
                                        {error&&(
                                            <tr>
                                                <td colSpan={8}><span style={{color: 'brown'}}>{error&&error}</span></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="col-md-4" style={{backgroundColor: '#f0ecec'}}>
                            <h2 className="font-weight-bold mb-1 mt-3 text-center">CREATE A DELIVERY</h2>
                            <div className="d-flex flex-column justify-content-center text-bold p-3">
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Group className="my-3 text-left">
                                        <label htmlFor="">Zone ID:</label>
                                        <Form.Control className={!credentialsValid&&'border border-danger'} type="text" name="zone_id" value={delivery.zone_id} required={true} placeholder={`Enter zone id...`} onChange={handleChange} />
                                        <Form.Control.Feedback type="invalid">Zone Id is required</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="my-3 text-left">
                                        <label htmlFor="">Creation Date:</label>
                                        <Form.Control className={!credentialsValid&&'border border-danger'} type="date" name="creation_date" value={delivery.creation_date} required={true} placeholder={`Enter Creation date...`} onChange={handleChange} />
                                        <Form.Control.Feedback type="invalid">Creation Date is required</Form.Control.Feedback>
                                    </Form.Group>

                                    <label> State: </label>
                                    <select name="state" className='form-control' value={delivery.state} onChange={handleChange} required={true}>
                                        <option value="">Select state...</option>
                                        <option value="pending">Pending</option>
                                        <option value="assigned">Assigned</option>
                                        <option value="in_transit">In Transit</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                    <Form.Control.Feedback type="invalid">State is required</Form.Control.Feedback>
                                    <br />
                                    <h5>Pickup</h5>
                                    <div className="panel panel-default">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <Form.Group className="my-3 text-left">
                                                    <label htmlFor="">Latitude:</label>
                                                    <Form.Control type="number" name="pickup_lat" value={delivery.pickup_lat} className="form-control" required={true} placeholder={`Enter Latitude...`} onChange={handleChange} />
                                                    <Form.Control.Feedback type="invalid">Latitude is required</Form.Control.Feedback>
                                                </Form.Group>
                                            </div>
                                            <div className="col-lg-6">
                                                <Form.Group className="my-3 text-left">
                                                    <label htmlFor="">Longitude:</label>
                                                    <Form.Control type="number" name="pickup_lon" value={delivery.pickup_lon} className="form-control" placeholder={`Enter Longitude...`} onChange={handleChange} />
                                                    <Form.Control.Feedback type="invalid">Longitude is required</Form.Control.Feedback>
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </div>

                                    <hr />
                                    <h5>Drop Off</h5>
                                    <div className="panel panel-default">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <Form.Group className="my-3 text-left">
                                                    <label htmlFor="">Latitude:</label>
                                                    <Form.Control type="number" name="dropoff_lat" value={delivery.dropoff_lat} className="form-control" required={true} placeholder={`Enter Latitude...`} onChange={handleChange} />
                                                    <Form.Control.Feedback type="invalid">Latitude is required</Form.Control.Feedback>
                                                </Form.Group>
                                            </div>
                                            <div className="col-lg-6">
                                                <Form.Group className="my-3 text-left">
                                                    <label htmlFor="">Longitude:</label>
                                                    <Form.Control type="number" name="dropoff_lon" value={delivery.dropoff_lon} className="form-control" placeholder={`Enter Log=ngitude...`} onChange={handleChange} />
                                                    <Form.Control.Feedback type="invalid">Longitude is required</Form.Control.Feedback>
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </div>
                                    

                                    <Form.Group className="mt-4 py-2">
                                        <Button type="submit" variant="primary" className="btn-lg btn-block" style={{ width: '100%' }}>
                                        { loading ?'CREATING...' : 'CREATE' }
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Client>
    );
}
 
export default Delivery;
