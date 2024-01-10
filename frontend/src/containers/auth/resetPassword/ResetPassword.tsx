import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.scss";
import { useAlert } from "react-alert";
import { useAppDispatch } from "../../../redux/hooks";
import Loader from "../../../components/Loader";
import TextField from "../../../components/Inputs";
import CustomButton from "../../../components/button";


const ResetPassword = () => {
    const dispatch = useAppDispatch();
    const alert = useAlert();


    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const loading = false;

    const resetPasswordSubmit = (e: any) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        // dispatch(resetPassword(match.params.token, myForm));
    };

    // useEffect(() => {
    //     if (error) {
    //         alert.error(error);
    //         dispatch(clearErrors());
    //     }

    //     if (success) {
    //         alert.success("Password Updated Successfully");

    //         history.push("/login");
    //     }
    // }, [dispatch, error, alert, history, success]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className="resetPasswordContainer">
                        <div className="resetPasswordBox">
                            <h2 className="resetPasswordHeading">Reset Password</h2>

                            <form
                                className="resetPasswordForm"
                                onSubmit={resetPasswordSubmit}
                            >
                                <div>
                                    <TextField
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        label=''
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <TextField
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        label=''
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <CustomButton
                                    type="button"
                                    className="resetPasswordBtn"
                                >Reset Password</CustomButton>
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default ResetPassword;
