import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./css/Header.css";
import { buildStaticUrl } from "../../api/serverLocations";
import HamburgerMenu from "../navigation/HamburgerMenu";

class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    isSpotifyAuthenticated: PropTypes.bool,
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const isSpotifyAuthenticated = this.props.isSpotifyAuthenticated;
    let spotifyLink;
    if (isSpotifyAuthenticated == null) {
      // status not yet loaded
      spotifyLink = (
        <Link to={"/"} className={"nav-link disabled"}>
          Connect with Spotify
        </Link>
      );
    } else if (isSpotifyAuthenticated) {
      // authenticated
      spotifyLink = (
        <Link to={`/profile/${user.username}`} className={"nav-link"}>
          Welcome,{" "}
          <span className={"header-profile-link"}>
            {"first" in user ? user.first : user.username}
          </span>
        </Link>
      );
    } else {
      spotifyLink = // if user is not spotify authenticated
        (
          <Link to={"/spotify-redirect"} className={"nav-link"}>
            Connect with Spotify
          </Link>
        );
    }

    const authLinks = // links to show when user is authenticated
      (
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0" id={"vynle-navbar"}>
          <li className={"nav-item"}>
            <strong>{spotifyLink}</strong>
          </li>
          <li>
            <HamburgerMenu />
          </li>
        </ul>
      );

    const guestLinks = // links to show when not authenticated
      (
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className={"nav-item"}>
            <Link to={"/register"} className={"nav-link"}>
              Register
            </Link>
          </li>
          <li className={"nav-item"}>
            <Link to={"/login"} className={"nav-link"}>
              Login
            </Link>
          </li>
        </ul>
      );

    return (
      <nav className="navbar fixed-top navbar-fixed-top navbar-expand-sm navbar-light bg-light">
        <div className={"container"}>
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <a className="navbar-brand py-0" href="/">
                <img
                  id={"logo-main"}
                  src={buildStaticUrl("logo/logo_main.svg")}
                  alt={"Vynle Logo"}
                />
              </a>
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  isSpotifyAuthenticated: state.spotify.isSpotifyAuthenticated,
});

export default connect(mapStateToProps, {})(Header);
