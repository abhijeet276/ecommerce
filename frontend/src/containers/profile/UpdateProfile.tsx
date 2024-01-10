import "./UpdateProfile.scss";
import Loader from "../../components/Loader";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import TextField from "../../components/Inputs";
import CustomButton from "../../components/button";

const UpdateProfile: React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const [avatarPreview, setAvatarPreview] = useState<any>('https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState<any>('');
    const loading = false;

    const updateProfileSubmit = (e: any) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        // dispatch(updateProfile(myForm));
    };

    const updateProfileDataChange = (e: any) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    // useEffect(() => {
    //     if (user) {
    //         setName(user.name);
    //         setEmail(user.email);
    //         setAvatarPreview(user.avatar.url);
    //     }

    //     if (error) {
    //         alert.error(error);
    //         dispatch(clearErrors());
    //     }

    //     if (isUpdated) {
    //         alert.success("Profile Updated Successfully");
    //         dispatch(loadUser());

    //         history.push("/account");

    //         dispatch({
    //             type: UPDATE_PROFILE_RESET,
    //         });
    //     }
    // }, [dispatch, error, alert, history, user, isUpdated]);
    return (
        <div className="updateProfileContainer">
            <div className="updateProfileBox">
                <h2 className="updateProfileHeading">Update Profile</h2>
                <form
                    className="updateProfileForm"
                    encType="multipart/form-data"
                    onSubmit={updateProfileSubmit}
                >
                    <div className="updateProfileName">
                        <TextField
                            type="text"
                            label="Name"
                            placeholder="Name"
                            required
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="updateProfileEmail">
                        <TextField
                            type="email"
                            label="Email"
                            placeholder="Email"
                            required
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div id="updateProfileImage">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={updateProfileDataChange}
                        />
                    </div>
                    <CustomButton type="button" className="updateProfileBtn">Update</CustomButton>
                    {/* <input
                        type="submit"
                        value="Update"
                        className="updateProfileBtn"
                    /> */}
                </form>
            </div>
            {loading && <Loader />}
        </div>
    );
};

export default UpdateProfile;
