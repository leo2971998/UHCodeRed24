import React from 'react';
import '../styles/Notification.css'; 

const Notification = ({ message, show }) => {
    return (
        <div className={`notification ${show ? 'show' : ''}`}>
            {message}
        </div>
    );
};

export default Notification;
