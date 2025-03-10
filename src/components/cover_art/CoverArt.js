import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './css/CoverArt.css'
import { buildStaticUrl } from "../../api/serverLocations"

class CoverArt extends Component {
    static propTypes = {
        handleClick: PropTypes.func,
        albumData: PropTypes.object,
        isClickable: PropTypes.bool,
        fontSize: PropTypes.number,
        displayReleaseInfoText: PropTypes.bool,
        ind: PropTypes.number.isRequired,
    }

    handleHover(ind) {
        const slider = document.getElementById('sliding-box-' + ind)
        const releaseInfoAligner = document.getElementById('release-info-aligner-' + ind)

        slider.style.height = String(
            document.getElementById('release-img-' + ind).offsetHeight + releaseInfoAligner.offsetHeight
        ) + 'px'
    }

    resetHover(ind) {
        const img = document.getElementById('release-img-' + ind)
        const imgHeight = img.offsetHeight

        document.getElementById('sliding-box-' + ind).style.height = imgHeight.toString() + 'px'
    }

    render() {
        const ind = this.props.ind.toString()
        const release = this.props.albumData.release
        const releaseIsPopulated = release != null

        // If no art is set, and it is not clickable (meaning they are not the owner of this profile), render gray div
        if (!release?.img && !this.props.isClickable) {
            return (
                <Fragment>
                    <div className={'no-art-set img-edge-curve'}></div>
                </Fragment>
            )
        }

        const fontSize = this.props.fontSize ? this.props.fontSize.toString() + 'px' : '12px'
        const textStyle = {
            fontSize: fontSize,
        }

        let releaseInfoText = null
        if (this.props.displayReleaseInfoText && releaseIsPopulated) {
            releaseInfoText = (
                <div className={'release-info-sliding-box'}
                     id={'sliding-box-' + ind}
                     style={textStyle}
                >
                    <div id={'release-info-aligner-' + ind} className={'release-info-aligner'}>
                        <p className={'info-line release-name'}>{release.name}</p>
                        <p className={'info-line'}>{release.artist}</p>
                    </div>
                </div>
            )
        }

        return (
            <div className={'release-container'}>
                <img
                    src={release?.img ? release.img : buildStaticUrl('img/plus.png')}
                    alt={'Album'}
                    id={'release-img-' + ind}
                    onMouseOver={() => {
                        if (releaseIsPopulated) {
                            this.handleHover(this.props.ind)
                        }
                    }}
                    onMouseOut={() => {
                        if (releaseIsPopulated) {
                            this.resetHover(ind)
                        }
                    }}
                    className={'album-art-img img-edge-curve ' + (this.props.isClickable ? 'clickable' : null)}
                    onClick={() => {
                        // Only call callback func if it exists and is clickable
                        if (this.props.isClickable && this.props.handleClick) {
                            this.props.handleClick()
                        }
                    }}
                />
                {releaseInfoText}
            </div>
        )
    }
}

CoverArt.defaultProps = {
    isClickable: true,
    displayReleaseInfoText: true,
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {})(CoverArt)