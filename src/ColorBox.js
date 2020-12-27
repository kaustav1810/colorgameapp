import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import CopyToClipBoard from 'react-copy-to-clipboard';
import classNames from 'classnames';

import styles from './styles/ColorBoxStyles';

class ColorBox extends Component {
	constructor(props) {
		super(props);

		this.state = { copied: false };

		this.handleCopy = this.handleCopy.bind(this);
	}

	handleCopy() {
		this.setState({ copied: true }, () => {
			setTimeout(() => {
				this.setState({ copied: false });
			}, 1200);
		});
	}
	render() {
		let { background, name, moreUrl, classes, showFullPalette } = this.props;
		let { copied } = this.state;
		return (
			<CopyToClipBoard text={background} onCopy={this.handleCopy}>
				<div className={classes.ColorBox} style={{ background }}>

					<div className={classNames(classes.copyOverlay, copied && classes.showOverlay)} style={{ background }} />
					<div className={classNames(classes.copyMessage, copied && classes.showMessage)}>
						<h1>copied!</h1>
						<p className={classes.copyText}>{background}</p>
					</div>
					<div>
						<div className={classes.boxContent}>
							<span className={classes.colorName}>{name}</span>
						</div>
						<button className={classes.copyButton}>copy</button>
					</div>
					{showFullPalette && (
						<Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
							<span className={classes.seeMore}>MORE</span>
						</Link>
					)}
				</div>
			</CopyToClipBoard>
		);
	}
}
export default withStyles(styles)(ColorBox);
