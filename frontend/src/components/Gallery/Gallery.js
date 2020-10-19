import React from 'react';

const SearchViewer = ({ images, imageType }) => {
    const getImgSrc = (type, img) => type === 'gifs'
        ? img.images.downsized.url
        : img.webformatURL;

    return (
        <>
            {
                images.length 
                    ? (<div className="search_gallery">
                        {
                            images.map((img, index) => {
                                return (
                                    <div key={index}>
                                        { img
                                            ? <img
                                                className="search_gallery--image"
                                                src={getImgSrc(imageType, img)} alt="" />
                                            : <h1>TEXT</h1>
                                        }

                                    </div>
                                )
                            })
                        }
                    </div>)
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