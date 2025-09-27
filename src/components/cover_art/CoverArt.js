import React, { useRef } from "react";
import { Fragment, useState } from "react";
import { buildStaticUrl } from "../../api/serverLocations";
import "./css/CoverArt.css";
import PropTypes from "prop-types";

// TODO: clean up css file and dedup unneeded classes
// TODO: change name of this class and references to it

function CoverArt(props) {
  // TODO: possibly recheck num rerenders
  // Similar to state in that it tracks a value, but it does not trigger a rerender on change
  // (the value does persist between renders)

  // --- State ---
  // Controls whether info div "drops down" from behind release image
  const [dropdownHeight, setDropdownHeight] = useState("100%");

  // --- Refs ---
  const imageRef = useRef(null);
  const alignerRef = useRef(null);

  const onMouseOver = () => {
    const imgHeight = imageRef.current.offsetHeight;
    const alignerHeight = alignerRef.current.offsetHeight;

    setDropdownHeight(imgHeight + alignerHeight);
  };

  const onMouseOut = () => {
    setDropdownHeight(imageRef.current.offsetHeight);
  };

  const release = props.albumData?.fetched ? props.albumData.release : null;

  // No release art & not clickable
  if (!release?.img && !props.isClickable) {
    return (
      <Fragment>
        <div className="album-art-img no-art-set"></div>
      </Fragment>
    );
  }

  const image = (
    <img
      src={release?.img ? release.img : buildStaticUrl("img/plus.png")}
      ref={imageRef}
      alt={"Album"}
      className="album-art-img clickable"
      // First operand decides whether we pass func
      onMouseOver={release && onMouseOver}
      onMouseOut={release && onMouseOut}
      onClick={props.isClickable && props.handleClick}
    />
  );

  // Init info box that drops down when user mouses over the art & container inside
  let releaseInfoDropdown = null;
  let releaseInfoAligner = null;
  if (props.displayReleaseInfoText && release) {
    releaseInfoAligner = // Container for the text inside the dropdown
      (
        <div ref={alignerRef} className="release-info-aligner">
          <p className="info-line release-name">{release.name}</p>
          <p className="info-line">{release.artist}</p>
        </div>
      );

    releaseInfoDropdown = (
      <div
        className="release-info-sliding-box"
        style={{
          fontSize: props.fontSize,
          height: dropdownHeight,
        }}
      >
        {releaseInfoAligner}
      </div>
    );
  }

  return (
    <div className="release-container">
      {image}
      {releaseInfoDropdown}
    </div>
  );
}

CoverArt.propTypes = {
  handleClick: PropTypes.func, // Runs on click of img tag
  albumData: PropTypes.object,
  isClickable: PropTypes.bool,
  fontSize: PropTypes.number,
  displayReleaseInfoText: PropTypes.bool,
};

CoverArt.defaultProps = {
  isClickable: true,
  displayReleaseInfoText: true,
  fontSize: 12,
};

export default CoverArt;
