import React from 'react';

const Loader = ({ className }) => {
    return (
        <div className="flex items-center justify-center min-h-64">
                <div className={`animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 ${className}`}></div>
        </div >
    );
};

export default Loader;
