import React, { useRef } from "react";
import { Fragment, useState } from "react";
import { buildStaticUrl } from "../../api/serverLocations";
import "./css/CoverArt.css";
import PropTypes from "prop-types";
import FormattedRelease from "../formatted_release/FormattedRelease";

function CoverArt(props) {
    if (props.alwaysDisplayInfo) {
        return <FormattedRelease releaseData={props.albumData} />;
    }

    // Similar to state in that it tracks a value, but it does not trigger a rerender on change
    // (the value does persist between renders)

    // --- State ---
    // Controls whether info div "drops down" from behind release image
    const [dropdownHeight, setDropdownHeight] = useState("100%");

    // --- Refs ---
    const imageRef = useRef(null);
    const alignerRef = useRef(null);

    const release = props.albumData?.fetched ? props.albumData.release : null;
    const releaseIsPopulated = release?.name.length > 0;
    const clickable = props.handleClick !== undefined;

    const onMouseOver = () => {
        const imgHeight = imageRef.current.offsetHeight;
        const alignerHeight = alignerRef.current.offsetHeight;

        setDropdownHeight(imgHeight + alignerHeight);
    };

    const onMouseOut = () => {
        setDropdownHeight(imageRef.current.offsetHeight);
    };

    // No release art & not clickable
    if (!release?.img && !clickable) {
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
            className={"album-art-img" + (clickable ? " clickable" : "")}
            // First operand decides whether we pass func
            onMouseOver={releaseIsPopulated ? onMouseOver : undefined}
            onMouseOut={releaseIsPopulated ? onMouseOut : undefined}
            onClick={props.handleClick}
        />
    );

    // Init info box that drops down when user mouses over the art & container inside
    let releaseInfoDropdown = null;
    let releaseInfoAligner = null;
    if (releaseIsPopulated) {
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
        <div className="release-container" style={{ width: props.width }}>
            {image}
            {releaseInfoDropdown}
        </div>
    );
}

CoverArt.propTypes = {
    handleClick: PropTypes.func, // Runs on click of img tag - leave 'undefined' for no click action
    albumData: PropTypes.object, // Leave optional (e.g. user has yet to add release to new post)
    width: PropTypes.string, // Allow client to dynamically specify width (in % or pixels) for the CoverArt while retaining 1:1 aspect ratio
    fontSize: PropTypes.number,
    alwaysDisplayInfo: PropTypes.bool,
};

CoverArt.defaultProps = {
    width: "100%",
    fontSize: 12,
    alwaysDisplayInfo: false,
};

export default CoverArt;
