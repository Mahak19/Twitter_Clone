import React, { useState } from 'react'
import './Login.css'  // Import CSS styles for the Login component
import { Link } from "react-router-dom";  // Import Link component for routing
import axios from 'axios'  // Import Axios for making HTTP requests
import { API_BASE_URL } from '../../src/config'  // Import API base URL from config file
import Swal from 'sweetalert2'  // Import SweetAlert2 for displaying alerts
import { toast } from 'react-toastify'  // Import Toastify for displaying notifications

function Register() {

    const [name, setName] = useState("");  // State for user's full name
    const [email, setEmail] = useState("");  // State for user's email
    const [username, setUserName] = useState("");  // State for user's username
    const [password, setPassword] = useState("");  // State for user's password

    const [loading, setLoading] = useState(false);  // State for loading status

    const reg = (event) => {  // Function to handle registration
        event.preventDefault();  // Prevent default form submission behavior

        setLoading(true);  // Set loading state to true
        const requestData = { name, email, username, password };  // Prepare registration data
        axios.post(`${API_BASE_URL}/auth/register`, requestData)  // Send POST request to register endpoint
            .then((result) => {  // Handle successful response
                if (result.status == 201) {  // If registration successful
                    setLoading(false);  // Set loading state to false
                    Swal.fire({  // Show success alert
                        icon: 'success',
                        title: 'User successfully registered'
                    });
                }
                setName('');  // Reset name field
                setEmail('');  // Reset email field
                setUserName('');  // Reset username field
                setPassword('');  // Reset password field
            })
            .catch((error) => {  // Handle error response
                console.log(error);  // Log error to the console
                setLoading(false);  // Set loading state to false
                Swal.fire({  // Show error alert
                    icon: 'error',
                    title: 'Some error occurred please try again later!'
                });
            });
    }

    return (
        <div className="container-fluid">
            <div className="row align-items-center justify-content-center vh-100">
                <div className="col-2"></div>
                <div className="col-8">
                    <form onSubmit={(e) => reg(e)}>
                        <div className="custom-card card mb-3" style={{ Height: "540px" }}>
                            {loading ? <div className='col-md-12 mt-3 text-center'>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> : ''}
                            <div className="row">
                                <div className="col-md-5">
                                    <img src="https://media.istockphoto.com/id/497347644/photo/hand-pressing-register-now.webp?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2VzfGVufDB8fDB8fHww" className="card-img-top card-img-bottom img-fluid custom_imager_css" alt="register" />
                                </div>
                                <div className="col-md-7">
                                    <div className="custom-card-body card-body">
                                        <h5 className="card-title fs-3 fw-bold">Register</h5>
                                        <div className="mb-3">
                                            <input
                                                className="form-control"
                                                type="text"
                                                value={name}
                                                onChange={(ev) => setName(ev.target.value)}
                                                placeholder="Full Name" />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                className="form-control"
                                                type="email"
                                                value={email}
                                                onChange={(ev) => setEmail(ev.target.value)}
                                                placeholder="Email" />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                className="form-control"
                                                type="text"
                                                value={username}
                                                onChange={(ev) => setUserName(ev.target.value)}
                                                placeholder="UserName" />
                                        </div>
                                        <div className="">
                                            <input
                                                className="form-control"
                                                type="password"
                                                value={password}
                                                onChange={(ev) => setPassword(ev.target.value)}
                                                placeholder="Password" />
                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" className="custom-login-button">Register</button>
                                    </div>
                                    <div className="mt-2 ms-3 mb-3">
                                        <span className="custom-text">Already registered? <span><Link to={'/login'}>Login here</Link></span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    );
}

export default Register;  // Export the Register component
