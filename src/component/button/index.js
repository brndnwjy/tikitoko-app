import React from "react";

const Button = ({name, type, className, title}) => {
    return (
        <button
        name = {name}
        type = {type}
        className = {className}
        >
            {title}
        </button>
    )
}

export default Button