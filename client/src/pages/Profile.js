import './Profile.css'  // Import CSS styles for the Profile component

import React from 'react'

const Profile = () => {
    return (
        <div className='container-fluid'>  {/* Container for the profile layout */}
            <div className="row">  {/* Row for organizing profile content */}
                <div className="col-2"></div>  {/* Empty column for layout spacing */}

                <div className="col-3"></div>  {/* Empty column for layout spacing */}

                <div className="col-6"> {/* Main profile content */}
                    <h1 className='fw-bold profile_name'>Profile</h1> {/* Profile name heading */}
                    <div className="box"></div> {/* Placeholder box */}
                    <div className="row"> {/* Row for profile details */}
                        <div className="col"> {/* Column for profile image and user info */}
                            <div>
                                <img src="https://images.unsplash.com/photo-1597551681492-10c86e481548?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2VzfGVufDB8fDB8fHww" className="profile_image mb-2" alt="photo" /> {/* Profile image */}
                            </div>
                            <h5 className='fw-bold fs-5'>jayesh Cahwdhary</h5> {/* User name */}
                            <p>@jay</p> {/* User handle */}
                        </div>
                        <div className="col"> {/* Column for follow button */}
                            <button className='follow'>Follow</button> {/* Follow button */}
                        </div>
                    </div>
                    <div> {/* User location and date */}
                        <i className="fa-regular fa-calendar-days"></i> {/* Calendar icon */}
                        <p className='location'> Date Fri Dec 21,2024</p> {/* Date */}

                        <i className=" ms-5 fa-solid fa-location-dot"></i> {/* Location icon */}
                        <p className='location'> LOCATION: India,Mumbai</p> {/* Location */}
                    </div>
                    <div> {/* Additional user information */}
                        <i className="fa-solid fa-film"></i> {/* Icon */}
                        <p className='location'> Jaipur</p> {/* Location */}
                    </div>
                    <div className='d-flex mt-3'> {/* User following and followers count */}
                        <p>3 following</p> {/* Following count */}
                        <p className='ms-5'>1 follower</p> {/* Follower count */}
                    </div>

                    <h6 className='text-center fw-6 mt-5'><strong> Tweets and Replies</strong></h6> {/* Tweets and replies heading */}
                    <hr /> {/* Horizontal line */}
                    <div className="row"> {/* Row for displaying tweets */}
                        <div className="col-1">
                            <img src="https://images.unsplash.com/photo-1597551681492-10c86e481548?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2VzfGVufDB8fDB8fHww" className="card-img-bottom image" alt="photo" /> {/* Tweet image */}
                        </div>
                        <div className="col-10 custom_id_height">
                            <p><span>@jayesh</span><span className='light_text'> .Thu Dec 22 2023 </span></p> {/* Tweet author and date */}
                            <p className='custom_text_height'>How are you doing football fans!!</p> {/* Tweet content */}
                            <div className='custom_icons_height'> {/* Tweet interaction icons */}
                                <i className="fa-regular fa-heart" style={{ color: "#d30909", }}>
                                    <span className='number'>34</span> {/* Like count */}
                                </i>
                                <i className="fa-regular fa-message" style={{ color: "#2556ad", }}>
                                    <span className='number'>15</span> {/* Reply count */}
                                </i>
                                <i className="fa-solid fa-retweet" style={{ color: "#229b12", }}>
                                    <span className='number'>5</span> {/* Retweet count */}
                                </i>
                            </div>
                        </div>
                    </div>
                    <hr /> {/* Horizontal line */}
                    <div className="row"> {/* Second tweet */}
                        <div className="col-1">
                            <img src="https://images.unsplash.com/photo-1597551681492-10c86e481548?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2VzfGVufDB8fDB8fHww" className="card-img-bottom image" alt="photo" /> {/* Tweet image */}
                        </div>
                        <div className="col-10 custom_id_height">
                            <p><span>@jayesh</span><span className='light_text'> .Thu Dec 22 2023 </span></p> {/* Tweet author and date */}
                            <p className='custom_text_height'>How are you doing football fans!!</p> {/* Tweet content */}
                            <div className='custom_icons_height'> {/* Tweet interaction icons */}
                                <i className="fa-regular fa-heart" style={{ color: "#d30909", }}>
                                    <span className='number'>34</span> {/* Like count */}
                                </i>
                                <i className="fa-regular fa-message" style={{ color: "#2556ad", }}>
                                    <span className='number'>15</span> {/* Reply count */}
                                </i>
                                <i className="fa-solid fa-retweet" style={{ color: "#229b12", }}>
                                    <span className='number'>5</span> {/* Retweet count */}
                                </i>
                            </div>
                        </div>
                    </div>
                    <hr /> {/* Horizontal line */}
                </div>

                <div className="col-1"></div>  {/* Empty column for layout spacing */}
            </div>
        </div>
    )
}

export default Profile       // Export the Profile component
