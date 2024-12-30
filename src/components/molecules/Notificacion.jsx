
import React, { useState, useEffect }from "react";
import Icon from "../atoms/Icon";

const Notification = ({ icon, size, color, title, text, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            if(onClose) onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose])

    if(!isVisible) return null;

    return (
        <div
            className={`fixed top-54 left-1/2 transform -translate-x-1/2 animate-fadeInDown shadow-md rounded-md flex flex-col justify-start items-center right-36 ${color} text-White tracking-wide`}
            style={{width: size, height: 'auto', zIndex: '1000' }}
        >
            <div
                className="w-full shadow-sm py-2 px-4 mb-2 text-2xl flex justify-start items-center"
            >
                <Icon icon={icon} />
                <h3 className="ml-3">{title}</h3>
            </div>
            <div
                className="p-3"
            >
                <p>{text}</p>
            </div>
        </div>
    );
}

export default Notification;