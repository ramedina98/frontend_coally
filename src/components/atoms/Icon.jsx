import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = ({ icon, classname}) => {
    return <FontAwesomeIcon icon={icon} className={`${classname}`}/>
}

export default Icon;