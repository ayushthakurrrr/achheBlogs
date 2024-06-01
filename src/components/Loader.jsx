import React from 'react';

const Loader = ({ className, box }) => {
    return (
        <div className={`flex items-center justify-center ${box}`} >
            <div className={`animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 ${className}`}></div>
        </div >
    );
};

export default Loader;
