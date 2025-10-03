import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import CoverArt from "./CoverArt";
import Search from "../search/Search";

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
    props.setRelease(newAlbum);
  }

  const [searchVisibility, setSearchVisibility] = useState(false);

  // CoverArt component
  const coverArt = (
    <CoverArt
      albumData={props.release}
      isClickable={true}
      fontSize={props.fontSize}
      handleClick={() => {
        setSearchVisibility(true);
      }}
    />
  );

  // Search component
  const search = searchVisibility ? (
    <Search
      clickFunction={setSelectedAlbum}
      clearSearchVisibility={() => {
        setSearchVisibility(false);
      }}
    />
  ) : null;

  return (
    <Fragment>
      <div style={{ height: 200, width: 200 }}>{coverArt}</div>
      <div>{search}</div>
    </Fragment>
  );
}

SearchableCoverArt.propTypes = {
  release: PropTypes.object, // i.e. the album object
  setRelease: PropTypes.func,
  fontSize: PropTypes.number,
  sideLen: PropTypes.number,
};

SearchableCoverArt.defaultProps = {
  fontSize: 12,
  sideLen: 200,
};

export default SearchableCoverArt;
