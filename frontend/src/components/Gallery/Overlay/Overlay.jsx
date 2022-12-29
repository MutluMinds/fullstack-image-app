import React, { useState, useRef }from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import { faHeart  } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faFilledHeart } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import CopyButtonOverlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';


const Overlay = ({
  liked,
  onLike, 
  onExpand, 
  onCopy
}) => {
  const getLikeIcon = () => {
    return liked ? faFilledHeart : faHeart;
  };
  const [showToolTip, setShowToolTip] = useState(false);
  const target = useRef(null);

  return (
    <>
      <button 
        className={classnames(
          "like-button",
          { liked }
        )}
        onClick={onLike}
      >
        <FontAwesomeIcon icon={getLikeIcon()} />
      </button>
      <button
        className="expand-button"
        onMouseDown={onExpand}
      >
        <FontAwesomeIcon icon={faExpandAlt} inverse/>
      </button>      
      <button 
        className="copy-button"
        ref={target}
        onClick={() => {
          setShowToolTip(!showToolTip);
          onCopy();
          setTimeout(function(){setShowToolTip(false);},2000);
        }}
      >
        <FontAwesomeIcon icon={faLink} inverse/>
      </button>
        <CopyButtonOverlay target={target.current} show={showToolTip} placement="top" rootCloseEvent="mousedown">
         {(props) => (
           <Tooltip id="overlay-example" {...props}>
             Copied to clipboard!
           </Tooltip>
         )}
        </CopyButtonOverlay>
    </>
  );
};

export default Overlay;
