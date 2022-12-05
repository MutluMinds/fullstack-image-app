import React from 'react';

const Loading = ({ variant = 'large' }) => {
    return (
        <div className='loading'>
            <div className={`loading_wrapper ${variant}`}>
                <div className="loading_item"></div>
            </div>
        </div>
    );
}

export default Loading;
