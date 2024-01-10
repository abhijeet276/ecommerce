import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./CheckoutSteps.scss";
import { StepButton, StepIconProps } from "@mui/material";

interface ICheckout {
    activeStep: number;
}

const CheckoutSteps: React.FC<ICheckout> = ({ activeStep = 0 }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: LocalShippingIcon,
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: LibraryAddCheckIcon,
        },
        {
            label: <Typography>Payment</Typography>,
            icon: AccountBalanceIcon,
        },
    ];

    const stepStyles = {
        boxSizing: "border-box",
    };
    function ColorlibStepIcon(props: StepIconProps) {

        const icons: { [index: string]: React.ReactElement } = {
            1: <LocalShippingIcon />,
            2: <LibraryAddCheckIcon />,
            3: <AccountBalanceIcon />,
        };

        return icons[String(props.icon)]

    }
    const handleStep = (step: number) => () => {
    };
    return (
        <Fragment>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {steps.map((item, index) => (
                    <Step
                        key={index}
                        active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                    >
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{item.label}</StepLabel>
                        {/* <StepLabel
                            style={{
                                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
                            }}
                            step={<item.icon />}
                        >
                            {item.label}
                        </StepLabel> */}
                    </Step>
                ))}
            </Stepper>
        </Fragment>
    );
};

export default CheckoutSteps;