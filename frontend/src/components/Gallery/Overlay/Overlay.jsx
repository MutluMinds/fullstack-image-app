import React, { useState }from "react";
import classnames from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import { faHeart  } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faFilledHeart } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import LinkButtonOverlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';


const Overlay = ({
  liked,
  onLike, 
  onExpand, 
}) => {
  const getLikeIcon = () => {
    return liked ? faFilledHeart : faHeart;
  };
  const [toolTipShow, setToolTipShow] = useState(false);


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
        onClick={() => setToolTipShow(!toolTipShow)}
      >
        <FontAwesomeIcon icon={faLink} inverse/>
      </button>
        <LinkButtonOverlay target={target.current} show={toolTipShow} placement="right">
         {(props) => (
           <Tooltip id="overlay-example" {...props}>
             Copied to clipboard!
           </Tooltip>
         )}
        </LinkButtonOverlay>

    </>
  );
};

export default Overlay;
