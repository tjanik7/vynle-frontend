import React, { useEffect } from "react";
import AxiosInstance from "../../api/axiosInstance";
import { connect, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { formatHeader } from "../../api/formatHeader";
import { getSpotifyAuthStatus } from "../../actions/spotify";

function SpotifyCallback(props) {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  useEffect(() => {
    AxiosInstance.get(`/spotify/redirect?${params}`, formatHeader(token)).then(
      (res) => {
        props.getSpotifyAuthStatus();
        navigate("/");
      },
    );
  }, []);

  return <h2>Finishing linking with Spotify...</h2>;
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { getSpotifyAuthStatus })(
  SpotifyCallback,
);
