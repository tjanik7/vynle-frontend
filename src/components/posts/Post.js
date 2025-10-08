import React from "react";
import PropTypes from "prop-types";
import "./css/Post.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import CoverArt from "../cover_art/CoverArt";

function formatAlbum(albumData) {
    if (!albumData) {
        return null;
    }

    const releaseObj = {
        spotify_release_uri: null,
        release: albumData,
    };

    return (
        <div>
            <CoverArt albumData={releaseObj} alwaysDisplayInfo={true} />
        </div>
    );
}

function Post(props) {
    const navigate = useNavigate();

    return (
        <>
            <div id={"username-field"}>
                <h4
                    onClick={() => {
                        navigate(`/profile/${props.username}`);
                    }}
                    className={"post-container-clickable"}
                >
                    {props.username}
                </h4>
            </div>
            <div
                className={`post-container ${props.isClickable ? "post-container-clickable" : ""}`}
                onClick={
                    props.isClickable // Leave onClick undefined if this is not a clickable <Post/>
                        ? () => navigate(`/post/${props.postID}`)
                        : undefined
                }
            >
                <div className={"item"}>{formatAlbum(props.albumData)}</div>
                <div className={"item"}>
                    <p>{props.body}</p>
                </div>
            </div>
        </>
    );
}

Post.propTypes = {
    body: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    postID: PropTypes.number.isRequired,
    albumData: PropTypes.object,
    isClickable: PropTypes.bool,
};

Post.defaultProps = {
    isClickable: false,
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(Post);
