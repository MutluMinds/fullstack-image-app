import React, { useState, useEffect, useRef } from 'react';
const axios = require('axios');

const SearchViewer = ({ images, imageType }) => {
    const searchRef = useRef();

    async function handleSearch(e) {
        e.preventDefault();
        const searchTerm = searchRef.current.value;
        // Will continue tomorrow
    }

    return (
        <>
            <div className="search_input-wrapper">
                <form onSubmit={ () => handleSearch }>
                    <input 
                        ref={searchRef}
                        className="search_input" 
                        type="text" 
                        placeholder="Search..." />
                </form>
            </div>
            <div className="search_gallery">
                {images.map((img, index) => {
                    console.log(img);
                    return (
                        <div key={ index }>
                            <img 
                                className="search_gallery--image" 
                                src={imageType === 'gifs' ? img.images.downsized.url : img.webformatURL } alt="" />
                        </div>
                    )
                }) }
            </div>
        </>
    );
}

export default SearchViewer;