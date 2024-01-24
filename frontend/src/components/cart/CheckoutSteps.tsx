import React, { Fragment } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "./CheckoutSteps.scss";
import { Step, StepIconProps, StepLabel, Stepper, Typography } from "@mui/material";

interface ICheckout {
    activeStep: number;
}
const stepStyles = {
    boxSizing: "border-box",
};
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
        <>
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
        </>
    );
};

export default CheckoutSteps;