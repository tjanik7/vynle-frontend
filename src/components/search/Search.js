import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { search, clearSearchResults } from "../../actions/spotifySearch";
import DropdownRow from "../search/DropdownRow";
import { Col, Row, Button } from "react-bootstrap";
import "./css/Search.css";

const TIME_TO_WAIT = 500; // ms to wait after user stops typing to send request

class Search extends Component {
    state = {
        q: "", // stores current value of search query bar
        t: null, // Time since user last typed - used to trigger Spotify search
    };

    static propTypes = {
        albums: PropTypes.array,
        search: PropTypes.func.isRequired,
        setRelease: PropTypes.func.isRequired,
        clearSearchVisibility: PropTypes.func.isRequired, // Sets visibility state to false
    };

    handleEscKey = (event) => {
        // Code for escape key
        if (event.keyCode === 27) {
            this.props.clearSearchVisibility();
        }
    };

    componentDidMount() {
        document.addEventListener("keydown", this.handleEscKey);
    }

    componentWillUnmount() {
        this.props.clearSearchResults();
        document.removeEventListener("keydown", this.handleEscKey);
    }

    sendQuery = () => {
        const { q } = this.state;
        this.props.search(q);
    };

    timerReset = (searchBarValue) => {
        const { t } = this.state;
        clearTimeout(t);

        if (searchBarValue !== "") {
            // Only start new timer if search bar is nonempty
            this.setState({
                t: setTimeout(this.sendQuery, TIME_TO_WAIT),
            });
        } else {
            this.props.clearSearchResults(); // Remove results if no text in search bar
        }
    };

    onSearchbarChange = (e) => {
        // Update state based on the current value of the search bar
        this.setState({
            [e.target.name]: e.target.value,
        });
        this.timerReset(e.target.value);
    };

    prepareAlbumObj = (album) => {
        if (!album) {
            return {
                spotify_release_uri: "",
            };
        }

        return {
            spotify_release_uri: album.id,
            release: {
                name: album.name,
                artist: album["artists"][0].name,
                img: album.images[1].url, // Extract medium sized image
            },
        };
    };

    render() {
        const { q } = this.state;

        // Only show clear selection button if no search results
        const clearSelectionButton =
            this.props.albums.length === 0 ? (
                <div className="clear-selection-btn-container">
                    <Button
                        variant="primary"
                        onClick={() => {
                            this.props.setRelease(this.prepareAlbumObj(null));
                        }}
                    >
                        Clear Selection
                    </Button>
                </div>
            ) : null;

        return (
            <>
                <div
                    onClick={this.props.clearSearchVisibility}
                    className={"blur-layer"}
                ></div>
                <div className={"search-component"}>
                    <h3 id={"search-bar-header"}>Search for Music</h3>
                    <div className={"form-group searchbar-form-group"}>
                        <input
                            className={"form-control"}
                            type={"text"}
                            name={"q"}
                            onChange={this.onSearchbarChange}
                            value={q}
                            autoComplete={"off"}
                            placeholder={"Search..."}
                            autoFocus
                        />
                    </div>
                    {/* Container for items below search bar */}
                    <div className="search-dropdown-container">
                        {clearSelectionButton}
                        <div className="search-results-container">
                            <Row>
                                <Col className={"dropdown-column"}>
                                    {this.props.albums.map((result) => (
                                        <DropdownRow
                                            key={result.id}
                                            dataKey={result.id}
                                            media={result.name}
                                            artist={result.artists[0].name}
                                            img={result.images[1].url}
                                            onClick={() => {
                                                this.props.setRelease(
                                                    this.prepareAlbumObj(result)
                                                );
                                            }}
                                        />
                                    ))}
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    albums: state.spotifySearch.albums,
    selectedIndex: state.spotifySearch.selectedIndex,
});

export default connect(mapStateToProps, {
    search,
    clearSearchResults,
})(Search);
