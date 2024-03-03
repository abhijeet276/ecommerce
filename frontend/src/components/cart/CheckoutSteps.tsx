import React, { CSSProperties } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Step, StepIconProps, StepLabel, Stepper, Typography } from "@mui/material";
import "./CheckoutSteps.scss";

interface ICheckout {
    activeStep: number;
}
const stepStyles: CSSProperties = {
    boxSizing: "border-box",
};
const steps = [
    {
        label: "Shipping Details",
        icon: LocalShippingIcon,
    },
    {
        label: "Confirm Order",
        icon: LibraryAddCheckIcon,
    },
    {
        label: "Payment",
        icon: AccountBalanceIcon,
    },
];
const CheckoutSteps: React.FC<ICheckout> = ({ activeStep = 1 }) => {
    const handleStep = (step: number) => () => {
    };
    return (
        <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
            {steps.map((item, index) => (
                <Step
                    key={index}
                    active={activeStep === index}
                    completed={activeStep >= index}
                >
                    <StepLabel
                        style={{
                            color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
                        }}
                        StepIconComponent={item.icon}
                    >
                        <Typography>{item.label}</Typography>
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    );
};

export default CheckoutSteps;