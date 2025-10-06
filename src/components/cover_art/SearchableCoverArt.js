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
        // Callback function to be passed to <Search/>
        // TODO: This is a temporary patch. Setting this field occurs in redux when we set a
        // new album in FavoriteAlbums component. Need to decide if I still want to use redux for
        // the search component.
        newAlbum.fetched = true;
        setSearchVisibility(false);
        props.setRelease(newAlbum);
    }

    const [searchVisibility, setSearchVisibility] = useState(false);

    // CoverArt component
    const coverArt = (
        <CoverArt
            albumData={props.release}
            isClickable={props.isClickable}
            fontSize={props.fontSize}
            width={props.imageWidth}
            handleClick={() => {
                setSearchVisibility(true);
            }}
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
    isClickable: PropTypes.bool,
};

SearchableCoverArt.defaultProps = {
    fontSize: 12,
    imageWidth: "100%",
    isClickable: true,
};

export default SearchableCoverArt;
