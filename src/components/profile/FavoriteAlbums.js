import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setFavAlbum } from "../../actions/profile";
import SearchableCoverArt from "../cover_art/SearchableCoverArt";

const NUM_ALBUMS = 6;

function generateAlbumTags(props) {
    const columns = [];
    const releaseArray = props.profile.favoriteAlbums;

    // "Lock in" index argument of release setter since only arg expected
    const createReleaseSetter = (idx) => {
        return (newRelease) => {
            props.setFavAlbum(newRelease, idx);
        };
    };

    for (let i = 0; i < NUM_ALBUMS; i++) {
        // Generates JSX tags for album art
        columns.push(
            <Col key={i}>
                <SearchableCoverArt
                    release={releaseArray[i]}
                    setRelease={createReleaseSetter(i)}
                    readOnly={!props.isProfileOwner}
                />
            </Col>
        );
    }
    return columns;
}

function FavoriteAlbums(props) {
    return (
        <>
            <Container>
                <Row xs={6}>{generateAlbumTags(props)}</Row>
            </Container>
        </>
    );
}

FavoriteAlbums.propTypes = {
    isProfileOwner: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    id: state.spotify.id,
    profile: state.profile,
});

export default connect(mapStateToProps, {
    setFavAlbum,
})(FavoriteAlbums);
