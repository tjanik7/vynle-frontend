import React, { useRef } from "react";
import { Fragment, useState } from "react";
import { buildStaticUrl } from "../../api/serverLocations.js";
import styles from "./css/CoverArt.module.css";
import PropTypes from "prop-types";
import type { AlbumData } from "src/types/Types";

function CoverArt(props: Props) {
    // --- State ---
    // Controls whether info div "drops down" from behind release image
    const [dropdownHeight, setDropdownHeight] = useState("100%");

    // --- Refs ---
    const imageRef = useRef<HTMLImageElement>(null);
    const alignerRef = useRef<HTMLInputElement>(null);

    const release = props.albumData?.release;
    const releaseIsPopulated = Boolean(release?.name);
    const clickable = props.handleClick !== undefined;

    const onMouseOver = () => {
        const imgHeight = imageRef.current?.offsetHeight;

        const alignerHeight = alignerRef.current?.offsetHeight;

        if (imgHeight && alignerHeight) {
            const newHeight: number = imgHeight + alignerHeight;
            setDropdownHeight(newHeight.toString());
        }
    };

    const onMouseOut = () => {
        if (imageRef?.current?.offsetHeight) {
            setDropdownHeight(imageRef.current.offsetHeight.toString());
        }
    };

    // No release art & not clickable
    if (!release?.img && !clickable) {
        return (
            <Fragment>
                <div className="album-art-img no-art-set"></div>
            </Fragment>
        );
    }

    // Determines whether we do anything on hover
    const dropdownEnabled = releaseIsPopulated && !props.alwaysDisplayInfo;

    const image = (
        <img
            src={release?.img ? release.img : buildStaticUrl("img/plus.png")}
            ref={imageRef}
            alt={"Album"}
            className={"album-art-img" + (clickable ? " clickable" : "")}
            onMouseOver={dropdownEnabled ? onMouseOver : undefined}
            onMouseOut={dropdownEnabled ? onMouseOut : undefined}
            onClick={props.handleClick}
        />
    );

    // Init info box that drops down when user mouses over the art & container inside
    let releaseInfoDropdown = null;
    let releaseInfoAligner = null;
    if (releaseIsPopulated) {
        releaseInfoAligner = // Container for the text inside the dropdown
            (
                <div
                    ref={alignerRef}
                    className={
                        props.alwaysDisplayInfo
                            ? undefined
                            : "release-info-aligner"
                    }
                >
                    <p className="info-line release-name">{release.name}</p>
                    <p className="info-line">{release.artist}</p>
                </div>
            );

        releaseInfoDropdown = (
            <div
                className={
                    "release-info " +
                    (props.alwaysDisplayInfo
                        ? "release-info-static"
                        : "release-info-dropdown")
                }
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
        <div
            className={
                props.alwaysDisplayInfo
                    ? "release-container-static"
                    : "release-container"
            }
            style={{ width: props.width }}
        >
            {image}
            {releaseInfoDropdown}
        </div>
    );
}

type Props = {
    handleClick: () => void;
    albumData: AlbumData;
    width: string;
    fontSize: number;
    alwaysDisplayInfo: boolean;
};

CoverArt.propTypes = {
    handleClick: PropTypes.func, // Runs on click of img tag - leave 'undefined' for no click action
    albumData: PropTypes.object, // Leave optional (e.g. user has yet to add release to new post)
    width: PropTypes.string, // Allow client to dynamically specify width (in % or pixels) for the CoverArt while retaining 1:1 aspect ratio
    fontSize: PropTypes.number,
    alwaysDisplayInfo: PropTypes.bool, // Info div is always "dropped down" when this is true; additional space is allocated for the permanent dropdown
};

CoverArt.defaultProps = {
    width: "100%",
    fontSize: 12,
    alwaysDisplayInfo: false,
};

export default CoverArt;
