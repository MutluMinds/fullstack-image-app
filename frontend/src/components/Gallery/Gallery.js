import React from 'react';

const SearchViewer = ({ images, imageType }) => {
    const getImgSrc = (type, img) => type === 'gifs' 
        ? img.images.downsized.url 
        : img.webformatURL;

    return (
        <>
            <div className="search_gallery">
                {images.map((img, index) => {
                    return (
                        <div key={ index }>
                            <img 
                                className="search_gallery--image" 
                                src={getImgSrc(imageType, img)} alt="" />
                        </div>
                    )
                }) }
            </div>
        </>
    );
}

export default SearchViewer;