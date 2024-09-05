import React, { Children } from "react";
import './Button.css';
import { Link } from "react-router-dom";

//Defining button styles
const STYLES = ['btn--primary', 'btn--outline'];

//Defining button sizes
const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
    //Check if button is valid; Otherwise use default
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    //Check if button is valid; Otherwise use default
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <>
            <Link to='/sign-in' className="btn-mobile">
                <button className={"btn ${checkButtonStyle} ${checkButtonSize}"} onClick={onClick} type={type}>
                    {children}
                </button>
            </Link>
        </>
    )
};