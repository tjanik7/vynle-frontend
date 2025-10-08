import PropTypes from "prop-types";
import React, { useState } from "react";
import CoverArt from "./CoverArt";
import Search from "../search/Search";
import "./css/SearchableCoverArt.css";

/*
    Abstraction of <CoverArt/> and <Search/> for portability
*/
function SearchableCoverArt(props) {
    function setSelectedAlbum(newAlbum) {
        setSearchVisibility(false);
        props.setRelease(newAlbum);
    }

    // TODO: make searchbar selected as soon as search is opened

    const [searchVisibility, setSearchVisibility] = useState(false);

    const clickHandler = () => {
        setSearchVisibility(true);
    };

    // CoverArt component
    const coverArt = (
        <CoverArt
            albumData={props.release}
            fontSize={props.fontSize}
            width={props.imageWidth}
            handleClick={props.readOnly ? undefined : clickHandler}
            alwaysDisplayInfo={props.alwaysDisplayInfo}
        />
    );

    // Search component
    const search = searchVisibility ? (
        <Search
            setRelease={setSelectedAlbum}
            clearSearchVisibility={() => {
                setSearchVisibility(false);
            }}
        />
    ) : null;

    // Avoid creating a new stacking context below, since the Search component
    // needs to be rendered at a z-index higher than everything else to create
    // the blurred background
    return (
        <div>
            <div className="cover-art-container">{coverArt}</div>
            <div className="search-container">{search}</div>
        </div>
    );
}

SearchableCoverArt.propTypes = {
    release: PropTypes.object, // i.e. the album object
    setRelease: PropTypes.func,
    imageWidth: PropTypes.string,
    fontSize: PropTypes.number,
    readOnly: PropTypes.bool, // e.g. when visiting another user's profile
    alwaysDisplayInfo: PropTypes.bool,
};

SearchableCoverArt.defaultProps = {
    fontSize: 12,
    imageWidth: "100%",
    readOnly: false,
    alwaysDisplayInfo: false,
};

export default SearchableCoverArt;
