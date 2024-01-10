import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.scss";
import { useAlert } from "react-alert";
import { useAppDispatch } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import CustomButton from "../../../components/button";
import TextField from "../../../components/Inputs";

const UpdatePassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const loading = false;

    const updatePasswordSubmit = (e: any) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        // dispatch(updatePassword(myForm));
    };

    //   useEffect(() => {
    //     if (error) {
    //       alert.error(error);
    //       dispatch(clearErrors());
    //     }

    //     if (isUpdated) {
    //       alert.success("Profile Updated Successfully");

    //       history.push("/account");

    //       dispatch({
    //         type: UPDATE_PASSWORD_RESET,
    //       });
    //     }
    //   }, [dispatch, error, alert, history, isUpdated]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className="updatePasswordHeading">Update Password</h2>

                            <form
                                className="updatePasswordForm"
                                onSubmit={updatePasswordSubmit}
                            >
                                <div className="loginPassword">
                                    <TextField
                                        type="password"
                                        placeholder="Old Password"
                                        required
                                        label=""
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>

                                <div className="loginPassword">
                                    <TextField
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        label=""
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <TextField
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        label=""
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <CustomButton
                                    type="button"
                                    className="updatePasswordBtn"
                                >Update Password</CustomButton>
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default UpdatePassword;
