import React from 'react';

const SearchViewer = () => {
    const mocks = [];
    
    for (let index = 0; index < 20; index++) {
        mocks.push(index)
    }

    return (
        <>
            <div className="search_input-wrapper">
                <input className="search_input" type="text" placeholder="Search..." />
            </div>
            <div className="search_gallery">
                { mocks.map((mock, index) => {
                    return (
                        <div key={ index }>
                            <img className="search_gallery--image" src="https://i.giphy.com/media/3o7TKqH2b8vZ1Zu6e4/giphy.webp" alt="" />
                        </div>
                    )
                }) }
            </div>
        </>
    );
}

export default SearchViewer;