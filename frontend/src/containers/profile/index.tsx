import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
// import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Profile.scss";
import Loader from "../../components/Loader";

const Profile = () => {
    // const { user, loading, isAuthenticated } = useSelector((state) => state?.user);
    let user = {
        avatar: {
            url: ''
        },
        name: "fghj",
        email: "gvdjwqhbi@gmail.com",
        createdAt: "vhjk,."
    };
    let loading = false;
    let isAuthenticated = true

    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
    }, [history, isAuthenticated]);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className="profileContainer">
                        <div>
                            <h1>My Profile</h1>
                            <img src={user.avatar.url} alt={user.name} />
                            <Link to="/me/update">Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{String(user.createdAt).substr(0, 10)}</p>
                            </div>

                            <div>
                                <Link to="/orders">My Orders</Link>
                                <Link to="/password/update">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Profile;
