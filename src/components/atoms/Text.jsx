import React from "react";


const Text = ({ children, classname}) => {
    return <span className={`${classname}`}>{children}</span>;
}

export default Text;