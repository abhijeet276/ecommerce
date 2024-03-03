import React, { Fragment, useState } from "react";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "../cart/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import TextField from "../Inputs";
import { saveShippingInfo } from "../../redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import "./Shipping.scss";

const Shipping = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    let { shippingInfo } = useAppSelector((state: any) => state.cart)
    // const { shippingInfo } = useSelector((state: any) => state.cart);

    console.log(shippingInfo, "shippingInfoshippingInfo")

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    // const [address, setAddress] = useState('');
    // const [city, setCity] = useState('');
    // const [state, setState] = useState('');
    // const [country, setCountry] = useState('');
    // const [pinCode, setPinCode] = useState('');
    // const [phoneNo, setPhoneNo] = useState('');

    const shippingSubmit = (e: any) => {
        e.preventDefault();
        if (phoneNo.length < 10 || phoneNo.length > 10) {
            alert.error("Phone Number should be 10 digits Long");
            return;
        }
        dispatch(
            saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
        );
        navigate("/order/confirm");
    };

    return (
        <Fragment>
            <CheckoutSteps activeStep={0} />

            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>
                    <form
                        className="shippingForm"
                        encType="multipart/form-data"
                        onSubmit={shippingSubmit}
                    >
                        <div>
                            <TextField
                                type="text"
                                placeholder="Address"
                                label=""
                                value={address}
                                className="textField"
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <TextField
                                type="text"
                                placeholder="City"
                                required
                                label=""
                                value={city}
                                className="textField"
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div>
                            <TextField
                                type="number"
                                placeholder="Pin Code"
                                required
                                value={pinCode}
                                label=""
                                className="textField"
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </div>

                        <div>
                            <TextField
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNo}
                                label=""
                                className="textField"
                                onChange={(e) => setPhoneNo(e.target.value)}
                                size={10}
                            />
                        </div>

                        <div className="countryField">
                            <select
                                required
                                value={country}
                                className="selectCountry"
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {country && (
                            <div className="countryField">
                                <select
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}

                        <input
                            type="submit"
                            value="Continue"
                            required
                            className="shippingBtn"
                            disabled={state ? false : true}
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Shipping;