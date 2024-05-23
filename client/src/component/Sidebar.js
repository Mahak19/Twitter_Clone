import React, { useState } from 'react'
import './Sidebar.css'
import { useNavigate, NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_BASE_URL } from '../../src/config';


const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.userReducer);
    console.log(user);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGIN_ERROR" });
        navigate("/login");
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [image, setImage] = useState({ preview: '', data: '' })
    const [showPost, setShowPost] = useState(false);

    const handlePostClose = () => setShowPost(false);
    const handlePostShow = () => setShowPost(true);

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    const handleFileSelect = (event) => {
        const img = {
            preview: URL.createObjectURL(event.target.files[0]),
            data: event.target.files[0]
        }
        setImage(img);
    }
    const handleImgUpload = async () => {
        let formData = new FormData();
        formData.append('file', image.data);

        const response = axios.post(`${API_BASE_URL}/uploadFile`, formData)
        return response;
    }

    const addPost = async () => {
        const imgRes = await handleImgUpload();
    }
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2"></div>

                    <div className="col-3 sidebar_font">
                        <i className="fa-solid fa-eye fa-xl ms-3" style={{ color: "#6297f4", }}></i>
                        <div className="sidebar">
                            <a href="#home"><i className="fa fa-fw fa-home"></i> Home</a>
                            <NavLink to={"/myprofile"}><i className="fa-solid fa-user"></i> Profile</NavLink>
                            <a href="#" onClick={() => logout()}><i className="fa-solid fa-right-from-bracket"></i> Logout</a>
                        </div>
                        <div className="col">
                            <a href="#" className='d-flex textmain'>
                                <img src="https://images.unsplash.com/photo-1597551681492-10c86e481548?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2VzfGVufDB8fDB8fHww" className="profile_image_left_bottom" alt="photo" />
                                <h6 className='text'>Jayesh Chowh</h6>
                            </a>
                        </div>
                    </div>

                    <div className="col-6 custom_css_for_main_card">

                        <div className="row">
                            <div className="col-6">
                                <p>Home</p>
                            </div>
                            <div className="col-6">
                                <button type="button" onClick={handleShow} className="custom-submit-btn">Tweet</button>

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>New Tweet</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Control
                                            as="textarea"
                                            className='dropZoneOverlay'
                                            placeholder="Write your tweet"
                                            style={{ height: '100px' }}
                                        >
                                        </Form.Control>
                                    </Modal.Body>
                                    <a href=""><i className="fa-regular fa-image mb-2 ms-3 icon_color">
                                        <div className="dropZoneContainer">
                                            <input name="file" type="file" id="drop_zone" className="FileUpload" accept=".jpg,.png,.gif" onChange={handleFileSelect} />
                                        </div>
                                        <div className="dropZoneOverlay">
                                            {image.preview && <img src={image.preview} width='200' height='200' />}
                                        </div></i></a>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={handleClose}>
                                            Tweet
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                        <div className="card">
                            <div className="row">
                                <h6 className='retweet_row'>
                                    <i className="fa-solid fa-retweet light_text custom_id_height">
                                        <span>  Retweeted by ronaldo</span>
                                    </i>
                                </h6>
                                <div className="col-1">
                                    <img src="https://images.unsplash.com/photo-1597551681492-10c86e481548?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2VzfGVufDB8fDB8fHww" className="card-img-bottom image" alt="photo" />
                                </div>
                                <div className="col-10 custom_id_height">
                                    <p><span>@jayesh</span><span className='light_text'> .Thu Dec 22 2023 </span></p>
                                    <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <img src="https://images.unsplash.com/photo-1597551681492-10c86e481548?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2VzfGVufDB8fDB8fHww" className="card-img-bottom picture" alt="photo" />
                                    <div className='main_icons'>
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
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item ">
                                    <div className="row">
                                        <h6 className='retweet_row'>
                                            <i className="fa-solid fa-retweet light_text custom_id_height">
                                                <span>  Retweeted by ronaldo</span>
                                            </i>
                                        </h6>
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
                                </li>
                                <li className="list-group-item ">
                                    <div className="row">
                                        <h6 className='retweet_row'>
                                            <i className="fa-solid fa-retweet light_text custom_id_height">
                                                <span>  Retweeted by ronaldo</span>
                                            </i>
                                        </h6>
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
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div className=" col-1">
                        <button className="custom-btn custom-btn-white" onClick={handlePostShow}>
                            <span className='fs-6'>Upload Post</span>
                        </button>
                        <Modal show={showPost} onHide={handlePostClose} size="lg" centered>
                            <Modal.Header closeButton>
                                <span className='fw-bold fs-5'>Upload Post</span>
                            </Modal.Header>
                            <Modal.Body>
                                <div className='row'>
                                    <div className='col-md-6 col-sm-12 mb-3'>
                                        <div className='upload-box'>
                                            <div className="dropZoneContainer">
                                                <input name="file" type="file" id="drop_zone" className="FileUpload" accept=".jpg,.png,.gif" onChange={handleFileSelect} />
                                                <div className="dropZoneOverlay">
                                                    {image.preview && <img src={image.preview} width='200' height='200' />}
                                                    <i class="fa-solid fa-cloud-arrow-up fs-1"></i><br />Upload Photo From Computer</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Modal.Body>
                        </Modal>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
