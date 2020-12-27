import React, { Component } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import classNames from 'classnames';

import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/PaletteFormNavStyles';

class PaletteFormNav extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newPaletteName: '',
			formShowing: false
		};
		this.formOpen = this.formOpen.bind(this);
		this.formClose = this.formClose.bind(this);
	}

	formOpen() {
		this.setState({ formShowing: true });
	}

	formClose() {
		this.setState({ formShowing: false });
	}
	render() {
		let { classes, open, handleSubmit, handleDrawerOpen, palettes } = this.props;
		let {formShowing} = this.state;

		return (
			<div>
				<CssBaseline />
				<AppBar
					color="default"
					position="fixed"
					className={classNames(classes.appBar, {
						[classes.appBarShift]: open
					})}
				>
					<Toolbar disableGutters={!open}>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={handleDrawerOpen}
							className={classNames(classes.menuButton, open && classes.hide)}
						>
							<AddToPhotosIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" noWrap>
							Create a new palette
						</Typography>
					</Toolbar>
					<div className={classes.navBtns}>
						<Link to="/">
							<Button variant="contained" className={classes.button} color="secondary">
								GO BACK
							</Button>
						</Link>
						<Button variant="contained" className={classes.button} color="primary" onClick={this.formOpen}>
							SAVE PALETTE
						</Button>
					</div>
					{formShowing && (
						<PaletteMetaForm palettes={palettes} formClose={this.formClose} handleSubmit={handleSubmit} />
					)}
				</AppBar>
			</div>
		);
	}
}
export default withStyles(styles, { withTheme: true })(PaletteFormNav);
