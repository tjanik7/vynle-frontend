import React from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./css/LinkSpotifyAccount.css";
import { buildStaticUrl } from "../../api/serverLocations";

function LinkSpotifyAccount() {
    const navigate = useNavigate();

    return (
        <div className={"link-spotify-container-parent"}>
            <div>
                <div className={"v-logo-container"}>
                    <Image
                        className={"v-logo"}
                        src={buildStaticUrl("logo/v-logo.svg")}
                    />
                    x
                    <Image
                        className={"spotify"}
                        src={buildStaticUrl("spotify/Spotify_icon.svg")}
                    />
                </div>
                <div className={"v-logo-container"}>
                    <Button
                        onClick={() => {
                            navigate("/spotify-redirect");
                        }}
                    >
                        Click here to link with Spotify
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default LinkSpotifyAccount;
