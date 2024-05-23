import { useState } from 'react';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import axios from 'axios'
import { API_BASE_URL } from '../../src/config'
import Swal from 'sweetalert2'

const Login = () => {

    const [username, setUserName] = useState("");  // State for username input field
    const [password, setPassword] = useState("");  // State for password input field

    const [loading, setLoading] = useState(false); // State for loading spinner

    const dispatch = useDispatch();  // Redux dispatch function
    const navigate = useNavigate();  // React Router navigation function

    // Function to handle login form submission
    const login = (event) => {
        event.preventDefault();  // Prevent default form submission behavior
        setLoading(true);  // Set loading state to true
        const requestData = { username, password };  // Request data object
        axios.post(`${API_BASE_URL}/auth/login`, requestData)  // Send login request
            .then((result) => {
                if (result.status == 200) {  // If login successful
                    setLoading(false);  // Set loading state to false
                    localStorage.setItem("token", result.data.result.token);  // Store token in local storage
                    localStorage.setItem('user', JSON.stringify(result.data.result.user));  // Store user data in local storage
                    dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.result.user });  // Dispatch action to update Redux store
                    setLoading(false);  // Set loading state to false
                    navigate('/home');  // Navigate to home page
                }
            })
            .catch((error) => {  // If login fails
                console.log(error);  // Log the error
                setLoading(false);  // Set loading state to false
                Swal.fire({  // Display error message using Swal
                    icon: 'error',
                    title: error.response.data.error
                })
            })
    }

    return (
        <div className="container-fluid">

            <div className="row align-items-center justify-content-center vh-100 ">
                <div className="col-2"></div>

                <div className="col-8">
                    <div className="custom-card card" style={{ Height: "540px" }}>
                        <div className="row">
                            <div className="col-md-5">
                                <img src="https://images.unsplash.com/photo-1583338917451-face2751d8d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFrZXJ5fGVufDB8fDB8fHww" className="card-img-top card-img-bottom img-fluid custom_image_css" alt="login" />
                            </div>
                            <div className="col-md-7">
                                {loading ? <div className='col-md-12 mt-3 text-center'>
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div> : ''}
                                <form onSubmit={(e) => login(e)}>
                                    <div className="custom-card-body card-body">
                                        <h5 className="card-title fs-3 fw-bold custom_card_heading">Log in</h5>
                                        <div className="mb-3">
                                            <input className="form-control"
                                                value={username}
                                                onChange={(ev) => setUserName(ev.target.value)}
                                                type="text"
                                                placeholder="UserName" />
                                        </div>
                                        <div>
                                            <input className="form-control"
                                                value={password}
                                                onChange={(ev) => setPassword(ev.target.value)}
                                                type="password"
                                                placeholder="Password" />
                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" className="custom-login-button">Login</button>
                                    </div>
                                    <div className="mt-2 ms-3 mb-3">
                                        <span className="custom-text">Don't have an account?</span>
                                        <span><Link to={'/'}> Register now</Link></span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-2"></div>
            </div>
        </div>
    );
}


        // <div className="d-flex align-items-center  
        //                 justify-content-center vh-100"> 
        //     <Card> 
        //         <Card.Body> 
        //             <div style={redBoxStyle}> 
        //                 <h5 className="card-title"> 
        //                     Red Box with Text 
        //                 </h5> 
        //                 <p className="card-text"> 
        //                     This is a red box with some text 
        //                 </p> 
        //             </div> 
        //         </Card.Body> 
        //     </Card> 
        // </div>

export default Login; // Export the Login component