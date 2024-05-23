import React, { useState } from 'react'
import './UserProfile.css' // Import CSS styles for the UserProfile component
import { Button } from 'react-bootstrap'; // Import Button component from react-bootstrap
import Modal from 'react-bootstrap/Modal'; // Import Modal component from react-bootstrap
import Form from 'react-bootstrap/Form'; // Import Form component from react-bootstrap
import { useDispatch } from 'react-redux'; // Import useDispatch hook from react-redux
import axios from 'axios'; // Import Axios for making HTTP requests
import { API_BASE_URL } from '../config'; // Import API base URL from config file
import Alert from 'react-bootstrap/Alert'; // Import Alert component from react-bootstrap
import Swal from 'sweetalert2'; // Import SweetAlert2 for displaying alerts
import { useNavigate, NavLink } from 'react-router-dom'; // Import useNavigate and NavLink from react-router-dom

const UserProfile = () => {
    const [show, setShow] = useState(false); // State for showing/hiding the modal
    const [name, setName] = useState(""); // State for user's name
    const [location, setLocation] = useState(""); // State for user's location
    const [dob, setDOB] = useState(""); // State for user's date of birth

    const handleClose = () => setShow(false); // Function to handle closing the modal
    const handleShow = () => setShow(true); // Function to handle showing the modal

    const [image, setImage] = useState({ preview: '', data: '' }); // State for user's profile image

    // Configuration object for HTTP requests
    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    // Function to handle file selection for profile image
    const handleFileSelect = (event) => {
        const img = {
            preview: URL.createObjectURL(event.target.files[0]),
            data: event.target.files[0]
        }
        setImage(img);
    }

    // Function to handle uploading the profile image
    const handleImgUpload = async () => {
        let formData = new FormData();
        formData.append('file', image.data);

        const response = axios.post(`${API_BASE_URL}/uploadFile`, formData)
        return response;
    }

    // Function to update the profile image
    const updateProfileImage = async () => {
        if (image.preview === '') {
            Swal.fire({
                icon: 'error',
                title: 'Profile image is mandatory'
            })
        } else {
            const imgRes = await handleImgUpload();
            //add validation rule for name, location and dob
            const request = { name: name, location: location, dob: dob, image: `${API_BASE_URL}/$(imgRes.data.filename)` }
            //write api call to update profile details
        }
    }

    // Function to update the profile
    const updateProfile = async () => {
        if (name === '') {
            Swal.fire({
                icon: 'error',
                title: 'Name is mandatory'
            })
        } else if (location === '') {
            Swal.fire({
                icon: 'error',
                title: 'Location is mandatory'
            })
        } else if (dob === '') {
            Swal.fire({
                icon: 'error',
                title: 'DOB is mandatory'
            })
        } else {
            const imgRes = await handleImgUpload();
            //add validation rule for name, location and dob
            const request = { name: name, location: location, dob: dob, image: `${API_BASE_URL}/$(imgRes.data.filename)` }
            //write api call to update profile details
            const postResponse = await axios.post(`${API_BASE_URL}/$(imgRes.data.filename)`);
        }
    }

    const [edit, setEdit] = useState(false); // State for editing the profile

    const handleEditClose = () => setEdit(false); // Function to handle closing the edit modal
    const handleEditShow = () => setEdit(true); // Function to handle showing the edit modal

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-3"></div>
                <div className="col-6">
                    <h1 className='fw-bold profile_name'>Profile</h1>
                    <div className="box"></div>
                    <div className="row">
                        <div className="col">
                            <div>
                                <img src="https://images.unsplash.com/photo-1597551681492-10c86e481548?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2VzfGVufDB8fDB8fHww" className="profile_image mb-2" alt="photo" />
                            </div>
                            <h5 className='fw-bold fs-5'>jayesh Cahwdhary</h5>
                            <p>@jay</p>
                        </div>
                        <div className="col">
                            <button className='upload' type='button' onClick={handleShow}>Upload Profile Photo</button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Upload Profile Pic</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {['primary'].map((variant) => (
                                        <Alert key={variant} variant={variant}>
                                            Note: The image should be square in shape
                                        </Alert>
                                    ))}
                                    <div className='row'>
                                        <div className='col-md-6 col-sm-12 mb-3'>
                                            <div className='upload-box file_upload'>
                                                <div className="dropZoneContainer">
                                                    <input name="file" type="file" id="drop_zone" className="FileUpload choose_file" accept=".jpg,.png,.gif" onChange={handleFileSelect} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropZoneOverlay choose_file">
                                            {image.preview && <img src={image.preview} width='463' height='300' />}
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={() => updateProfileImage()}>
                                        Save Profile Pic
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <button className='edit' type='button' onClick={handleEditShow}>Edit</button>
                            <Modal show={edit} onHide={handleEditClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Profile</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                onChange={(ev) => setName(ev.target.value)}
                                                type="text"
                                                placeholder="name@example.com"
                                                autoFocus
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Location</Form.Label>
                                            <Form.Control
                                                onChange={(ev) => setLocation(ev.target.value)}
                                                type="text"
                                                placeholder="India, Mumbai"
                                                autoFocus
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="dob">
                                            <Form.Label>Date of Birth</Form.Label>
                                            <Form.Control
                                                onChange={(ev) => setDOB(ev.target.value)}
                                                type="date"
                                                name="dob"
                                                placeholder="Date of Birth"
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleEditClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={() => updateProfile()}>
                                        Edit
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                    <div>
                        <i className="fa-regular fa-calendar-days"></i>
                        <p className='location'> Date Fri Dec 21,2024</p>
                        <i className=" ms-5 fa-solid fa-location-dot"></i>
                        <p className='location'> LOCATION: India,Mumbai</p>
                    </div>
                    <div>
                        <i className="fa-solid fa-film"></i>
                        <p className='location'> Jaipur</p>
                    </div>
                    <div className='d-flex mt-3'>
                        <p>3 following</p>
                        <p className='ms-5'>1 follower</p>
                    </div>
                    <h6 className='text-center fw-6 mt-5'><strong> Tweets and Replies</strong></h6>
                    <hr />
                    <div className="row">
                        <div className="col-1">
                            <img src="https://images.unsplash.com/photo-1597551681492-10c86e481548?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2VzfGVufDB8fDB8fHww" className="card-img-bottom image" alt="photo" />
                        </div>
                        <div className="col-10 custom_id_height">
                            <p><span>@jayesh</span><span className='light_text'> .Thu Dec 22 2023 </span></p>
                            <p className='custom_text_height'>How are you doing football fans!!</p>
                            <div className='custom_icons_height'>
                                <i className="fa-regular fa-heart" style={{ color: "#d30909", }}>
                                    <span className='number'>34</span>
                                </i>
                                <i className="fa-regular fa-message" style={{ color: "#2556ad", }}>
                                    <span className='number'>15</span>
                                </i>
                                <i className="fa-solid fa-retweet" style={{ color: "#229b12", }}>
                                    <span className='number'>5</span>
                                </i>
                            </div>
                        </div>
                        <div className="col-1">
                            <i className="fa-regular fa-trash-can" style={{ color: "#000205", }}></i>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-1">
                            <img src="https://images.unsplash.com/photo-1597551681492-10c86e481548?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2VzfGVufDB8fDB8fHww" className="card-img-bottom image" alt="photo" />
                        </div>
                        <div className="col-10 custom_id_height">
                            <p><span>@jayesh</span><span className='light_text'> .Thu Dec 22 2023 </span></p>
                            <p className='custom_text_height'>How are you doing football fans!!</p>
                            <div className='custom_icons_height'>
                                <i className="fa-regular fa-heart" style={{ color: "#d30909", }}>
                                    <span className='number'>34</span>
                                </i>
                                <i className="fa-regular fa-message" style={{ color: "#2556ad", }}>
                                    <span className='number'>15</span>
                                </i>
                                <i className="fa-solid fa-retweet" style={{ color: "#229b12", }}>
                                    <span className='number'>5</span>
                                </i>
                            </div>
                        </div>
                        <div className="col-1">
                            <i className="fa-regular fa-trash-can" style={{ color: "#000205", }}></i>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    )
}

export default UserProfile; // Export the UserProfile component
