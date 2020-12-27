import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteListStyles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import MiniPalette from './MiniPalette';

class PaletteList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			deletingId:''
		};

		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.goToPalette = this.goToPalette.bind(this);
	}

	handleOpen(id){
		this.setState({deletingId:id});
		this.setState({open:true})
	}

	handleClose(){
		this.setState({open:false})
	}

	handleDelete(){
		this.props.deletePalette(this.state.deletingId);
		this.setState({open:false});
	}

	goToPalette(id) {
		this.props.history.push(`/palette/${id}`);
	}

	render() {
		let { palettes, classes, deletePalette } = this.props;
		let { open } = this.state;
		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1 className={classes.heading}>React Colors</h1>
						<Link to="/palette/new">Create Palette</Link>
					</nav>
					<TransitionGroup className={classes.palettes}>
						{palettes.map((palette) => (
							<CSSTransition key={palette.id} classNames="fade" timeout={600}>
								<MiniPalette
									{...palette}
									deletePalette={deletePalette}
									id={palette.id}
									key={palette.id}
									handleDrawerOpen={this.handleOpen}
									handleClick={this.goToPalette}
								/>
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
				<Dialog open={open} onClose={this.handleClose}>
					<DialogTitle>Delete this Palette?</DialogTitle>
					<List>
						<ListItem button onClick={this.handleDelete}>
							<ListItemAvatar >
								<Avatar style={{ backgroundColor: red[100], color: red[600] }}>
									<CheckIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText>Delete</ListItemText>
						</ListItem>
						<ListItem button onClick={this.handleClose} >
							<ListItemAvatar >
								<Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
									<CloseIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText>Cancel</ListItemText>
						</ListItem>
					</List>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList);
