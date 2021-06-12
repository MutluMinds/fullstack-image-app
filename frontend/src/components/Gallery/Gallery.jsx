import React from 'react';
import './Gallery.scss';

const SearchViewer = ({ images, imageType, loadMoreImages }) => {
    const getImgSrc = (type, img) => type === 'gifs'
        ? img && img.images && img.images.downsized.url
        : img && img.webformatURL;

    return (
        <>
            {
                images && images.length
                    ? (<>
                        <div className="search_gallery">
                            {
                                images.map((img, index) => {
                                    return (
                                        <div key={index}>
                                            <a href={getImgSrc(imageType, img)} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    className="search_gallery--image"
                                                    src={getImgSrc(imageType, img)}
                                                    alt="" />
                                            </a>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="moreImages">
                            <button className="moreImagesButton" onClick={loadMoreImages}>More</button>
                        </div>
                    </>
                    )
                    : (
                        <div className="search_gallery--no-image">
                            <span className="search_gallery--no-image-text">Sorry couldn't find any image.</span>
                        </div>
                    )
            }
        </>
    );
}

export default SearchViewer;