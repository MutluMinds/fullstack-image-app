import React, { useState, useEffect } from "react";
import { getDefaultOffset, getImages, getNewOffset } from "../../utils";

import SearchImage from "../SearchImage/SearchImage";
import ScrollButton from "../ScrollTopButton/ScrollTopButton";

const SCROLL_TOP_Y = 30;

const StickyBar = ({
  imageType,
  setIsLoading,
  setInputValue,
  setImages,
  setOffset,
  inputValue
}) => {
  const [sticky, setSticky] = useState(false);

  async function switchImagesProvider(searchTerm) {
    setIsLoading(true);
    setInputValue(searchTerm);

    const defaultOffset = getDefaultOffset(imageType);
    getImages(imageType, defaultOffset, searchTerm).then((receivedImages) => {
      const newOffset = getNewOffset(imageType, defaultOffset);
      setImages(receivedImages);
      setOffset(newOffset);
      setIsLoading(false);
    });
  }

  const isSticky = () => {
    const windownTopY = window.scrollY;
    setSticky(windownTopY > SCROLL_TOP_Y);
  }

  useEffect(() => {
    window.addEventListener("scroll", isSticky);

    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  return (
    <div className="sticky-wrapper">
      <SearchImage
        onChange={(searchTerm) => switchImagesProvider(searchTerm)}
        value={inputValue}
        setInputValue={setInputValue}
      />
      {sticky ? <ScrollButton /> : null}
    </div>
  );
};

export default StickyBar;
