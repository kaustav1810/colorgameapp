import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import { withStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import styles from './styles/NavBarStyles';

class NavBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			format: 'hex',
			open: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClose() {
		this.setState({ open: false });
	}
	handleChange(e) {
		this.setState({ format: e.target.value, open: true });
		this.props.handleChange(e.target.value);
	}
	render() {
		let { level, changeLevel, isActive, classes } = this.props;
		let { format, open } = this.state;
		return (
			<header className={classes.NavBar}>
				<div className={classes.logo}>
					<Link to="/">reactcolorpicker</Link>
				</div>
				{isActive && (
					<div className={classes.sliderContainer}>
						<span>Level:{level}</span>
						<div className={classes.slider}>
							<Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={changeLevel} />
						</div>
					</div>
				)}
				<div className={classes.selectContainer}>
					<Select value={format} onChange={this.handleChange}>
						<MenuItem value="hex">HEX(#FFFFEE)</MenuItem>
						<MenuItem value="rgb">RGB(255,233,212)</MenuItem>
						<MenuItem value="rgba">RGBA(233,233,222,0.4)</MenuItem>
					</Select>
				</div>
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left'
					}}
					open={open}
					autoHideDuration={3000}
					onClose={this.handleClose}
					message={<span>Format Changed to {format.toUpperCase()}!</span>}
					action={[
						<IconButton size="small" aria-label="close" 
						color="inherit" onClick={this.handleClose}>
							<CloseIcon fontSize="small" />
						</IconButton>
					]}
				/>
			</header>
		);
	}
}
export default withStyles(styles)(NavBar);
