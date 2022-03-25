import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { generatePageTitle } from '../utils/generatePageTitle';
import Client from '../layout/client';
import backendAPI from '../constants';

const Bots = () => {
    generatePageTitle('Bots');
    const [data, setData ] = useState([]);
    const [error, setError ] = useState('');
    const [validated, setValidated] = useState(false);
    const [credentialsValid, setCredentialsValid] = useState(true);
    const [loading, setLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [botId, setBotId] = useState('');

    const [bot, setBot] = useState({
        zone_id: '', 
        status: '',
        dropoff_lat: 0.0, // E.g: latitude: '-1.9507305'
		dropoff_lon: 0.0 //E.g: longitude: '30.1212607'
    });
    
    const handleChange = e => {
        const { name, value } = e.target;
        setCredentialsValid(true)
        setBot(bot => ({ ...bot, [name]: value }));
    };

    const submitData = {
        ...bot,
        location: {
            dropoff_lat: bot.dropoff_lat,
		    dropoff_lon: bot.dropoff_lon
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

        if(submitData.zone_id === ''){
            toast.error(' Zone ID is required!');
            setLoading(false);
        } else {
            axios
            .post(`${backendAPI}/bots/create`, submitData)
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

    const fetchBotsData = async () => {
        axios
		.get(`${backendAPI}/bots`)
		.then(res => {
			setData(res.data.data);
		})
		.catch(err => {
            if(err.response.data) {
                setError(err.response.data.error);
            } else {
			    console.log('=====error===', err.response);
            }
		});
    }

    const toggleDelete = (id) => {
        setDeleteModal(!deleteModal);
        setBotId(id);
    };

	const closeDelete = () => {
		setDeleteModal(false);
	};

    const deleteABot = () => {
		axios
		.delete(`${backendAPI}/bots/delete/${botId}`)
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

    useEffect(() => {
        fetchBotsData();
    }, [])

    return ( 
        <Client navbar={true}>
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <h5 className="font-weight-bold mt-5">List of Bots</h5>
                            <hr />
                            <div className="table-responsive mt-3" id="tableContainer">
                                <table className="table" id="tableItems">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            {/* <th scope="col">Id</th> */}
                                            <th scope="col">status</th>
                                            <th scope="col">Location</th>
                                            <th scope="col">Zone Id</th>
                                            <th scope="col">Options</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {data&&data.map((bot, index) => (
                                            <tr key={index+1}>
                                                <th scope="row">{index+1}</th>
                                                {/* <td>{bot.id}</td> */}
                                                <td>{bot.status}</td>
                                                <td>
                                                    {bot.location.dropoff_lat}(Lat) <br />
                                                    {bot.location.dropoff_lon}(Lon)
                                                </td>
                                                <td>{bot.zone_id}</td>
                                                <td>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-danger" 
                                                        style={{padding: '1px 5px', fontSize: '12px', lineHeight: 1.5, borderRadius: '3px'}}
                                                        onClick={() => toggleDelete(bot.id)}
                                                    >
                                                        Delete
                                                    </button>  
                                                </td>

                                                {deleteModal && (
                                                    <Modal show={deleteModal} onHide={() => closeDelete()} className="mt-5" key={bot.id}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title id='contained-modal-title-vcenter'>
                                                                Are you sure you want to detete this Bot?
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
                                                                onClick={() => deleteABot()}
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
                                                <td colSpan={6}><span style={{color: 'brown'}}>{error&&error}</span></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="col-md-5" style={{backgroundColor: '#f0ecec'}}>
                            <h2 className="font-weight-bold mt-3 text-center">CREATE A BOT</h2>
                            <div className="d-flex flex-column justify-content-center text-bold p-3">
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Group className="my-3 text-left">
                                        <label htmlFor="">Zone Id:</label>
                                        <Form.Control className={!credentialsValid&&'border border-danger'} type="text" name="zone_id" value={bot.zone_id} required={true} placeholder={`Enter zone id...`} onChange={handleChange} />
                                        <Form.Control.Feedback type="invalid">Zone Id is required</Form.Control.Feedback>
                                    </Form.Group>

                                    <label> Status: </label>
                                    <select name="status" className='form-control' value={bot.status} onChange={handleChange} required={true}>
                                        <option value="">Select status...</option>
                                        <option value="available">Available</option>
                                        <option value="busy">Busy</option>
                                        <option value="Reserved">Reserved</option>
                                    </select>
                                    <Form.Control.Feedback type="invalid">Status is required</Form.Control.Feedback>
                                    <br />
                                    <h3>Location</h3>
                                    <div className="panel panel-default">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <Form.Group className="my-3 text-left">
                                                    <label htmlFor="">Latitude:</label>
                                                    <Form.Control type="number" name="dropoff_lat" value={bot.dropoff_lat} className="form-control" required={true} placeholder={`Enter Latitude...`} onChange={handleChange} />
                                                    <Form.Control.Feedback type="invalid">Latitude is required</Form.Control.Feedback>
                                                </Form.Group>
                                            </div>
                                            <div className="col-lg-6">
                                                <Form.Group className="my-3 text-left">
                                                    <label htmlFor="">Longitude:</label>
                                                    <Form.Control type="number" name="dropoff_lon" value={bot.dropoff_lon} className="form-control" placeholder={`Enter Longitude...`} onChange={handleChange} />
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
 
export default Bots;
