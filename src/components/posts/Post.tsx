import React from "react";
import PropTypes from "prop-types";
import styles from "./css/Post.module.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import CoverArt from "src/components/cover_art/CoverArt";
import type { AlbumData } from "src/types/Types";

function formatAlbum(albumData: AlbumData) {
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

function Post(props: Props) {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.usernameField}>
                <h4
                    onClick={() => {
                        navigate(`/profile/${props.username}`);
                    }}
                    className={styles.postContainerClickable}
                >
                    {props.username}
                </h4>
            </div>
            <div
                className={`${styles.postContainer} ${props.isClickable ? styles.postContainerClickable : ""}`}
                onClick={
                    props.isClickable // Leave onClick undefined if this is not a clickable <Post/>
                        ? () => navigate(`/post/${props.postID}`)
                        : undefined
                }
            >
                <div className={styles.item}>
                    {formatAlbum(props.albumData)}
                </div>
                <div className={styles.item}>
                    <p>{props.body}</p>
                </div>
            </div>
        </>
    );
}

type Props = {
    body: string;
    username: string;
    postID: number;
    albumData: AlbumData;
    isClickable: boolean;
};

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

type State = {};

const mapStateToProps = (state: State) => ({});
export default connect(mapStateToProps, {})(Post);
